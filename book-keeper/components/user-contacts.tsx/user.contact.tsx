import { useDisclosure, Link, Avatar, Divider, Flex, Heading, Icon, IconButton, Stack, Switch, Table, Tbody, Td, Text, Th, Thead, Tr, InputGroup, InputLeftElement, Input, Badge, Tooltip, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, FormLabel, Select, DrawerFooter, Button, chakra, FormControl, HStack, PinInput, PinInputField, Alert, AlertIcon, RadioGroup, Radio } from "@chakra-ui/react";
import {motion} from 'framer-motion';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineContacts, AiOutlineEdit, AiOutlineFileSearch, AiOutlineFileSync, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import {useEffect, useState} from 'react';
import ContactEditModal from "./user.contact.edit";
import ContactDeleteModal from "./user.contact.delete.modal";
import validator from "validator";
import { useCurrentUserInfo } from "../../store/current-user-info.store";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";


const UserContactSection = () => {
    
    const [view,changeView] = useState('hide');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ contactImageSecureUrl, SetContactImageSecureUrl ] = useState('');
    const [ contactName,SetContactName ] = useState('null');
    const [ contactEmail,SetContactEmail ] = useState('null');
    const [ contactPhone,SetContactPhone ] = useState('null');
    const [ contactCardType,SetContactCardType ] = useState('null');
    const [ contactCardNumber,SetContactCardNumber ] = useState('null');
    const [ validationError,SetValidationError ] = useState(false);
    const [ mutationProcessFailed,SetMutationProcessFailed ] = useState(false);
    const [ ftSearchQuery, SetFTSearchQuery ] = useState('nullify');
    const [ ftSearchOn, SetFTSearchOn ] = useState('nullify');
    const [ ftSearchActionEnabled,SetFTSearchActionEnabled ] = useState(false);

    const utils = trpcClient.useContext();
    
    const rpcTokenInZustand = useCurrentRpcToken.getState();
    const currentUserZustand: any = useCurrentUserInfo.getState();

    // query fresh contact list from trpc server
    const contactsFreshList: any = trpcClient.user.fetchFreshContactList.useQuery({
        access_token: rpcTokenInZustand.token
    })

    // query contact list on ftsearch init
    const contactsFTSearchList: any = trpcClient.user.ftextSearchContactList.useQuery({
        access_token: rpcTokenInZustand.token,
        search_on: ftSearchOn,
        search_query: ftSearchQuery
    });
    
    const addNewContactMutation: any = trpcClient.user.addNewContact.useMutation();
    
    /**@desc reset all contact values, opens up the new contact modal/drawer */
    const handleNewContactModal = async(): Promise<any> => {
        
        SetFTSearchActionEnabled(false);
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

    /**@desc handling new contact's data ,make trpc server call to create a new contact */
    const handleNewContactData = async(e: any): Promise<any> => {    
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
        
        // console.log("data to send to trpc server=========");
        // console.log(data?.secure_url);
        // console.log(contactName);
        // console.log(contactEmail);
        // console.log(contactPhone);
        // console.log(contactCardType);
        // console.log(contactCardNumber);

        // Add validation check wheather data passed is valid before making mutation req to trpc server
        if(contactEmail === "null" || contactPhone === "null" || contactCardType === "null" || contactCardNumber.length !== 16){
            // console.log("====null check failed")
            SetValidationError(true);
            return;
        }
        let possibleTypes: Array<string> = ["DEBIT","CREDIT"];
        let isCardTypeValid = possibleTypes.find((elem: string)=>elem===contactCardType);
        if(!isCardTypeValid){
            // console.log("card type invalid =====")
            SetValidationError(true);
            return;
        }
        if(!validator.isEmail(contactEmail) || contactPhone.length < 10 ){
            // console.log("failed email check adn phone number ====")
            SetValidationError(true);
            return;
        }
        if(contactCardType === "CREDIT" && !validator.isCreditCard(contactCardNumber)){
            // console.log("credit card check failed")
            SetValidationError(true);
            return;
        }
        
        // add new contact
        // 📝 with onSuccess , autfetch the contact list by making a new query request
        await addNewContactMutation.mutate(
            Object.freeze({
                access_token: rpcTokenInZustand.token,
                name: contactName,
                image: data?.secure_url || 'no',
                email: contactEmail,
                phone: contactPhone,
                cardtype: contactCardType,
                cardno: contactCardNumber,
            })
        );

        if(!addNewContactMutation.data || addNewContactMutation.isError){
            SetMutationProcessFailed(true);
            return;
        }
        SetValidationError(false);
        SetMutationProcessFailed(false);
        onClose();
        return;
    }

    /** handle text-search email/phone */
    const handleFTSearch = async(e: any): Promise<any> => {
        e.preventDefault();
        SetFTSearchActionEnabled(true);
        return;
    }

    useEffect(()=>{
        if(ftSearchActionEnabled){
            return;
        }
        //invalidate query to update contactsFreshList, after new contact was added
        utils.user.fetchFreshContactList.invalidate({
            access_token: rpcTokenInZustand.token
        });
        return;
    },[addNewContactMutation.data,ftSearchActionEnabled])


    // console.log("============fresh contact list from server ===");
    // console.log(contactsFreshList?.data?.data?.contact_list);

    let newlyAddedContact: any = contactsFreshList?.data?.data?.contact_list[0];
    // console.log(newlyAddedContact);

    const contactsList: any = contactsFreshList?.data?.data?.contact_list;
    
    // console.log("=====Text-search results====");
    // console.log(contactsFTSearchList.data);

    
    return (
        
        <>
            {/*User Contacts Section*/}
            <Flex
                w="100%"
                h="100%"
                flexDir="column"
                overflow="auto"
                p={5}
                display="flex-start"
                backgroundColor="#EDF2F7"
            >
                <Flex
                    w="100%"
                    h="20%"
                    p={3}
                    mt={5}
                    mb={1}
                    display="flex"
                    flexDir="column"
                    marginLeft={[3,2,17,20,20]}
                    overflow="hidden"
                >
                    <Stack direction='row' h={['85px','100px','60px','70px','100px']} p={4}>
                        <Divider orientation='vertical' borderColor="black" />
                        <Icon as={AiOutlineContacts} fontSize="sm"></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                                hidden:{
                                    scale: .8,
                                    opacity: 0
                                },
                                visible:{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        delay: 0.6
                                    }
                                },
                        }}>
                            <Heading color="purple.700" mt={[1,1,-1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="bold" fontSize={["2xl","normal","xl","2xl","3xl"]}>My Contacts</Heading>
                        </motion.div>
                    </Stack>
                </Flex>
                
                {/**Action/Interactive section */}
                <Stack direction='row' p={2} ml={100} mt={[-2,-5,-10,-10,-10]} display="flex">
                    <Flex alignContent="center">
                        <chakra.form onSubmit={handleFTSearch}>
                            <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#1A202C" borderRadius="10px" mr={2}>
                                <InputLeftElement pointerEvents="none" children={<AiOutlineFileSearch color="#1A202C"/>} />
                                <Input 
                                    type="text" 
                                    placeholder="search by email,phone or cardnumber [full-text-search]"
                                    borderRadius="15px"
                                    onInput={(e: any)=> { SetFTSearchQuery(e.target.value); }}
                                />
                            </InputGroup>
                        </chakra.form>
                        <RadioGroup defaultValue='2'>
                            <Stack ml={2} spacing={0.5} direction='column'>
                                <Radio size={"sm"} onClick={()=>SetFTSearchOn('email')} colorScheme='green' value='1'>
                                  Email
                                </Radio>
                                <Radio size={"sm"} onClick={()=>SetFTSearchOn('phone')} colorScheme='cyan' value='2'>
                                  Phone
                                </Radio>
                            </Stack>
                        </RadioGroup>
                        <Tooltip hasArrow label='perform text-search' bg='#fff' color='black' placement="top">
                            <IconButton
                                _hover={{bg:"#FBB6CE"}}
                                icon={<AiOutlineSearch />}
                                aria-label={'textSearchStartsWith'}
                                ml={1}
                                mb={4}
                                bgColor="gray.200"
                                type="submit"
                            />
                        </Tooltip>
                    </Flex>
                    <Tooltip hasArrow label='Add a new contact to your contact list.' bg='#fff' color='black' placement="right">
                        <IconButton
                            _hover={{bg:"#FBB6CE"}}
                            icon={<AiOutlinePlus />}
                            aria-label={'addnewcontact'}
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
                        size="xs"
                        preserveScrollBarGap={true}
                    >
                        <DrawerOverlay />
                        <DrawerContent overflow={"scroll"}>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth='1px'>
                            Add a new contact
                        </DrawerHeader>

                        {/** Add new Contact form section */}
                        <chakra.form onSubmit={handleNewContactData}>
                            <DrawerBody>                                    
                                    <Stack spacing='24px'>
                                        {/**image upload section*/}
                                        <FormControl>
                                            <Box>
                                                <Text fontWeight="semibold" mb={1}>Contact's Image</Text>
                                                <Stack mt={2} mb={2} direction='column'>
                                                    <Input
                                                        type="file"
                                                        id='contactimage'
                                                        disabled={contactImageSecureUrl.length > 1 ? true : false}
                                                    />
                                                </Stack>
                                            </Box>
                                            
                                            <Box>
                                                <FormLabel htmlFor='contactname'>Name</FormLabel>
                                                <Input
                                                id='contactname'
                                                placeholder='Please enter contact name'
                                                onInput={(e: any)=>SetContactName(e.target.value)}
                                                />
                                            </Box>
                                            
                                            <Box>
                                                <FormLabel htmlFor='contactemail'>Email</FormLabel>
                                                <Input
                                                id='contactemail'
                                                placeholder='Please enter contact email'
                                                onInput={(e: any)=>SetContactEmail(e.target.value)}
                                                />
                                            </Box>
                                            
                                            <Box>
                                                <FormLabel htmlFor='contactphone'>Phone</FormLabel>
                                                <Input
                                                id='contactphone'
                                                placeholder='Please enter contact phone'
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
                                
                                        </FormControl>
                                        
                                    
                                    </Stack>

                            </DrawerBody>
                        <DrawerFooter borderTopWidth='1px'>
                            <Stack mt={2} direction = 'column'>
                                <Alert display={ addNewContactMutation.isError || !addNewContactMutation.data ? 'flex' : 'none'} status='info'><AlertIcon />double check input's! </Alert>
                                <Alert display={ validationError ? 'flex' : 'none'} status='error'><AlertIcon />Validation failed ! make sure you enter correct details of the contact ! </Alert>
                            </Stack>
                            <Button variant='outline' mr={3} onClick={onClose} _hover={{bg:"red.400"}}>
                                Cancel
                            </Button>
                            <Button colorScheme='teal' type="submit" disabled={addNewContactMutation.isLoading ? true : false}>Add 🎭</Button>
                        </DrawerFooter>
                        </chakra.form>
                        </DrawerContent>
                    </Drawer>
                </Stack>
                

                {/** Contact List */}
                <Flex 
                    overflow='auto'
                >
                    <Table variant="unstyled" ml={100}>
                        <Thead bgColor="purple.100" >
                            <Tr color="gray.500">
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Phone</Th>
                                <Th>CardType</Th>
                                <Th>CardNumber</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {
                        
                        contactsFTSearchList?.data?.data?.ftsearch_result.length === 1 ?
                        <Tr>
                            <Td>
                                <Flex align="center">
                                    <Avatar size={["sm","md","md","lg","lg"]} mr={2} src={contactsFTSearchList?.data?.data?.ftsearch_result[0].image}/>
                                    <Flex flexDir="column">
                                        <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>{contactsFTSearchList?.data?.data?.ftsearch_result[0].name}</Heading>
                                    </Flex>
                                </Flex>
                            </Td>
                            <Td fontWeight="semibold">
                                {contactsFTSearchList?.data?.data?.ftsearch_result[0].email}                                
                            </Td>
                            <Td fontWeight="semibold">
                                {contactsFTSearchList?.data?.data?.ftsearch_result[0].phone}
                            </Td>
                            <Td>
                                <Badge colorScheme={contactsFTSearchList?.data?.data?.ftsearch_result[0].cardtype==="DEBIT" ? "green" : "orange"}>{contactsFTSearchList?.data?.data?.ftsearch_result[0].cardtype}</Badge>
                            </Td>
                            <Td fontWeight="semibold">
                                {contactsFTSearchList?.data?.data?.ftsearch_result[0].cardno}
                            </Td>
                            {/*pass the id & current details of this contact so that this contact id can be edited,deleted*/}
                            <Td>
                                <ContactEditModal contactEditID={contactsFTSearchList.data ? contactsFTSearchList?.data?.data?.ftsearch_result[0]: {} }/>
                                <ContactDeleteModal contactDeleteID={contactsFTSearchList.data ? contactsFTSearchList?.data?.data?.ftsearch_result[0] : {}}/>
                            </Td>
                        </Tr>

                        
                        :

                        <Tr>
                            <Td>
                                <Flex align="center">
                                    <Avatar size={["sm","md","md","lg","lg"]} mr={2} src={newlyAddedContact ? newlyAddedContact?.image : "john.jpeg"}/>
                                    <Flex flexDir="column">
                                        <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>{newlyAddedContact ? newlyAddedContact.name: 'Unknown'}</Heading>
                                    </Flex>
                                </Flex>
                            </Td>
                            <Td fontWeight="semibold">
                                {newlyAddedContact ? newlyAddedContact.email : "Unknown@x"}                                
                            </Td>
                            <Td fontWeight="semibold">
                                {newlyAddedContact ? newlyAddedContact.phone: "+Unknown"}
                            </Td>
                            <Td>
                                <Badge colorScheme={newlyAddedContact?.cardtype==="DEBIT" ? "green" : "orange"}>{newlyAddedContact ? newlyAddedContact?.cardtype : "Unknown"}</Badge>
                            </Td>
                            <Td fontWeight="semibold">
                                {newlyAddedContact ? newlyAddedContact.cardno : "Unknown"}
                            </Td>
                            {/*pass the id & current details of this contact so that this contact id can be edited,deleted*/}
                            <Td>
                                <ContactEditModal contactEditID={newlyAddedContact ? newlyAddedContact : {} }/>
                                <ContactDeleteModal contactDeleteID={newlyAddedContact ? newlyAddedContact : {}}/>
                            </Td>
                        </Tr>
                        }
                        {
                            view === 'show' &&
                            <>
                                {
                                    contactsList && contactsList.length > 1 && contactsFTSearchList?.data?.data?.ftsearch_result.length < 1 ? contactsList.map((contact: any)=>{
                                        if(contact.id !== contactsList[0].id){
                                            return (
                                                <Tr key={contact?.id}>
                                                    <Td>
                                                        <Flex align="center">
                                                            <Avatar size={["sm","md","md","lg","lg"]} mr={2} src={contact ? contact?.image : "john.jpeg"}/>
                                                            <Flex flexDir="column">
                                                                <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>{contact.name}</Heading>
                                                            </Flex>
                                                        </Flex>
                                                    </Td>
                                                    <Td fontWeight="semibold">
                                                        {contact?.email}                                
                                                    </Td>
                                                    <Td fontWeight="semibold">
                                                        {contact?.phone}
                                                    </Td>
                                                    <Td>
                                                        <Badge colorScheme={contact?.cardtype === "CREDIT" ? "orange" : "green"}>{contact?.cardtype}</Badge>
                                                    </Td>
                                                    <Td fontWeight="semibold">
                                                        {contact?.cardno}
                                                    </Td>
                                                    {/** send the contact id & contact data to edit/delete modal for operations */}
                                                    <Td>
                                                        <ContactEditModal contactEditID={contact ? contact : {} }/>
                                                        <ContactDeleteModal contactDeleteID={contact ? contact : {}}/>
                                                    </Td>
                                                </Tr>
                                            );
                                        }
                                        })
                                    :

                                    contactsFTSearchList?.data?.data?.ftsearch_result.length > 1 ?
                                    contactsFTSearchList?.data?.data?.ftsearch_result.map((contact: any)=>{
                                    if(contact.id !== contactsFTSearchList?.data?.data?.ftsearch_result[0].id){
                                        return (
                                            <Tr key={contact?.id}>
                                                <Td>
                                                    <Flex align="center">
                                                        <Avatar size={["sm","md","md","lg","lg"]} mr={2} src={contact ? contact?.image : "john.jpeg"}/>
                                                        <Flex flexDir="column">
                                                            <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>{contact.name}</Heading>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td fontWeight="semibold">
                                                    {contact?.email}                                
                                                </Td>
                                                <Td fontWeight="semibold">
                                                    {contact?.phone}
                                                </Td>
                                                <Td>
                                                    <Badge colorScheme={contact?.cardtype === "CREDIT" ? "orange" : "green"}>{contact?.cardtype}</Badge>
                                                </Td>
                                                <Td fontWeight="semibold">
                                                    {contact?.cardno}
                                                </Td>
                                                {/** send the contact id & contact data to edit/delete modal for operations */}
                                                <Td>
                                                    <ContactEditModal contactEditID={contact ? contact : {} }/>
                                                    <ContactDeleteModal contactDeleteID={contact ? contact : {}}/>
                                                </Td>
                                            </Tr>
                                        )
                                    }
                                            
                                    })
                                    
                                    :
                                    
                                    <Tr>
                                        <Td>
                                            <Flex align="center">
                                                <Avatar size={["sm","md","md","lg","lg"]} mr={2} src="john.jpeg"/>
                                                <Flex flexDir="column">
                                                    <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>unknown</Heading>
                                                </Flex>
                                            </Flex>
                                        </Td>
                                        <Td fontWeight="semibold">
                                            unknown@xxail                                
                                        </Td>
                                        <Td fontWeight="semibold">
                                            +unknown
                                        </Td>
                                        <Td>
                                            <Badge colorScheme="orange">unknown</Badge>
                                        </Td>
                                        <Td fontWeight="semibold">
                                            unknown
                                        </Td>
                                        <Td>
                                        </Td>
                                    </Tr>
                                }       
                            </>
                        }
                        </Tbody>
                    </Table>
                </Flex>
                <Flex align="center">
                    <Divider/>
                    <IconButton 
                        _hover={{bg:"#FBB6CE"}}
                        icon={view === 'show' ? <AiFillCaretUp /> : <AiFillCaretDown />}
                        aria-label={''}
                        onClick={()=>{
                            if(view === 'show'){
                                changeView('hide');
                            }else{
                                changeView('show');
                            }
                        }} 
                    />
                    <Divider/>
                </Flex>        
            </Flex>  
        </>
    )
}

export default UserContactSection;