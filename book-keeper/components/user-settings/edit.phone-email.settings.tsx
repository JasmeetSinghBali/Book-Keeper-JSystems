import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, useDisclosure,chakra, Tooltip, Flex, HStack, PinInput, PinInputField, Alert, AlertIcon } from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { AiFillCalendar, AiFillEdit, AiOutlineSync } from "react-icons/ai";

const EditPhoneEmailModal = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userEmail, SetUserEmail] = useState('null');
    const [userPhone, SetUserPhone] = useState(0);
    const [allowEmailEdit,SetAllowEmailEdit] = useState(false);
    const [allowPhoneEdit,SetAllowPhoneEdit] = useState(true);
    const [switchToOtpVerify,SetSwitchToOtpVerify] = useState(false);
    const [ emailCode, SetEmailCode ] = useState('');
    const [ removeError, SetRemoveError ] = useState(false);
    const [removeValidationError, SetRemoveValidationError] = useState(false);

    const initialRef = useRef(null);
    const finalRef = useRef(null);    
    
    // 🎈 under construction
    const updateEmailPhone = async (e: any): Promise<any> =>{
        e.preventDefault();
        // 🎈 add validators for phone if error then show that error in the modal  body , set error as use state
        console.log("Everything setup good");
        if(userEmail === 'null' && userPhone === 0){
            // 🎈 set use state error true and display inside the modal, saying at least one thing must be updated & dont switch to OTP modal
        }
        // 🎈 pick up both email and phone and make sure one passes the validation at least i.e either email is correct or phone is valid
        // if 1 is validated and other then send the placeholder value for the unvalidated one to be interpreted correctly for mutation procedure  
        // dispatch OTP with email used sessioned procedure already built
        console.log(userPhone);
        console.log(userEmail);
        SetRemoveValidationError(true);
        SetSwitchToOtpVerify(true);
        return;
    }

    // 🎈 under construction
    const verifyEmailOtpCode = async(e: any): Promise<any>=>{
        e.preventDefault();
        // 🎈send email,phone & OTP to verify&updateEmailPhone protected route
        // show error according to mutation.isLoading or mutation.isError
        console.log(emailCode);
        console.log(userPhone);
        console.log(userEmail);
        SetSwitchToOtpVerify(false)
        return;
    }
    
    return(
        
        <>
            <Tooltip label='Note: regardless of wheather you update phone/email or both reverification step would be needed via OTP that will be dispatched to current email.' hasArrow arrowSize={15} closeDelay={900} placement="right">
                
                {/**Edit Phone Email Modal */}
                <IconButton
                onClick={onOpen}
                onMouseEnter={()=>{SetUserEmail(''); SetUserPhone(0);}} 
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
                                        placeholder={userEmail} 
                                    />
                                    <Input 
                                        disabled={allowPhoneEdit? true : false}
                                        placeholder={userPhone.toString()}
                                        type="tel"
                                        onInput={(e: any)=>{SetUserPhone(e.target.value)}}
                                        />
                                </FormControl>
                            }

                        </ModalBody>

                        <ModalFooter>
                            {
                                switchToOtpVerify ? 
                                
                                <Button 
                                _hover={{bg: "teal.400"}}
                                bgColor="blackAlpha.900"
                                color="#fff"
                                mr={3}
                                type="submit"
                                >
                                    Verify
                                </Button>   
                                
                                // 🎈 check a/c to mutation.error if exist then show this ref verify component page
                                // { <Alert display={removeError ? 'none' : 'flex'} status='error'><AlertIcon/>Verification failed! </Alert>}
                                
                                :
                                <>
                                    <Button 
                                    _hover={{bg: "teal.400"}}
                                    bgColor="blackAlpha.900"
                                    color="#fff"
                                    mr={3}
                                    type="submit"
                                    >
                                        Update
                                    </Button>
                                    <Alert display={removeValidationError ? 'none' : 'flex'} status='error'><AlertIcon/>Validation failed! </Alert>
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