import React,{ useState } from 'react';
import { 
    Flex,
    Heading,
    Avatar,
    Text,
    Icon,
    Link,
} from "@chakra-ui/react";
import {
    AiFillHome,
    AiFillSetting,
    AiFillDollarCircle,
} from 'react-icons/ai';
import {
    SiEthereum
} from 'react-icons/si';
import { useRouter } from 'next/router';
import NextLink  from 'next/link';
 

const Navbar = () => {
    const router = useRouter();
    return (
        <>
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
                                <NextLink href="/dashboard" passHref>
                                    <Link>
                                        <Icon as={AiFillHome} fontSize="xl" className={router.pathname == "/dashboard"?"active-icon":"" }/>
                                    </Link>
                                </NextLink>
                                <NextLink href="/dashboard" passHref>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text className={router.pathname == "/dashboard"?"active":""}>Home</Text>
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/fiatxn" passHref>
                                    <Link>
                                        <Icon as={AiFillDollarCircle} fontSize="xl"  className={router.pathname == "/fiatxn"?"active-icon":"" } />
                                    </Link>
                                </NextLink>
                                <NextLink href="/fiatxn" passHref>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text className={router.pathname == "/fiatxn"?"active":""}>Fiat Txn </Text>
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/cryptotxn" passHref>
                                    <Link>
                                        <Icon as={SiEthereum} fontSize="xl" className={router.pathname == "/cryptotxn"?"active-icon":"" } />
                                    </Link>
                                </NextLink>
                                
                                <NextLink href="/cryptotxn" passHref>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text className={router.pathname == "/cryptotxn"?"active":""}>Crypto Txn </Text>
                                    </Link>
                                </NextLink>
                                
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/settings" passHref>
                                    <Link>
                                        <Icon as={AiFillSetting} fontSize="xl" className={router.pathname == "/settings"?"active-icon":"" } />
                                    </Link>
                                </NextLink>
                                
                                <NextLink href="/settings" passHref>
                                    <Link _hover={{textDecor: 'none'}}>
                                        <Text className={router.pathname == "/settings"?"active":""}>Settings</Text>
                                    </Link>    
                                </NextLink>
                                
                            </Flex>
                        </Flex>
                    </Flex>

                    {/*Users Avatar Section Bottom*/}
                    <Flex flexDir="column"alignItems="center" mb={15} mt={5}>
                        <Avatar my={3} src="avatar-1.jpg" />
                        <Text textAlign="center">Jasmeet Bali</Text>
                        <Text textAlign="center">Version: Premium</Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar;