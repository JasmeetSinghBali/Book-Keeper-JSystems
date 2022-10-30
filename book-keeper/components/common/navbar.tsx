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
    AiFillContacts,
} from 'react-icons/ai';
import {
    FcApproval 
} from 'react-icons/fc';
import {
    RiBookMarkFill
} from 'react-icons/ri';
import { useRouter } from 'next/router';
import NextLink  from 'next/link';
import {motion} from  'framer-motion';

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
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: .4
                                }
                            },
                        }}>
                            <Heading
                                mt={50}
                                mb={[25,50,100]}
                                fontSize={["4xl","4xl","2xl","3xl","4xl"]}
                                alignSelf="center"
                                letterSpacing="tighter" 
                            >
                                <Icon display={["inline","inline","none","inline","inline"]} as={RiBookMarkFill} fontSize="xl" color="goldenrod"></Icon>Keeper.   
                            </Heading>
                        </motion.div>
                        
                        {/*navbar icons container section*/}
                        <Flex
                            flexDir={["row","row","column","column","column"]}
                            align={["center","center","center","flex-start","flex-start"]}
                            justifyContent={["space-between","space-between","center","center","center"]}
                        >   
                            {/*Flex for each individual navbar icons*/}
                            <Flex className="sidebar-items">
                                    
                                    <NextLink href="/user/dashboard" passHref>
                                    <motion.div initial="hidden" animate="visible" variants={{
                                            hidden:{
                                                scale: .8,
                                                opacity: 0
                                            },
                                            visible:{
                                                scale: 1,
                                                opacity: 1,
                                                transition: {
                                                    delay: .6
                                                }
                                            },
                                        }}>
                                        <Link display={["center","center","center","flex-start","flex-start"]}>
                                            <Icon display={["flex","flex","flex","flex","flex"]} as={AiFillHome} fontSize="xl" className={router.pathname === "/user/dashboard"?"active-icon":"" }/>
                                        </Link>
                                    </motion.div>
                                    </NextLink>
                                    <NextLink href="/user/dashboard" passHref>
                                    <motion.div initial="hidden" animate="visible" variants={{
                                            hidden:{
                                                scale: .8,
                                                opacity: 0
                                            },
                                            visible:{
                                                scale: 1,
                                                opacity: 1,
                                                transition: {
                                                    delay: .6
                                                }
                                            },
                                        }}>
                                        <Link _hover={{textDecor: 'none'}} display={["none","none","none","flex","flex"]}>
                                            <Text className={router.pathname === "/user/dashboard"?"active":""}>Home</Text>
                                        </Link>
                                    </motion.div>
                                    </NextLink>
                                
                            </Flex>

                            <Flex className="sidebar-items">
                                <NextLink href="/user/transactions" passHref>
                                <motion.div initial="hidden" animate="visible" variants={{
                                        hidden:{
                                            scale: .8,
                                            opacity: 0
                                        },
                                        visible:{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: .7
                                            }
                                        },
                                    }}>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["flex","flex","flex","flex","flex"]} as={AiFillDollarCircle} fontSize="xl"  className={router.pathname === "/user/transactions"?"active-icon":"" } />
                                    </Link>
                                </motion.div>
                                </NextLink>
                                <NextLink href="/user/transactions" passHref>
                                <motion.div initial="hidden" animate="visible" variants={{
                                        hidden:{
                                            scale: .8,
                                            opacity: 0
                                        },
                                        visible:{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: .7
                                            }
                                        },
                                    }}>
                                    <Link _hover={{textDecor: 'none'}} display={["none","none","none","flex","flex"]}>
                                        <Text className={router.pathname === "/user/transactions"?"active":""}>My Txns </Text>
                                    </Link>
                                </motion.div>
                                </NextLink>
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/user/contacts" passHref>
                                <motion.div initial="hidden" animate="visible" variants={{
                                        hidden:{
                                            scale: .8,
                                            opacity: 0
                                        },
                                        visible:{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: .8
                                            }
                                        },
                                    }}>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["flex","flex","flex","flex","flex"]} as={AiFillContacts} fontSize="xl" className={router.pathname === "/user/contacts"?"active-icon":"" } />
                                    </Link>
                                </motion.div>
                                </NextLink>
                                
                                <NextLink href="/user/contacts" passHref>
                                <motion.div initial="hidden" animate="visible" variants={{
                                        hidden:{
                                            scale: .8,
                                            opacity: 0
                                        },
                                        visible:{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: .8
                                            }
                                        },
                                    }}>
                                    <Link _hover={{textDecor: 'none'}} display={["none","none","none","flex","flex"]}>
                                        <Text className={router.pathname === "/user/contacts"?"active":""}>My Contacts</Text>
                                    </Link>
                                </motion.div>
                                </NextLink>
                                
                            </Flex>
                            <Flex className="sidebar-items">
                                <NextLink href="/user/settings" passHref>
                                <motion.div initial="hidden" animate="visible" variants={{
                                        hidden:{
                                            scale: .8,
                                            opacity: 0
                                        },
                                        visible:{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: .9
                                            }
                                        },
                                    }}>
                                    <Link display={["center","center","center","flex-start","flex-start"]}>
                                        <Icon display={["flex","flex","flex","flex","flex"]} as={AiFillSetting} fontSize="xl" className={router.pathname === "/user/settings"?"active-icon":"" } />
                                    </Link>
                                </motion.div>
                                </NextLink>
                                
                                <NextLink href="/user/settings" passHref>
                                <motion.div initial="hidden" animate="visible" variants={{
                                        hidden:{
                                            scale: .8,
                                            opacity: 0
                                        },
                                        visible:{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: .9
                                            }
                                        },
                                    }}>
                                    <Link _hover={{textDecor: 'none'}} display={["none","none","none","flex","flex"]}>
                                        <Text className={router.pathname === "/user/settings"?"active":""}>Settings</Text>
                                    </Link>
                                </motion.div>    
                                </NextLink>
                                
                            </Flex>
                        </Flex>
                    </Flex>

                    {/*Users Avatar Section Bottom*/}
                    <Flex flexDir="column"alignItems="center" mb={10} mt={5}>
                    <motion.div initial="hidden" animate="visible" variants={{
                        hidden:{
                            scale: .8,
                            opacity: 0
                        },
                        visible:{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: 1.1
                            }
                        },
                    }}>
                        {/*🎈 make the user name dynamic so if src is not found then initials are displayed*/}
                        <Avatar bg="goldenrod" my={2} name="Jasmeet Bali" src="avatar-1.jpg" textColor="black" />
                    </motion.div>
                    
                    <motion.div initial="hidden" animate="visible" variants={{
                        hidden:{
                            scale: .8,
                            opacity: 0
                        },
                        visible:{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: 1.1
                            }
                        },
                    }}>
                        <Heading textAlign="center" fontSize={["xl","lg","xs","md","md"]} letterSpacing="tighter" >Jasmeet Bali</Heading>
                    </motion.div>
                    <motion.div initial="hidden" animate="visible" variants={{
                        hidden:{
                            scale: .8,
                            opacity: 0
                        },
                        visible:{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: 1.3
                            }
                        },
                    }}>
                    {/*🎈 make this dynamic if premium then only add Icon FcApproval else not */}
                    <Text textAlign="center" fontSize="xs" fontWeight="hairline" letterSpacing="tight"><Icon as={FcApproval}></Icon>Premium</Text>
                    </motion.div>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar;