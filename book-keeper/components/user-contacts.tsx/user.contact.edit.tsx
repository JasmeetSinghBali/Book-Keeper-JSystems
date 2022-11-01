import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useRef } from 'react';
import { AiOutlineEdit } from "react-icons/ai";


const ContactEditModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();    
    return(
        <>
            {/**Contact List Filter On Basis of Email, Phone, Card Number */}
            <Tooltip hasArrow label='Edit Contact' bg='#fff' color='black' placement="top">
                <IconButton
                    _hover={{bg:"#FBB6CE"}}
                    icon={<AiOutlineEdit />}
                    aria-label={'editcontact'}
                    onClick={onOpen}
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
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    Edit contact
                </DrawerHeader>

                <DrawerBody>
                    <Stack spacing='24px'>
                    <Box>
                        <Text fontWeight="semibold" mb={1}>Contact's Image</Text>
                        <Input
                            type="file"
                            id='contactimage'

                        />
                        
                    </Box>
                    <Box>
                        <FormLabel htmlFor='contactname'>Name</FormLabel>
                        <Input
                        id='contactname'
                        placeholder='Please enter contact name'
                        />
                    </Box>
                    <Box>
                        <FormLabel htmlFor='contactemail'>Email</FormLabel>
                        <Input
                        id='contactemail'
                        placeholder='Please enter contact email'
                        />
                    </Box>
                    <Box>
                        <FormLabel htmlFor='contactphone'>Phone</FormLabel>
                        <Input
                        id='contactphone'
                        placeholder='Please enter contact phone'
                        />
                    </Box>
                    <Box>
                        <FormLabel htmlFor='cardtype'>Select Card Type</FormLabel>
                        <Select id='cardtype' defaultValue='segun'>
                        <option value='credit'>Credit</option>
                        <option value='debit'>Debit</option>
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel htmlFor='cardNumber'>Card Number</FormLabel>
                        <Input
                        id='cardNumber'
                        placeholder='Please provide contact card number'
                        type="password"
                        />
                    </Box>
                    <Box>
                        <FormLabel htmlFor='confirmcardNumber'>Confirm Card Number</FormLabel>
                        <Input
                        id='confirmcardNumber'
                        placeholder='Please confirm contact card number'
                        type="password"
                        />
                    </Box>
                    </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={onClose} _hover={{bg:"red.400"}}>
                        Cancel
                    </Button>
                    <Button colorScheme='teal'>Update 🎭</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ContactEditModal;