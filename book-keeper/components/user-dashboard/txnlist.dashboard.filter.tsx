import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, useDisclosure } from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { AiFillCalendar } from "react-icons/ai";

const TxnListFilter = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chartFilter, setChartFilter] = useState('1');
    const [chartSubFilter, setChartSubFilter] = useState('1');

    const initialRef = useRef(null);
    const finalRef = useRef(null);    
    
    return(
        <>
            {/**Txn List Filter On Basis of Sender/Reciever, Category */}
            <IconButton onClick={onOpen} icon={<AiFillCalendar />} aria-label={'transactionlistfilters'} _hover={{bg:"teal.200"}} ></IconButton>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size={["sm","md","lg","lg","xl"]}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Txn List</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel htmlFor="txnfilterchoice">Filter By</FormLabel>
                    <RadioGroup fontWeight="semibold" letterSpacing="tight" onChange={setChartFilter} value={chartFilter}>
                    <Stack direction='row'>
                        <Radio value='1'>Category</Radio>
                        <Radio value='2'>Sender/Reciever</Radio>
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

export default TxnListFilter;