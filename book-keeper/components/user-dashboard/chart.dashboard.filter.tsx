import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, useDisclosure } from "@chakra-ui/react";
import { SiBookmeter } from "react-icons/si";
import { useState, useRef } from 'react';

const ChartRanger = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chartFilter, setChartFilter] = useState('1');
    const [chartSubFilter, setChartSubFilter] = useState('1');

    const initialRef = useRef(null);
    const finalRef = useRef(null);    
    
    return(
        <>
            {/**Chart Slider Filter On Basis of Week,Month */}
            <IconButton onClick={onOpen}
                icon={<SiBookmeter />}
                aria-label={'chartfilters'}
                _hover={{bg:"teal.200"}} >
                </IconButton>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Chart Analysis</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel htmlFor="chartfilterchoice">Chart As</FormLabel>
                    <RadioGroup fontWeight="semibold" letterSpacing="tight" onChange={setChartFilter} value={chartFilter}>
                    <Stack direction='row'>
                        <Radio value='1'>Credits-vs-Debit</Radio>
                        <Radio value='2'>Invoices-vs-Income</Radio>
                    </Stack>
                    </RadioGroup>
                    </FormControl>
                    <FormControl>
                    <FormLabel htmlFor="chartfilterSubChoice">Filter By</FormLabel>
                    <RadioGroup fontWeight="semibold" letterSpacing="tight" onChange={setChartSubFilter} value={chartSubFilter}>
                    <Stack direction='row'>
                        <Radio value='1'>Week</Radio>
                        <Radio value='2'>Month</Radio>
                    </Stack>
                    </RadioGroup>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button _hover={{bg: "teal.400"}} bgColor="blackAlpha.900" color="#fff" mr={3}>
                        Apply
                    </Button>
                    <Button _hover={{bg: "red.300"}} onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ChartRanger;