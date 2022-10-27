import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import  NextLink  from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";

const SettingsNavbar = () => {
    const router = useRouter();
    return(
        <>    
            {/*Settings navbar*/}
            <Flex
                w={["100%", "100%", "90%", "90%", "85%"]}
                maxH="30vh"
            >
                <Flex
                        w="100%"
                        h="20%"
                        p="3%"
                        flexDir="row"
                        as="nav"
                    >
                        
                            <Heading 
                                display={["inline-flex","inline-flex","inline-flex","inline-flex","block"]}
                                fontWeight="bold"
                                mt={[15,2,7,4,-1]}
                                fontSize={["xl","3xl","xl","2xl","3xl"]}
                                letterSpacing="tighter"
                                mb={10}
                            >
                                    <Icon 
                                    display={["inline-flex","inline-flex","inline-flex","inline-flex","inline-flex"]}
                                    as={AiFillSetting}
                                    fontSize="xl"
                                    color="gray">
                                    </Icon>Settings 
                            </Heading>
                        
                        <Flex
                            mt={[50,50,20,20,20]}
                            ms={[-97,-70,-70,-20,-95]}
                        >
                            {/*navbar icons container section*/}
                            <Flex
                                    flexDir={["row","row","row","row","row"]}
                                    align={["stretch","stretch","flex-start","flex-start","flex-start"]}
                                    justifyContent="center"
                                    ms={[-70,-50,-15,-25,-25]}
                                    marginLeft={[15,-12,-5,-3,-7]}
                                >   
                                    {/*Flex for each individual navbar icons*/}
                                    <Flex className="sidebar-items">
                                        <NextLink href="/user/dashboard" passHref>
                                            <Link display={["center","center","center","flex-start","flex-start"]}>
                                                <Icon display={["none","none","flex","flex","flex"]} as={AiFillHome} fontSize="xl" className={router.pathname === "/user/dashboard"?"active-icon":"" }/>
                                            </Link>
                                        </NextLink>
                                        <NextLink href="/user/dashboard" passHref>
                                            <Link _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={router.pathname === "/user/dashboard"?"active":""}>Home</Text>
                                            </Link>
                                        </NextLink>
                                    </Flex>
                                    <Flex className="sidebar-items">
                                        <NextLink href="/user/transactions" passHref>
                                            <Link display={["center","center","center","flex-start","flex-start"]}>
                                                <Icon display={["none","none","flex","flex","flex"]} as={AiFillSetting} fontSize="xl"  className={router.pathname === "/user/transactions"?"active-icon":"" } />
                                            </Link>
                                        </NextLink>
                                        <NextLink href="/user/transactions" passHref>
                                            <Link _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={router.pathname === "/user/transactions"?"active":""}>My Txns </Text>
                                            </Link>
                                        </NextLink>
                                    </Flex>
                                    <Flex className="sidebar-items">
                                        <NextLink href="/user/contacts" passHref>
                                            <Link display={["center","center","center","flex-start","flex-start"]}>
                                                <Icon display={["none","none","flex","flex","flex"]} as={AiFillSetting} fontSize="xl" className={router.pathname === "/user/contacts"?"active-icon":"" } />
                                            </Link>
                                        </NextLink>
                                        
                                        <NextLink href="/user/contacts" passHref>
                                            <Link _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={router.pathname === "/user/contacts"?"active":""}>My Contacts</Text>
                                            </Link>
                                        </NextLink>
                                        
                                    </Flex>
                                    <Flex className="sidebar-items">
                                        <NextLink href="/user/settings" passHref>
                                            <Link display={["center","center","center","flex-start","flex-start"]}>
                                                <Icon display={["none","none","flex","flex","flex"]} as={AiFillSetting} fontSize="xl" className={router.pathname === "/user/settings"?"active-icon":"" } />
                                            </Link>
                                        </NextLink>
                                        
                                        <NextLink href="/user/settings" passHref>
                                            <Link _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={router.pathname === "/user/settings"?"active":""}>Settings</Text>
                                            </Link>    
                                        </NextLink>       
                                    </Flex>
                            </Flex>
                        </Flex>
                            
                </Flex>
            </Flex>
            
            
        </>
    )
}

export default SettingsNavbar;