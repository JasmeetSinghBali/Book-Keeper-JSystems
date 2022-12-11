import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, useDisclosure,chakra, Tooltip, Flex } from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { AiFillCalendar, AiFillEdit, AiOutlineSync } from "react-icons/ai";

const EditPhoneEmailModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userEmail, SetUserEmail] = useState('');
    const [userPhone, SetUserPhone] = useState(0);
    const [allowEmailEdit,SetAllowEmailEdit] = useState(false);
    const [allowPhoneEdit,SetAllowPhoneEdit] = useState(true);

    const initialRef = useRef(null);
    const finalRef = useRef(null);    
    
    // 🎈 under construction
    const updateEmailPhone = async (e: any): Promise<any> =>{
        e.preventDefault();
        // add validators for phone if error then show that error in the modal  body , set error as use state
        console.log("Everything setup good");
        if(userEmail === '' || userPhone === 0){
            // 🎈 set use state error true and display inside the modal
        }
        console.log(userPhone);
        console.log(userEmail);
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
                    <Tooltip label='Toggle update email/phone via otp recieved at current email(🎈make this dynamic a/c to user data)' hasArrow arrowSize={5} closeDelay={10} placement="bottom">
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
                    Update Email/Phone
                </ModalHeader>
                <ModalCloseButton />
                
                    <chakra.form onSubmit={updateEmailPhone}>
                        <ModalBody pb={2}>
                            <FormControl>
                                
                                {/*🎈 make this dynamic on basis of use state , make sure user cannot edit both email & phone at the same time , at one time show only either email input with otp verify or phone input with otp verify*/}
                                
                                <Input 
                                    disabled={allowEmailEdit ? true : false}
                                    ref={initialRef}
                                    type="email" 
                                    onInput={(e:any)=>{SetUserEmail(e.target.value)}}
                                    placeholder="Current Email" 
                                />
                                <Input 
                                    disabled={allowPhoneEdit? true : false}
                                    placeholder='Current Phone'
                                    type="tel"
                                    onInput={(e: any)=>{SetUserPhone(e.target.value)}}
                                    />
                            </FormControl>

                        </ModalBody>

                        <ModalFooter>
                            <Button _hover={{bg: "teal.400"}} bgColor="blackAlpha.900" color="#fff" mr={3} type="submit">
                                Update
                            </Button>
                            <Button onClick={onClose} _hover={{bg: "red.300"}}>Cancel</Button>
                        </ModalFooter>

                    </chakra.form>
                
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditPhoneEmailModal;