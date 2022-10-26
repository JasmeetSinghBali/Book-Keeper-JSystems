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
    AiOutlineBook,
} from 'react-icons/ai';
import {
    FcApproval 
} from 'react-icons/fc';
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
                w={["100%","100%","10%","15%","15%"]}
                flexDir="column"
                alignItems="center" 
                backgroundColor="#322659"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    justifyContent="space-between"
                    h={[null,null,"100vh"]}
                >
                    {/*Ledger heading section setting up Flex as semantic nav tag for browser & crawlers sanity*/}
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={[25,50,100]}
                            fontSize={["4xl","4xl","2xl","3xl","4xl"]}
                            alignSelf="center"
                            letterSpacing="tighter" 
                        >
                            <Icon display={["inline","inline","none","inline","inline"]} as={AiOutlineBook} fontSize="xl" color="goldenrod"></Icon>Keeper.   
                        </Heading>
                        
                        {/*navbar icons container section*/}
                        <Flex
                            flexDir={["row","row","column","column","column"]}
                            align={["center","center","center","flex-start","flex-start"]}
                            justifyContent="center"
                        >   
                            {/*Flex for each individual navbar icons*/}

                            <Flex className="sidebar-items">
                                <NextLink href="/dashboard" passHref>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["none","none","flex","flex","flex"]} as={AiFillHome} fontSize="xl" className={router.pathname === "/dashboard"?"active-icon":"" }/>
                                    </Link>
                                </NextLink>
                                <NextLink href="/dashboard" passHref>
                                    <Link _hover={{textDecor: 'none'}} display={["flex","flex","none","flex","flex"]}>
                                        <Text className={router.pathname === "/dashboard"?"active":""}>Home</Text>
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/fiatxn" passHref>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["none","none","flex","flex","flex"]} as={AiFillDollarCircle} fontSize="xl"  className={router.pathname === "/fiatxn"?"active-icon":"" } />
                                    </Link>
                                </NextLink>
                                <NextLink href="/fiatxn" passHref>
                                    <Link _hover={{textDecor: 'none'}} display={["flex","flex","none","flex","flex"]}>
                                        <Text className={router.pathname === "/fiatxn"?"active":""}>Fiat Txn </Text>
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/cryptotxn" passHref>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["none","none","flex","flex","flex"]} as={SiEthereum} fontSize="xl" className={router.pathname === "/cryptotxn"?"active-icon":"" } />
                                    </Link>
                                </NextLink>
                                
                                <NextLink href="/cryptotxn" passHref>
                                    <Link _hover={{textDecor: 'none'}} display={["flex","flex","none","flex","flex"]}>
                                        <Text className={router.pathname === "/cryptotxn"?"active":""}>Crypto Txn </Text>
                                    </Link>
                                </NextLink>
                                
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/settings" passHref>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["none","none","flex","flex","flex"]} as={AiFillSetting} fontSize="xl" className={router.pathname === "/settings"?"active-icon":"" } />
                                    </Link>
                                </NextLink>
                                
                                <NextLink href="/settings" passHref>
                                    <Link _hover={{textDecor: 'none'}} display={["flex","flex","none","flex","flex"]}>
                                        <Text className={router.pathname === "/settings"?"active":""}>Settings</Text>
                                    </Link>    
                                </NextLink>
                                
                            </Flex>
                        </Flex>
                    </Flex>

                    {/*Users Avatar Section Bottom*/}
                    <Flex flexDir="column"alignItems="center" mb={10} mt={5}>
                        <Avatar my={2} src="avatar-1.jpg" />
                        <Heading textAlign="center" fontSize={["xl","lg","xs","md","md"]} letterSpacing="tighter" >Jasmeet Bali</Heading>
                        {/*🎈 make this dynamic if premium then only add Icon FcApproval else not */}
                        <Text textAlign="center" fontSize="xs" fontWeight="hairline" letterSpacing="tight"><Icon as={FcApproval}></Icon>Premium</Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar;