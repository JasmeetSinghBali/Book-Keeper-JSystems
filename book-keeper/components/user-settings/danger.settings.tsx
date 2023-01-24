import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Box, Button, Divider, Flex, Grid, GridItem, Heading, Icon, Link, PinInput, PinInputField, Tag, TagLabel, TagLeftIcon, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillBug, AiFillInfoCircle, AiOutlineIdcard, AiOutlineUpCircle, AiOutlineWarning, AiTwotoneThunderbolt } from 'react-icons/ai';
import { motion } from 'framer-motion'
import AnimatedCharacter from '../common/animations/animate.character';
import { useCurrentRpcToken } from '../../store/rpc-token-store';
import { trpcClient } from '../../utils/Clientrpc';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useCurrentUserInfo } from '../../store/current-user-info.store';
import ReportBugSettings from './reportBug.settings';

const DangerSettings = ({userStoreData}: any) => {
    
    const { push } = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const [ mutationFailed, SetMutationFailed ] = useState(false);
    const [ deletionAccountSuccess, SetDeletionAccountSuccess ] = useState(false);
    const [ mfaCode , SetMfaCode] = useState('null');
    const rpcTokenInZustand = useCurrentRpcToken.getState();

    const currentUserDataZustand: any = useCurrentUserInfo.getState();

    const deleteUserMutation: any = trpcClient.user.deleteUserAccount.useMutation();

    /*
    @desc responsible for deleting user account, calls mutation on trpc server*/
    const handleAccountDeletion = async()=>{
        try{
            let mutPD: any;
            
            if(currentUserDataZustand?.user?.mfa_isEnabled){
                mutPD = {
                    access_token: rpcTokenInZustand.token,
                    mfa_code: mfaCode
                }
            }
            if(!currentUserDataZustand?.user?.mfa_isEnabled){
                mutPD = {
                    access_token: rpcTokenInZustand.token
                }
            }

            await deleteUserMutation.mutate(Object.freeze(mutPD));
            
            SetMutationFailed(false);
            SetDeletionAccountSuccess(true);
            onClose();
            // logout user current session & redirect user to login page
            const redirection: any = await signOut({redirect: false, callbackUrl:'/user/login'});
            push(redirection.url);
        }catch(err: any){
            SetMutationFailed(true);
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
                marginLeft={[3,2,17,20,20]}
            >
                <Flex
                    w="100%"
                    h="100%"
                    display="flex"
                    flexDir="column"
                    
                >
                    <Flex
                        mt={5}
                        mb={5}
                        h={["33%","27%","6%","8%","10%"]}
                        ml={[55,45,10,0,0]}
                        display="flex"
                        flexDir="row"
                    >
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]} />
                        <Icon  display={["none","flex","flex","flex","flex"]} as={AiOutlineIdcard} fontSize={["xs","sm","sm","md","md"]} mt={[1,1,2,-1,1]}></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.3
                                }
                            },
                        }}>
                            <Heading display={["none","flex","flex","flex","flex"]} color="purple.700" mt={[1,1,1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Plan and Access Logs</Heading>
                        </motion.div>
                    </Flex>

                    {/* 🎈 CurrentPlan, IP & Last Accessed date logs Section*/}
                    <Grid
                        h={['300px','300px','1000px','1000px','1000px']}
                        templateRows='repeat(2, 1fr)'
                        templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']}
                        gap={5}
                        display={["none","flex","flex","flex","flex"]}
                        ml={[55,45,10,0,0]}
                        >
                        <GridItem boxShadow="xl" borderWidth="thin" rowSpan={2} colSpan={1} bg='gray.200'>
                            <Badge variant="solid" colorScheme="purple">Active Plan</Badge>
                            <Flex
                                display="flex"
                                flexDir="column"
                                mt={4}
                            >
                                {/* 🎈 To be tested at prod/mvp/live & future make updates for plan activation date and validUntil */}
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Plan:     {currentUserDataZustand ? currentUserDataZustand?.user?.plan : 'Unknown'}</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Services:     All</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Activated-On:     Jan 01 `2023</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Valid-Until:      Jan 01 `2024</TagLabel>
                                </Tag>
                                
                            </Flex>
                        </GridItem>
                        <GridItem boxShadow="xl" borderWidth="thin" rowSpan={2} colSpan={1} bg='gray.200' >
                            <Badge variant="solid" colorScheme="purple">Access Logs</Badge>
                            <Flex
                                display="flex"
                                flexDir="column"
                                mt={4}
                            >
                                {/* 🎈 To be tested at prod/mvp/live */}
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>IP Address:     { currentUserDataZustand?.user?.fingerprint?.fptPD ? currentUserDataZustand?.user?.fingerprint?.fptPD.ip : 'Unknown'}</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Country:     {currentUserDataZustand?.user?.fingerprint?.fptPD ? currentUserDataZustand?.user?.fingerprint?.fptPD?.country :'Unknown'}</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Location:     {currentUserDataZustand?.user?.fingerprint?.fptPD ? currentUserDataZustand?.user?.fingerprint?.fptPD?.location : 'unknown'}</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Login-time:      {currentUserDataZustand?.user?.fingerprint?.fptPD ? currentUserDataZustand?.user?.fingerprint?.fptPD?.lastUpdated: 'unknown' }</TagLabel>
                                </Tag>   
                            </Flex>
                        </GridItem>
                    </Grid>

                    {/* Update Plan Section*/}
                    <Flex
                        mt={[-5,5,5,5,5]}
                        mb={5}
                        h={["33%","27%","6%","8%","10%"]}
                        display="flex"
                        flexDir="row"
                        ml={[55,45,10,0,0]}
                    >
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]} />
                        <Icon as={AiOutlineUpCircle} fontSize={["xs","sm","sm","md","md"]} mt={[1,1,2,-1,1]}></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.3
                                }
                            },
                        }}>
                            <Heading color="purple.700" mt={[1,1,1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Update Plan</Heading>
                        </motion.div>
                        <Link href="http://keeper.updatePlan/paymentGateway" _hover={{textDecor: 'none', color: "pink.500"}} display="flex">
                            <Tooltip hasArrow label="update plan" bg="gray.300" color="black">
                                <Icon fontSize={["3xl","5xl","4xl","5xl","6xl"]} as={AiTwotoneThunderbolt}></Icon>
                            </Tooltip>
                        </Link>
                    </Flex>
                    <Flex
                        display="flex"
                        mt={3}
                        ml={[55,45,5,0,0]}
                    >
                        {/* 🎈 Report bugs section*/}
                        <motion.button key="reportappbug" className="card" whileHover={{
                            position: 'relative',
                            zIndex: 1,
                            background: 'white',
                            scale: [1,1.4,1.2],
                            rotate: [0,10,-10,0],
                            transition: {
                                duration: .2,
                            },
                        }}>
                            <ReportBugSettings />
                        </motion.button>
                    </Flex>
                    {/* Delete Account Section*/}
                    <Flex
                        mt={30}
                        mb={10}
                        ml={[55,45,5,0,0]}
                        h={["33%","27%","6%","8%","10%"]}
                        display="flex-start"
                        flexDir="column"
                    >
                        <motion.button key="deletemyaccount" className="card" whileHover={{
                            position: 'relative',
                            zIndex: 1,
                            background: 'red',
                            scale: [1,1.4,1.2],
                            filter: [
                                'hue-rotate(0) contrast(100%)'  ,
                                'hue-rotate(360deg) contrast(200%)',
                                'hue-rotate(90deg)contrast(300%)',
                                'hue-rotate(0) contrast(100%)'
                            ],
                            rotate: [0,20,-30,0],
                            transition: {
                                duration: .2,
                            },
                        }}>
                            <Button
                            onClick={onOpen}
                            _hover={{bg: "red"}}
                            >
                                <Icon as={AiOutlineWarning} fontSize={["xs","sm","sm","md","md"]} mt={0} mr={2}></Icon>
                                Delete My Account
                            </Button>
                        </motion.button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef as any}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Remove My Account
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                {
                                    currentUserDataZustand?.user?.mfa_isEnabled && 
                                <Box>
                                    <PinInput mask onComplete={(value: any) => SetMfaCode(value)} >
                                        <PinInputField onClick={(_e: any) => { SetMfaCode('null') }} />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </Box>
                                }
                                Are you sure? You can&apos;t undo this action afterwards.
                                {currentUserDataZustand?.user?.mfa_isEnabled && 'Please provide authenticator code to successfully complete this action'}
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                <Button ref={cancelRef as any} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button disabled={deleteUserMutation.isLoading ? true : false} colorScheme='red' onClick={handleAccountDeletion} ml={3}>
                                    Delete
                                </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default DangerSettings;