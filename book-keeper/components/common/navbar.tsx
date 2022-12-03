import React,{ useEffect, useState } from 'react';
import { 
    Flex,
    Heading,
    Avatar,
    Text,
    Icon,
    Link,
    IconButton,
    Button,
} from "@chakra-ui/react";
import {
    AiFillSetting,
    AiFillContacts,
    AiFillSignal,
    AiFillFileText,
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
import { BsFillSignpostFill } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react';


const Navbar = () => {
    const router = useRouter();
    const {push} = useRouter();
    const [currentUser, setCurrentUser] = useState(Object);
    const { data: session, status } = useSession();

    const handleOAuthSignOut = async () =>{
        const redirection: any = await signOut({redirect: false, callbackUrl:'/user/login'});
        push(redirection.url); 
    }

    useEffect(()=>{
        if(session){
            setCurrentUser(session.user);
        }
    },[currentUser]);

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
                                            <Icon display={["flex","flex","flex","flex","flex"]} as={AiFillSignal} fontSize="xl" className={router.pathname === "/user/dashboard"?"active-icon":"" }/>
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
                                            <Text className={router.pathname === "/user/dashboard"?"active":""}>Dashboard</Text>
                                        </Link>
                                    </motion.div>
                                    </NextLink>
                                
                            </Flex>

                            <Flex className="sidebar-items">
                                <NextLink href="/user/invoices" passHref>
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
                                        <Icon display={["flex","flex","flex","flex","flex"]} as={AiFillFileText} fontSize="xl"  className={router.pathname === "/user/invoices"?"active-icon":"" } />
                                    </Link>
                                </motion.div>
                                </NextLink>
                                <NextLink href="/user/invoices" passHref>
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
                                        <Text className={router.pathname === "/user/invoices"?"active":""}>Tax Invoices </Text>
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
                            {/** Oauth Sign Out */}
                            <Flex className="sidebar-items">
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
                                        <IconButton _hover={{bgColor:"purple.900"}} size= "xs" bgColor="purple.900" onClick={() => handleOAuthSignOut()} display={["flex", "flex", "flex", "flex", "flex"]} as={BsFillSignpostFill} fontSize="xl" className={router.pathname === "/user/login" ? "active-icon" : ""} aria-label={''} />
                                    </Link>
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
                                                delay: .9
                                            }
                                        },
                                    }}>
                                    <Link _hover={{textDecor: 'none'}} display={["none","none","none","flex","flex"]}>
                                        <Button mt={-2}  bgColor="purple.900" _hover={{bg:"purple.900", color:"goldenrod"}} onClick={()=>handleOAuthSignOut()}>Sign Out</Button>
                                    </Link>
                                </motion.div>    
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
                        {/*make the userName/Email dynamic so if src is not found then initials are displayed*/}
                        <Avatar bg="goldenrod" my={2} name={currentUser.email ? currentUser.email : 'Unknown' } src={currentUser.email ? currentUser.image : ''} textColor="black" />
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
                        <Text textAlign="center" fontSize={"xs"} letterSpacing="tighter" display={["flex","flex","none","flex","flex"]} >{currentUser.email ? currentUser.email : 'Unknown'}</Text>
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
                    <Text textAlign="center" fontSize="xs" fontWeight="hairline" letterSpacing="tighter" display={"flex"}><Icon as={FcApproval}></Icon>{currentUser.email ? 'Premium' : 'Unknown'}</Text>
                    </motion.div>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar;