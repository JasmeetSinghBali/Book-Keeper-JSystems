import { Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import BillingSettings from "./billing.settings";
import DangerSettings from "./danger.settings";
import GeneralSettings from "./general.settings";
import IntegrationSettings from "./integrations.settings";
import {motion} from 'framer-motion';
import { useSession } from "next-auth/react";
import { trpcClient } from "../../utils/Clientrpc";
import { useCurrentUserInfo } from "../../store/current-user-info.store";



const SettingsNavbar = () => {
    const [settingsOption,selectSettingsOption] = useState('general');
    const { data: session } = useSession();    

    const currentUserDataZustand: any = useCurrentUserInfo.getState();
    console.log("Zustand store========user data==== inside navbar settings");
    console.log(currentUserDataZustand);

    function showSection(){
        const currentSelection = settingsOption;
        switch (currentSelection) {
            case 'general':
                return <GeneralSettings userStoreData={currentUserDataZustand.user}  />
            case 'billing':
                return <BillingSettings userStoreData={currentUserDataZustand.user}/>
            case 'integrations':
                return <IntegrationSettings userStoreData={currentUserDataZustand.user}/>
            case 'dangerzone':
                return <DangerSettings userStoreData={currentUserDataZustand.user}/>
            default:
                return <GeneralSettings userStoreData={currentUserDataZustand.user}/>
        }
    }

    return(
        <>    
            {/*Settings navbar*/}
            <Flex
                w="90%"
                h="100%"
                flexDir="column"
                overflow="auto"
                p={5}
                display="flex-start"
            >
                <Flex
                    flexDir="row"
                    justifyContent="center"
                    h="20%"
                    w="100%"
                    p={2}
                    mb={1}
                >
                    <Flex
                        w="100%"
                        h="100%"
                        p={[-4,-2,1,5,10]}
                        flexDir="row"
                        as="nav"
                        justifyContent="flex-start"
                        mb={10}
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
                                        delay: 0.5
                                    }
                                },
                            }}>
                                <Heading 
                                display={["inline-flex","inline-flex","inline-flex","inline-flex","block"]}
                                fontWeight="bold"
                                mt={[15,2,7,4,-1]}
                                fontSize={["xl","2xl","xl","2xl","3xl"]}
                                letterSpacing="tighter"
                                
                            >
                                    <Icon 
                                    display={["inline-flex","inline-flex","inline-flex","inline-flex","inline-flex"]}
                                    as={AiFillSetting}
                                    fontSize="xl"
                                    >
                                    </Icon>Settings 
                                </Heading>
                            </motion.div>
                        
                        <Flex
                            mt={[20,20,20,20,20]}
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
                                                <Text className={settingsOption === 'dangerzone'?"active-two":""}>Account</Text>
                                            </Link>           
                                    </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                {/**Different Settings Section dynamically */}
                {showSection()}
            </Flex>
        </>
    )
}

export default SettingsNavbar;