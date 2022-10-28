import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import  NextLink  from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";

const SettingsNavbar = () => {
    const router = useRouter();
    const [settingsOption,selectSettingsOption] = useState('general')
    return(
        <>    
            {/*Settings navbar*/}
            <Flex
                w={["100%", "100%", "90%", "90%", "85%"]}
                maxH="100vh"
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
                                    fontSize="2xl"
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
                                    <Flex className="sidebar-items-two">
                                            <Link onClick={()=> selectSettingsOption('general')} _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={settingsOption === 'general'?"active-two":""}>General</Text>
                                            </Link>
                                    </Flex>
                                    <Flex className="sidebar-items-two">
                                            <Link onClick={()=> selectSettingsOption('billing')} _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={settingsOption === 'billing'?"active-two":""}>Billing </Text>
                                            </Link>
                                    </Flex>
                                    <Flex className="sidebar-items-two">
                                            <Link onClick={()=> selectSettingsOption('integrations')} _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={settingsOption === 'integrations'?"active-two":""}>Integrations</Text>
                                            </Link>
                                    </Flex>
                                    <Flex className="sidebar-items-two">
                                            <Link onClick={()=> selectSettingsOption('dangerzone')} _hover={{textDecor: 'none'}} display={["flex","flex","flex","flex","flex"]}>
                                                <Text className={settingsOption === 'dangerzone'?"active-two":""}>Close Account</Text>
                                            </Link>           
                                    </Flex>
                            </Flex>
                        </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default SettingsNavbar;