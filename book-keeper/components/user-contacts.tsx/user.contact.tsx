import { useDisclosure, Link, Avatar, Divider, Flex, Heading, Icon, IconButton, Stack, Switch, Table, Tbody, Td, Text, Th, Thead, Tr, InputGroup, InputLeftElement, Input, Badge, Tooltip, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, FormLabel, Select, DrawerFooter, Button } from "@chakra-ui/react";
import {motion} from 'framer-motion';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineContacts, AiOutlineEdit, AiOutlineFileSearch, AiOutlinePlus } from "react-icons/ai";
import {useState} from 'react';
import { GrTrash } from "react-icons/gr";
import ContactListFilter from "./user.contact.filter";
import ContactEditModal from "./user.contact.edit";
import ContactDeleteModal from "./user.contact.delete.modal";

const UserContactSection = () => {
    const [view,changeView] = useState('hide');
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                        <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#1A202C" borderRadius="10px" mr={2}>
                            <InputLeftElement pointerEvents="none" children={<AiOutlineFileSearch color="#1A202C"/>} />
                            <Input type="text" placeholder="Search by email, phone." borderRadius="15px"/>
                        </InputGroup>
                        
                        <ContactListFilter />
                        
                    </Flex>
                    <Tooltip hasArrow label='Add a new contact to your contact list.' bg='#fff' color='black' placement="right">
                        <IconButton
                            _hover={{bg:"#FBB6CE"}}
                            icon={<AiOutlinePlus />}
                            aria-label={'addnewcontact'}
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
                            Add a new contact
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
                            <Button colorScheme='teal'>Add 🎭</Button>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Stack>
                

                {/** Contact List */}
                <Flex 
                    overflow='auto'
                >
                    {/** 🎈 make sure to make this dynamic */}
                    <Table variant="unstyled" ml={100}>
                        <Thead bgColor="purple.100" >
                            <Tr color="gray.500">
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Phone</Th>
                                <Th>Card Type</Th>
                                <Th>Card Number</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td>
                                <Flex align="center">
                                    <Avatar size={["sm","md","md","lg","lg"]} mr={2} src="john.jpeg"/>
                                    <Flex flexDir="column">
                                        <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>Rohan Mittal</Heading>
                                    </Flex>
                                </Flex>
                            </Td>
                            <Td fontWeight="semibold">
                                mittal.rohan@gmail.com                                
                            </Td>
                            <Td fontWeight="semibold">
                                +919872245500
                            </Td>
                            <Td>
                                <Badge colorScheme="green">Debit</Badge>
                            </Td>
                            <Td fontWeight="semibold">
                                1983 **** **** ****
                            </Td>
                            <Td>
                                <ContactEditModal />
                                <ContactDeleteModal />
                            </Td>
                        </Tr>
                        {
                            view === 'show' &&
                            <>
                                <Tr>
                                    <Td>
                                        <Flex align="center">
                                            <Avatar size={["sm","md","md","lg","lg"]} mr={2} src="john.jpeg"/>
                                            <Flex flexDir="column">
                                                <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>Rohan Mittal</Heading>
                                            </Flex>
                                        </Flex>
                                    </Td>
                                    <Td fontWeight="semibold">
                                        mittal.rohan@gmail.com                                
                                    </Td>
                                    <Td fontWeight="semibold">
                                        +919872245500
                                    </Td>
                                    <Td>
                                        <Badge colorScheme="orange">Credit</Badge>
                                    </Td>
                                    <Td fontWeight="semibold">
                                        1838 **** **** ****
                                    </Td>
                                    <Td>
                                        <ContactEditModal />
                                        <ContactDeleteModal />
                                    </Td>
                                </Tr>       
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