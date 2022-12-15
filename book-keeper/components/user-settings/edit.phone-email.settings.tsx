import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, useDisclosure,chakra, Tooltip, Flex, HStack, PinInput, PinInputField, Alert, AlertIcon } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from 'react';
import { AiFillEdit, AiOutlineSync } from "react-icons/ai";
import validator from "validator";
import { useCurrentUserInfo } from "../../store/current-user-info.store";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";

const EditPhoneEmailModal = () => {
    
    const { push, pathname} = useRouter();
    const { data: session, status} = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ userEmail, SetUserEmail] = useState('null');
    const [ userPhone, SetUserPhone] = useState('null');
    const [ allowEmailEdit, SetAllowEmailEdit] = useState(false);
    const [ allowPhoneEdit, SetAllowPhoneEdit] = useState(true);
    const [ switchToOtpVerify, SetSwitchToOtpVerify] = useState(false);
    const [ emailCode, SetEmailCode ] = useState('');
    const [ removeError, SetRemoveError ] = useState(true);
    const [ removeValidationError, SetRemoveValidationError] = useState(true);
    

    const rpcTokenInZustand = useCurrentRpcToken.getState();
    const currentUserZustand: any = useCurrentUserInfo.getState();

    // const checkQuery: any = trpcClient.rpcAccess.checkRpcAccess.useQuery({ email: session?.user?.email});
    const trackedMutationProcedure: any = trpcClient.user.updateEmailPhone.useMutation();

    const rpcDispatchedEmail: any = trpcClient.user.dispatchEmailOtp.useMutation();

    const initialRef = useRef(null);
    const finalRef = useRef(null);    
    
    // adjusts email/phone values, dispatches OTP to user old email
    const updateEmailPhone = async (e: any): Promise<any> =>{
        
        e.preventDefault();
        if(userEmail === 'null' && userPhone === 'null'){
            SetRemoveValidationError(false);
            return;
        }
        
        let emailValidated: Boolean = false;
        let phoneValidated: Boolean = false;

        if(userEmail !== 'null'){
            emailValidated = validator.isEmail(userEmail);
        }
        if(userPhone !== 'null'){
            phoneValidated = validator.isMobilePhone(userPhone.toString());
        }
        
        // both email & phone are not valid setValidation error flag and return
        if(!emailValidated && !phoneValidated){
            SetRemoveValidationError(false);
            return;
        }
        
        if(!emailValidated && phoneValidated){    
            SetUserEmail('null');
        }
        if(!phoneValidated && emailValidated){
            SetUserPhone('null')
        }
        
        // console.log("=========phone and email to be sent store in useState=====")
        // console.log(userPhone);
        // console.log(userEmail);
        // console.log("======just before dispatching OTP=====");
        
        // dispatch email otp
        await rpcDispatchedEmail.mutate({
            email: session?.user?.email,
            access_token: rpcTokenInZustand.token
        });
        
        if(rpcDispatchedEmail.isError){
            SetRemoveValidationError(false);
            SetRemoveError(false);
            return;
        }
        SetRemoveValidationError(true);
        SetSwitchToOtpVerify(true);
        return;
    }

    // mutation request to update email,phone with email OTP
    const verifyEmailOtpCode = async(e: any): Promise<any>=>{
        e.preventDefault();
        
        // show error according to mutation.isLoading or mutation.isError
        // console.log("=====Final data sent to mutate email/phone====");
        // console.log(emailCode);
        // console.log(userPhone);
        // console.log(userEmail);
        
        // send email,phone & OTP to verify&updateEmailPhone protected route
        await trackedMutationProcedure.mutate({email: userEmail,phone:userPhone,emailCode: emailCode, access_token: rpcTokenInZustand.token});
        SetSwitchToOtpVerify(false)
        return;
    }

    useEffect(()=>{
        if(session?.user?.email !== currentUserZustand.user.email){
            push('/user/dashboard');
            return;
        }
        return;
    },[])

    useEffect(()=>{
        if(trackedMutationProcedure.data){
            // console.log("User was updated and trpc server responded with this=======");
            // console.log(trackedMutationProcedure.data);
            // update the zustand store with updated user data
            useCurrentUserInfo.setState(trackedMutationProcedure.data.data);
            push('/user/dashboard');
        }
    },[trackedMutationProcedure.data])

    useEffect(()=>{
        if(!rpcDispatchedEmail.data || rpcDispatchedEmail.isError){
            push('/user/dashboard');
            return;
        }
    }, [rpcDispatchedEmail.data])
    
    return(
        
        <>
            <Tooltip label='Note: regardless of wheather you update phone/email or both reverification step would be needed via OTP that will be dispatched to current email.' hasArrow arrowSize={15} closeDelay={900} placement="right">
                
                {/**Edit Phone Email Modal */}
                <IconButton
                onClick={onOpen}
                onMouseEnter={()=>{SetUserEmail('null'); SetUserPhone('null'); SetRemoveError(true);}} 
                icon={<AiFillEdit />}
                fontSize="xs"
                bgColor="gray.200"
                borderRadius="100%"
                aria-label={'EditUserBasicDetails'} 
                _hover={{bg:"pink.200"}}/>
            
            </Tooltip>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size={["sm","md","lg","lg","xl"]}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    {
                        !switchToOtpVerify && 
                    <Tooltip label="Hint: toggle's email/phone edit" hasArrow arrowSize={5} closeDelay={10} placement="bottom">
                        <IconButton
                            onClick={()=>{ SetAllowEmailEdit(!allowEmailEdit); SetAllowPhoneEdit(!allowPhoneEdit)}} 
                            icon={<AiOutlineSync />}
                            fontSize="xs"
                            bgColor="gray.200"
                            borderRadius="100%"
                            aria-label={'Edit_User_Email'} 
                            _hover={{bg:"pink.200"}}
                        />
                    </Tooltip>
                    }
                    
                    {
                        switchToOtpVerify ?
                        
                        'Verify OTP' :
                        
                        'Update Email/Phone'                        
                    }

                </ModalHeader>
                <ModalCloseButton />
                
                    <chakra.form onSubmit={!switchToOtpVerify ? updateEmailPhone : verifyEmailOtpCode}>
                        <ModalBody pb={2}>
                            {
                                switchToOtpVerify ? 
                                
                                <FormControl>
                                    
                                    <HStack ml={150}>
                                        <PinInput mask onComplete={(value: string)=> SetEmailCode(value)} onChange={(value: string)=>{ if(value.length !== 6){SetRemoveError(false)}}}>
                                            <PinInputField onClick={(_e: any) => { if(!removeError) {SetRemoveError(true)} }}/>
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                            <PinInputField />
                                        </PinInput>
                                    </HStack>

                                </FormControl>
                                : 
                                <FormControl>
                                    
                                    <Input 
                                        disabled={allowEmailEdit ? true : false}
                                        ref={initialRef}
                                        type="email" 
                                        onInput={(e:any)=>{SetUserEmail(e.target.value)}}
                                        placeholder={currentUserZustand.user.email} 
                                    />
                                    <Input 
                                        disabled={allowPhoneEdit? true : false}
                                        placeholder={currentUserZustand.user.phone}
                                        type="tel"
                                        onInput={(e: any)=>{SetUserPhone(e.target.value)}}
                                        />
                                </FormControl>
                            }

                        </ModalBody>

                        <ModalFooter>
                            {
                                switchToOtpVerify ? 
                                
                                
                                <>
                                    <Button 
                                    _hover={{bg: "teal.400"}}
                                    bgColor="blackAlpha.900"
                                    color="#fff"
                                    mr={3}
                                    type="submit"
                                    disabled={trackedMutationProcedure.isLoading ? true : false}
                                    >
                                        Verify
                                    </Button>   
                                    
                                    <Alert 
                                        display={trackedMutationProcedure.isError ? 'flex' : 'none'}
                                        status='error'>
                                            <AlertIcon/>
                                        Verification failed! 
                                    </Alert>
                                </>
                                
                                :
                                <>
                                    <Button 
                                    _hover={{bg: "teal.400"}}
                                    bgColor="blackAlpha.900"
                                    color="#fff"
                                    mr={3}
                                    type="submit"
                                    disabled={rpcDispatchedEmail.isLoading ? true : false}
                                    >
                                        Update
                                    </Button>
                                    <Alert display={rpcDispatchedEmail.isError ? 'flex' : 'none'} status='error'><AlertIcon/>Update failed! </Alert>
                                </>
                                
                            }
                            <Button onClick={onClose} _hover={{bg: "red.300"}}>Cancel</Button>
                        </ModalFooter>

                    </chakra.form>
                
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditPhoneEmailModal;