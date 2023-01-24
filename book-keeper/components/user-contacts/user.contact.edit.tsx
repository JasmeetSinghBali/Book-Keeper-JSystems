import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, PinInput, PinInputField, Radio, RadioGroup, Select, Stack, Text, Tooltip, useDisclosure, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import validator from "validator";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";


const ContactEditModal = ({...contactEditID}) => {
    
    // console.log("contact to be edited===========");
    // console.log(contactEditID);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ contactImageSecureUrl, SetContactImageSecureUrl ] = useState('');
    const [ contactName,SetContactName ] = useState('null');
    const [ contactEmail,SetContactEmail ] = useState('null');
    const [ contactPhone,SetContactPhone ] = useState('null');
    const [ contactCardType,SetContactCardType ] = useState('null');
    const [ contactCardNumber,SetContactCardNumber ] = useState('null');
    const [ validationError,SetValidationError ] = useState(false);
    const [ mutationProcessFailed,SetMutationProcessFailed ] = useState(false);

    const utils = trpcClient.useContext();

    const rpcTokenInZustand = useCurrentRpcToken.getState();

    const contactsFreshList: any = trpcClient.user.fetchFreshContactList.useQuery({
        access_token: rpcTokenInZustand.token
    })

    const updateContactMutation: any = trpcClient.user.editUserContact.useMutation();

    /**@desc reset all contact values, opens up the edit contact modal/drawer */
    const handleNewContactModal = async(): Promise<any> => {
        
        SetContactImageSecureUrl('');
        SetContactName('null');
        SetContactPhone('null');
        SetContactEmail('null');
        SetContactCardType('null');
        SetContactCardNumber('null');
        SetValidationError(false);
        SetMutationProcessFailed(false);
        onOpen();
        return;
    
    }

    /**@desc handling the updating of contact's data by contact id ,make trpc server call to update existing contact */
    const handleUpdateContactData = async(e: any): Promise<any> => {    
        e.preventDefault();
        // console.log(e.currentTarget);
        
        // Sort form data image & upload to cloudinary
        const form = e.currentTarget;
        const fileInput: any = Array.from(form.elements).find(
            ({ id }: any) => id === 'contactimage'
        );
        // console.log(Array.from(form.elements));
        // console.log(fileInput);
        
        let data:any;
        if(fileInput.files && contactImageSecureUrl.length === 0){
            // create form data with the image file to upload to cloudinary
            const formData = new FormData();
            // appends all files single or multiple with form data
            for (const file of fileInput.files){
                formData.append('file',file);
            }
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
            // upload the files to cloudinary via cloudinary api call
            data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string}/image/upload`,{
                method: 'POST',
                body: formData
            }).then(r=>r.json());
            
            // console.log('response from cloudinary=====',data);
            SetContactImageSecureUrl(data.secure_url);
        }
        
        // console.log("EDIT CONTACT data to send to trpc server=========");
        // console.log(data?.secure_url);
        // console.log(contactName);
        // console.log(contactEmail);
        // console.log(contactPhone);
        // console.log(contactCardType);
        // console.log(contactCardNumber);

        // Add validation check wheather data passed is valid before making mutation req to trpc server
        let possibleTypes: Array<string> = ["DEBIT","CREDIT"];
        let isCardTypeValid = possibleTypes.find((elem: string)=>elem===contactCardType);
        if(!isCardTypeValid){
            // console.log("card type invalid =====")
            SetValidationError(true);
            return;
        }
        if(contactEmail !== "null" && !validator.isEmail(contactEmail) || contactPhone !== "null"  && contactPhone.length < 10 ){
            // console.log("failed email check adn phone number ====")
            SetValidationError(true);
            return;
        }
        if( contactCardType !== "null" && !isCardTypeValid){
            // console.log("credit card check failed")
            SetValidationError(true);
            return;
        }
        
        // update existing contact
        await updateContactMutation.mutate(
            Object.freeze({
                id: contactEditID ? contactEditID.contactEditID.id : undefined,
                access_token: rpcTokenInZustand.token,
                name: contactName,
                image: data?.secure_url || undefined,
                email: contactEmail,
                phone: contactPhone,
                cardtype: contactCardType,
                cardno: contactCardNumber,
            })
        );

        if(!updateContactMutation.data || updateContactMutation.isError){
            SetMutationProcessFailed(true);
            return;
        }
        SetValidationError(false);
        SetMutationProcessFailed(false);
        onClose();
        return;
    }

    useEffect(()=>{
        //invalidate/refetch query to update contactsFreshList, after contact was updated
        utils.user.fetchFreshContactList.invalidate({
            access_token: rpcTokenInZustand.token
        });
    },[updateContactMutation.data])
    
        
    return(
        <>
            {/**Contact List Filter On Basis of Email, Phone, Card Number */}
            <Tooltip hasArrow label='Edit Contact' bg='#fff' color='black' placement="top">
                <IconButton
                    _hover={{bg:"#FBB6CE"}}
                    icon={<AiOutlineEdit />}
                    aria-label={'editcontact'}
                    onClick={handleNewContactModal}
                    ml={2}
                    mb={4}
                    bgColor="gray.200"
                ></IconButton>
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent overflow={"scroll"}>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    Edit contact 
                </DrawerHeader>
                <chakra.form onSubmit={handleUpdateContactData}>
                    <DrawerBody>
                        <Stack spacing='24px'>
                        <Text fontWeight="normal" mb={1}>Editing: {contactEditID ? contactEditID?.contactEditID?.name : 'unknown'}</Text>
                        <Box>
                            <Input
                                type="file"
                                id='contactimage'
                                disabled={contactImageSecureUrl.length > 1 ? true : false}
                            />
                            
                        </Box>
                        <Box>
                            <FormLabel htmlFor='contactname'>Name</FormLabel>
                            <Input
                            id='contactname'
                            placeholder={contactEditID ? contactEditID?.contactEditID?.name : 'Please enter contact name'}
                            onInput={(e: any)=>SetContactName(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='contactemail'>Email</FormLabel>
                            <Input
                            id='contactemail'
                            placeholder={contactEditID ? contactEditID?.contactEditID?.email : 'Please enter contact email'}
                            onInput={(e: any)=>SetContactEmail(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='contactphone'>Phone</FormLabel>
                            <Input
                            id='contactphone'
                            placeholder={contactEditID ? contactEditID?.contactEditID?.phone : 'Please enter contact phone'}
                            onInput={(e: any)=>SetContactPhone(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel htmlFor='cardtype'>Select Card Type</FormLabel>
                            <RadioGroup id='cardtype' onChange={SetContactCardType} value={contactCardType}>
                                <Stack direction='row'>
                                    <Radio value='DEBIT'>DEBIT</Radio>
                                    <Radio value='CREDIT'>CREDIT</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                        <Box>
                            <FormLabel htmlFor='cardNumber'>Card Number</FormLabel>
                            <PinInput mask onComplete={(value: any) => SetContactCardNumber(value)} >
                                <PinInputField onClick={(_e: any) => { SetContactCardNumber('null') }} />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose} _hover={{bg:"red.400"}}>
                            Cancel
                        </Button>
                        <Button colorScheme='teal' type="submit" disabled={updateContactMutation.isLoading ? true : false}>Update 🎭</Button>
                    </DrawerFooter>
                </chakra.form>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ContactEditModal;