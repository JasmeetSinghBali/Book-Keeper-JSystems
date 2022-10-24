import React,{ useState } from 'react';
import { 
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import {
    AiFillHome,
    AiFillSetting,
    AiFillDollarCircle,
    AiFillCalendar,
    AiFillCaretDown,
    AiFillCaretUp,
    AiFillPlusCircle,
    AiFillCreditCard,
    AiOutlineFileSearch,
    AiOutlineBell,
} from 'react-icons/ai';
import {
    SiEthereum
} from 'react-icons/si';
import BKChart from '../components/bkchart'

export default function dashboard(){
    return(
        <Flex
            h="100vh"
            flexDir="row"
            overflow="hidden"
            maxW="2000px"
        >   
            {/*Navigation Section*/}
            <Flex
                w="14%"
                flexDir="column"
                alignItems="center"
                backgroundColor="#322659"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    justifyContent="space-between"
                    h="90vh"
                >
                    {/*Ledger heading section setting up Flex as semantic nav tag for browser & crawlers sanity*/}
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={100}
                            fontSize="3xl"
                            alignSelf="center"
                            letterSpacing="widest" 
                        >
                            Ledger.   
                        </Heading>
                        
                        {/*navbar icons container section*/}
                        <Flex
                            flexDir="column"
                            align="flex-start"
                            justifyContent="center"
                        >   
                            {/*Flex for each individual navbar icons*/}

                            <Flex className="sidebar-items">
                                <Link>
                                    <Icon as={AiFillHome} fontSize="xl"className="active-icon" />
                                </Link>
                                <Link _hover={{textDecor: 'none'}}>
                                    <Text className="active">Home</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items">
                                <Link>
                                    <Icon as={AiFillDollarCircle} fontSize="xl" />
                                </Link>
                                <Link _hover={{textDecor: 'none'}}>
                                    <Text>Fiat Txn </Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items">
                                <Link>
                                    <Icon as={SiEthereum} fontSize="xl" />
                                </Link>
                                <Link _hover={{textDecor: 'none'}}>
                                    <Text>Crypto Txn </Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items">
                                <Link>
                                    <Icon as={AiFillSetting} fontSize="xl" />
                                </Link>
                                <Link _hover={{textDecor: 'none'}}>
                                    <Text>Settings</Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>

                    {/*Users Avatar Section Bottom*/}
                    <Flex flexDir="column"alignItems="center" mb={7.5} mt={3.5}>
                        <Avatar my={1.5} src="avatar-1.jpg" />
                        <Text textAlign="center">Jasmeet Bali</Text>
                    </Flex>

                </Flex>

            </Flex>

            {/*Chart + Latest Transaction List Section*/}
            <Flex>

            </Flex>

            {/*Search + Incoming/Outgoing Total Funds Amount + [For Future Versions] Dispatch/Send Fiat Section */}
            <Flex>

            </Flex>
            
        </Flex>
    )
}