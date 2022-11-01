import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { RiFilterLine } from "react-icons/ri";

const ContactListFilter = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [contactFilter, setContactFilter] = useState('1');

    const initialRef = useRef(null);
    const finalRef = useRef(null);    
    
    return(
        <>
            {/**Contact List Filter On Basis of Email, Phone, Card Number */}
            <Tooltip hasArrow label='Apply filters' bg='#fff' color='black' placement="top">
                <IconButton
                    _hover={{bg:"#FBB6CE"}}
                    icon={<RiFilterLine />}
                    aria-label={'Filters'}
                    onClick={onOpen}
                    ml={2}
                    mb={4}
                    bgColor="gray.200"
                >    
                </IconButton>
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
                <ModalHeader>Contacts List</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel htmlFor="txnfilterchoice">Filter By</FormLabel>
                    <RadioGroup fontWeight="semibold" letterSpacing="tight" onChange={setContactFilter} value={contactFilter}>
                    <Stack direction='row'>
                        <Radio value='1'>Email</Radio>
                        <Radio value='2'>Phone</Radio>
                        <Radio value='3'>Card Number</Radio>
                    </Stack>
                    </RadioGroup>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button _hover={{bg: "teal.400"}} bgColor="blackAlpha.900" color="#fff" mr={3}>
                     Apply
                    </Button>
                    <Button onClick={onClose} _hover={{bg: "red.300"}}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ContactListFilter;