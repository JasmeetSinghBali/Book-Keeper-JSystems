import React,{ useEffect, useState } from 'react';
import { 
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    FormLabel,
    DrawerFooter,
    Select,
    Drawer,
} from "@chakra-ui/react";
import {
    AiFillCreditCard,
    AiOutlineFileSearch,
} from 'react-icons/ai';
import {
    FiDollarSign,
    FiPlus
} from 'react-icons/fi'
import NotificationSection from './notification.dashboard';
import {motion} from 'framer-motion';
import { trpcClient } from '../../utils/Clientrpc';
import { useCurrentRpcToken } from '../../store/rpc-token-store';

const SearchNotificationSection = () =>{
    
    const [card,selectCard] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const utils = trpcClient.useContext();
    const rpcTokenInZustand = useCurrentRpcToken.getState();

    
    const contactsFreshList: any = trpcClient.user.fetchFreshContactList.useQuery({
        access_token: rpcTokenInZustand.token
    })

    // console.log(contactsFreshList?.data?.data?.contact_list);

    return (
        <>
            {/*📝 Search part + Card Slider part + credit/debit Total Funds related to all cards + [For Future Versions] Add new contact + Dispatch/Send funds Section */}
            <Flex
                w={["100%","100%","30%"]} 
                minW={[null,null,"300px","300px","400px"]}
                backgroundColor="gray.50"
                p="3%"
                flexDir="column"
                overflow="auto"
            >
                {/*
                    📝 Search section make this dynamic to search contacts and display them via a pop up
                    📝 Notification Bell part[Add Drawer Section for notifications to display them on click, resource: https://chakra-ui.com/docs/components/list use unstyled list to show notifcation as Text inside drawer]
                */}
                <Flex alignContent="center">
                    <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#1A202C" borderRadius="10px" mr={2}>
                        <InputLeftElement pointerEvents="none" >
                            <AiOutlineFileSearch color="#1A202C"/>
                        </InputLeftElement>
                        <Input type="number" placeholder="Search card via number" borderRadius="10px"/>
                    </InputGroup>
                    {/*🧩 Notification Section */}
                    <NotificationSection/>
                </Flex>
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden:{
                        scale: .8,
                        opacity: 0
                    },
                    visible:{
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: 1.6
                        }
                    },
                }}>
                    <Flex flexDirection="row">
                    <Heading letterSpacing="tighter" fontWeight="bold" display="inline-flex" fontSize="xl" >My Cards</Heading>
                        <Button onClick={onOpen} leftIcon={<FiPlus />} size="xs" ml={2} colorScheme="teal" bgColor="gray.300">Add</Button>
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
                                Add a new card
                            </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing='24px'>
                                <Box>
                                    <Text fontWeight="semibold" mb={1}>Contact&apos;s Image</Text>
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
                    </Flex>
                </motion.div>
                {/**Card Sliding Selector 🎈 make sure to make this dynamic , also limit each user to 3 cards only via backend logic */}
                {card === 1 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h={["300px","300px","1000px","1000px","1000px"]}
                        bgGradient="linear(to-t, #00B58D, #29259A)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Current Balance</Text>
                                    <Text fontWeight="bold" fontSize="xl">$5,750.20</Text>
                                </Flex>
                                <Flex align="center">
                                    <Icon mr={2} as={AiFillCreditCard} />
                                    <Text>Keeper.</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}>**** **** **** 1289</Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">Valid Thru</Text>
                                        <Text fontSize="lg">12/23</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs">CVV</Text>
                                        <Text fontSize="lg">***</Text>
                                    </Flex>
                                </Flex>
                                <Icon as={AiFillCreditCard} />
                            </Flex>
                        </Flex>
                    </Box> 
                }
                {card === 2 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h={["300px","300px","1000px","1000px","1000px"]}
                        bgGradient="linear(to-t, #F687B3, #29259A)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Current Balance</Text>
                                    <Text fontWeight="bold" fontSize="xl">$5,750.20</Text>
                                </Flex>
                                <Flex align="center">
                                    <Icon mr={2} as={AiFillCreditCard} />
                                    <Text>Keeper.</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}>**** **** **** 3428</Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">Valid Thru</Text>
                                        <Text fontSize="lg">12/23</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs">CVV</Text>
                                        <Text fontSize="lg">***</Text>
                                    </Flex>
                                </Flex>
                                <Icon as={AiFillCreditCard} />
                            </Flex>
                        </Flex>
                    </Box> 
                }
                {card === 3 &&
                    <Box
                        borderRadius="25px"
                        mt={4}
                        w="100%"
                        h={["300px","300px","1000px","1000px","1000px"]}
                        bgGradient="linear(to-t, #F6AD55, #29259A)"
                    >
                        <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
                            <Flex justify="space-between" w="100%" align="flex-start">
                                <Flex flexDir="column">
                                    <Text color="gray.400">Current Balance</Text>
                                    <Text fontWeight="bold" fontSize="xl">$5,750.20</Text>
                                </Flex>
                                <Flex align="center">
                                    <Icon mr={2} as={AiFillCreditCard} />
                                    <Text>Keeper.</Text>
                                </Flex>
                            </Flex>
                            <Text mb={4}>**** **** **** 9281</Text>
                            <Flex align="flex-end" justify="space-between">
                                <Flex>
                                    <Flex flexDir="column" mr={4}>
                                        <Text textTransform="uppercase" fontSize="xs">Valid Thru</Text>
                                        <Text fontSize="lg">12/23</Text>
                                    </Flex>
                                    <Flex flexDir="column">
                                        <Text textTransform="uppercase" fontSize="xs">CVV</Text>
                                        <Text fontSize="lg">***</Text>
                                    </Flex>
                                </Flex>
                                <Icon as={AiFillCreditCard} />
                            </Flex>
                        </Flex>
                    </Box> 
                }
                {/* selected card will be highlighted in selector bar just below card section*/}
                <Flex justifyContent="center" mt={2}>
                    <Button bgColor={card === 1? '#4FD1C5' : 'gray.300' } onClick={()=> selectCard(1)} size="xs" ms={1} />
                    <Button bgColor={card === 2? '#F687B3' : 'gray.300' } onClick={()=> selectCard(2)} size="xs" ms={1}/>
                    <Button bgColor={card === 3? '#F6AD55' : 'gray.300' } onClick={()=> selectCard(3)} size="xs" ms={1}/>
                </Flex>
                
                {/*Overall Cards Meta Info Section- Accumalated Card balance, spent amount on cards, refilled amount in cards*/}
                <Flex flexDir="column" my={4}>
                    <Flex justify="space-between" mb={2}>
                        <Text>Credited</Text>
                        <Text fontWeight="bold">$135.45</Text>
                    </Flex>
                    <Flex justify="space-between" mb={2}>
                        <Text>Debited</Text>
                        <Text fontWeight="bold">$35.00</Text>
                    </Flex>
                    <Flex justify="space-between" mb={2}>
                        <Text>Balance</Text>
                        <Text fontWeight="bold">$100.45</Text>
                    </Flex>
                </Flex>

                {/*Send Money Section with Avatar grouping users*/}
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden:{
                        scale: .8,
                        opacity: 0
                    },
                    visible:{
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: 1.8
                        }
                    },
                }}>
                    <Heading letterSpacing="tighter" fontWeight="bold" display="inline-flex" fontSize="xl" my={4}>Send money to</Heading>
                </motion.div>
                <Flex>
                <AvatarGroup size="md" max={3}>
                    {/*loop over all the images of curent user contacts avatars */}
                    { contactsFreshList.data ? 
                        
                        contactsFreshList?.data?.data?.contact_list.map((cont: any)=>{
                            
                            return (<Avatar key={cont?.image} src={cont?.image?.length !== 0 ? cont.image : "avatar-2.jpg"}/>)    
                        })
                        
                        :
                        
                        <>
                            <Avatar src="avatar-2.jpg"/>
                            <Avatar src="avatar-2.jpg"/>
                            <Avatar src="avatar-2.jpg"/>
                            <Avatar src="avatar-2.jpg"/>
                            <Avatar src="avatar-2.jpg"/>
                            <Avatar src="avatar-2.jpg"/>
                        </>
                    }
                </AvatarGroup>    
                </Flex>
                <Text color="gray" mt={10} mb={2}>Card Number</Text>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none" 
                    >
                        <AiFillCreditCard color="gray.700" />
                    </InputLeftElement>
                    <Input type="number" placeholder="xxxx xxxx xxxx xxxx" />
                </InputGroup>
                <Text color="gray" mt={10} mb={2}>Amount</Text>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none" 
                    >
                        <FiDollarSign color="gray.700" />
                    </InputLeftElement>
                    <Input type="number" placeholder="1.00" />
                </InputGroup>
                <Button mt={4} _hover={{bg:"teal"}} bgColor="blackAlpha.900" color="white" p={7} borderRadius={15}>Send Money</Button>
            </Flex>
        </>
    )
}


export default SearchNotificationSection;