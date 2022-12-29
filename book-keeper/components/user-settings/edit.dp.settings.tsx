import { Alert, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, IconButton, Input, Stack, Text,chakra, useDisclosure, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useCurrentUserInfo } from "../../store/current-user-info.store";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";


const EditDisplayPictureModal = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ validationError, SetValidationError ] = useState(false);
    const [ userImageSecureUrl, SetUserImageSecureUrl ] = useState('');
    const [ mutationProcessFailed, SetMutationProcessFailed ] = useState(false);

    const rpcTokenInZustand =  useCurrentRpcToken.getState();

    const editUserImageMutation: any = trpcClient.user.updateUserDP.useMutation();

    /** 
     * 
     * @desc handles image from form, make request to upload to cloduinary and update the dp for user in DB mutation call
     * also updates user data in zustand store
     * */
    const handleUpdateProfileImage = async(e: any) => {
        e.preventDefault();
        // console.log("sorted===");

        // Sort form data image & upload to cloudinary
        const form = e.currentTarget;
        const fileInput: any = Array.from(form.elements).find(
            ({ id }: any) => id === 'userProfileImageUpdate'
        );
        
        let data:any;
        if(fileInput.files && userImageSecureUrl.length === 0){
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
            SetUserImageSecureUrl(data.secure_url);
        }
        await editUserImageMutation.mutate(
            Object.freeze({
                access_token: rpcTokenInZustand.token,
                image: data?.secure_url || 'no',
            })
        );

        if(!editUserImageMutation.data || editUserImageMutation.isError){
            SetMutationProcessFailed(true);
            return;
        }
        // set user zustand store data
        useCurrentUserInfo.setState({user: editUserImageMutation.data.data});
        
        SetValidationError(false);
        SetMutationProcessFailed(false);
        onClose();
        return;
    }

    return (
        <>
            <IconButton
                onClick={onOpen} 
                icon={<AiFillCamera />}
                fontSize={["medium","medium","medium","large","x-large"]}
                bgColor="gray.200"
                borderRadius="100%"
                // p="10px"
                aria-label={'ChangePhoto'} 
                _hover={{bg:"pink.200"}}
            />
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
                    Update Profile Image
                </DrawerHeader>

                {/** Edit profile pic user general settings section */}
                <chakra.form onSubmit={handleUpdateProfileImage}>
                    <DrawerBody>                                    
                            
                            <Stack spacing='24px'>
                                {/**image upload section*/}
                                <FormControl>
                                    <Box>
                                        <Text fontWeight="semibold" mb={1}>upload</Text>
                                        <Stack mt={2} mb={2} direction='column'>
                                            <Input
                                                type="file"
                                                id='userProfileImageUpdate'
                                                disabled={userImageSecureUrl.length > 1 ? true : false}
                                            />
                                        </Stack>
                                    </Box>
                        
                                </FormControl>
                                
                            
                            </Stack>

                    </DrawerBody>
                <DrawerFooter borderTopWidth='1px'>
                    <Stack mt={2} direction = 'column'>
                        {/* <Alert display={ editUserImageMutation.isError || !editUserImageMutation.data ? 'flex' : 'none'} status='info'><AlertIcon />double check input's! </Alert>
                        <Alert display={ validationError ? 'flex' : 'none'} status='error'><AlertIcon />Validation failed ! make sure you enter correct details of the contact ! </Alert> */}
                    </Stack>
                    <Button variant='outline' mr={3} onClick={onClose} _hover={{bg:"red.400"}}>
                        Cancel
                    </Button>
                    {/* <Button colorScheme='teal' type="submit" disabled={editUserImageMutation.isLoading ? true : false}>Update</Button> */}
                    <Button colorScheme='teal' type="submit" >Update</Button>
                </DrawerFooter>
                </chakra.form>
                </DrawerContent>
            </Drawer>
        </>
    )

}

export default EditDisplayPictureModal;