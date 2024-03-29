import { Avatar, Flex, Icon, IconButton, Text, Divider, Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Switch, Tooltip  } from '@chakra-ui/react';
import React from 'react';
import { AiFillCamera, AiFillEdit, AiOutlineAlert, AiOutlineUser } from 'react-icons/ai';
import {motion} from 'framer-motion';
import EditPhoneEmailModal from './edit.phone-email.settings';
import EnableAccountMfaModal from './enablemfa.settings';
import EditDisplayPictureModal from './edit.dp.settings';
import { useCurrentRpcToken } from '../../store/rpc-token-store';
import { trpcClient } from '../../utils/Clientrpc';
import { useCurrentUserInfo } from '../../store/current-user-info.store';

const GeneralSettings = ({userStoreData}: any) => {

    console.log("Inside general settings section");
    console.log(userStoreData);

    const currentUserDataZustand: any = useCurrentUserInfo.getState();
    const rpcTokenInZustand =  useCurrentRpcToken.getState();
    const activateEmailSubs: any = trpcClient.user.switchEmailSubs.useMutation();

    /** 
     * @desc activates email subs handle SWITCH for user- account deletion, package update, new package available
     * */
    const handleActivateEmailSubs = async()=>{
        try{
            await activateEmailSubs.mutate(
                {
                    access_token: rpcTokenInZustand.token,
                }
            );
            return;
        }catch(err: any){
            console.log(err);
            return;
        }
    }

    return (
        <>
            <Flex
                w="100%"
                h="80%"
                p={3}
                mt={[-10,-10,5,5,5]}
                mb={1}
                display="flex"
                flexDir="column"
                marginLeft={[10,35,65,10,10]}
            >

                <Flex
                    w="100%"
                    h="100%"
                    display="flex"
                    flexDir="column"
                    
                >
                    <Flex
                        mt={[13,11,9,7,5]}
                        h={["33%","27%","6%","8%","10%"]}
                        
                        
                    >
                        <Divider orientation="vertical" borderColor="#D53F8C" />
                        <Divider orientation="vertical" borderColor="#D53F8C"/>
                        <Divider orientation="vertical" borderColor="#D53F8C" />
                        <Icon as={AiOutlineUser} fontSize="sm"></Icon>
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
                            <Heading color="purple.700" mt={[1,1,-1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Basic</Heading>
                        </motion.div>
                    </Flex>
                    <Flex
                        flexDir="row"
                        h={["33%","27%","23%","20%","16%"]}
                        
                    >
                        <EditDisplayPictureModal />
                        <Flex
                            flexDir="column"
                        >
                            <Avatar size={["md","md","md","xl","xl"]} my={2} src={userStoreData?.image ? userStoreData?.image : '' } />
                        </Flex>
                        <Flex
                         flexDir="column"
                         ml={1}
                         mt={5}
                        >
                            {/*Make This Dynamic User Data make sure to show the username & Email in upper case*/}
                            <Text fontSize={["sm","sm","md","md","md"]} color={!userStoreData?.email ? 'gray.400' : 'black'} fontWeight="semibold" letterSpacing="tight" >Email: {userStoreData?.email ? userStoreData?.email : `🚫` }</Text>
                            <Text fontSize={["sm","sm","md","md","md"]} color={!userStoreData?.phone ? 'gray.400' : 'black'} fontWeight="semibold" letterSpacing="tight" >Phone: {userStoreData?.phone === null || !userStoreData?.phone ? `🚫` : userStoreData?.phone }</Text>
                        </Flex>
                    </Flex>
                    <Flex
                        mt={5}
                        h={["33%","27%","6%","8%","10%"]}
                        
                    >

                        <Divider orientation="vertical" borderColor="#D53F8C" />
                        <Divider orientation="vertical" borderColor="#D53F8C"/>
                        <Divider orientation="vertical" borderColor="#D53F8C" />
                        <Icon as={AiOutlineAlert} fontSize="sm"></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                                hidden:{
                                    scale: .8,
                                    opacity: 0
                                },
                                visible:{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        delay: 0.8
                                    }
                                },
                        }}>
                            <Heading color="purple.700" mt={[1,1,1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Privacy & Security</Heading>
                        </motion.div>
                    </Flex>
                    <Flex
                        flexDir="row"
                        mt={1}
                        h="100%"
                        w="100%"
                        
                    >
                        <TableContainer>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                    <Th>Update</Th>
                                    <Th>Type</Th>
                                    <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider" >Email & Phone</Td>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Security</Td>
                                    <Td>
                                        <EditPhoneEmailModal />
                                    </Td>
                                    </Tr>
                                    <Tr>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">MFA</Td>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Security</Td>
                                    <Td>
                                        <EnableAccountMfaModal />
                                    </Td>
                                    </Tr>
                                    <Tr>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Email-Notifications</Td>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Notifications</Td>
                                    <Td>
                                        <Switch 
                                        //onClick={} 
                                        colorScheme="pink"
                                        borderColor="gray.200">
                                        </Switch>
                                    </Td>
                                    </Tr>
                                    <Tr>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Phone-Notifications</Td>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Notifications</Td>
                                    <Td>
                                        <Switch 
                                        //onClick={} 
                                        colorScheme="pink"
                                        borderColor="gray.200">
                                        </Switch>
                                    </Td>
                                    </Tr>
                                    <Tr>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Email-Subscription</Td>
                                    <Td  fontWeight="semibold" fontSize="sm" letterSpacing="wider">Subscriptions</Td>
                                    <Td>
                                        <Switch
                                        onChange={handleActivateEmailSubs}
                                        defaultChecked={currentUserDataZustand.user.emailSubActive ? true : false}  
                                        colorScheme="pink"
                                        borderColor="gray.200">
                                        </Switch>
                                    </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default GeneralSettings;