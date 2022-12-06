import { Button, Divider, Flex, Heading, Icon, Input, InputGroup, InputLeftAddon, Stack, Text, chakra, HStack, PinInput, PinInputField, AlertIcon, Alert, AlertTitle, AlertDescription, Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineExclamationCircle } from "react-icons/ai";
import { RiBookMarkFill } from "react-icons/ri";
import { trpcClient } from "../../utils/Clientrpc";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";

/**
 * @desc asks user for email OTP to finally update rpc server token in zustand store & redirect user to dashboard page  
 * */
export default function verify(){
    
    const { push, pathname } = useRouter();
    const {data: session, status} = useSession();
    const [ emailCode, SetEmailCode ] = useState('');
    const [ removeError, SetRemoveError] = useState(false);
    const userEmail: any = session?.user?.email;
    const rpcDispatchedEmail: any = trpcClient.rpcAccess.dispatchEmailCode.useQuery({ email: userEmail });
    const mutation: any = trpcClient.rpcAccess.verifyEmailCode.useMutation();

    /** 
     * 🎈
     * @desc make call to trpc/server to  verify email otp entered by user 
     * */
    const handleEmailCodeVerification = async (e: any): Promise<any> => {
        e.preventDefault();
        if(!emailCode || emailCode.length !== 6){
            SetRemoveError(false);
        }
        await mutation.mutate({email_code: emailCode});
        
        SetEmailCode('');
        
        if(!mutation.isSuccess && !mutation.isLoading && !mutation.data){
            if(mutation.error !== null){
                console.log(mutation.error.data);
            }
            SetRemoveError(false);
            return;
        }
        
        return;
    }

    // useEffect(()=>{
    //     console.log(result);
    //     // 🎈 if no result push to-> please contact support page
    // },[]);

    console.log(rpcDispatchedEmail);

    return (
        <>
            <Flex
                h={["200vh","150vh","120vh","100vh","100vh"]}
                w={["200%","150%","120%","100%","100%"]}
                flexDir={["column","column","row"]}
                overflow="hidden"
                maxW="2000px"
            >
                <Flex
                    w={"100%"}
                    h={"100%"}
                    flexDir="column"
                    alignItems="center"
                    bgGradient='linear(to-r, red.50, blue.50, green.50,yellow.50)'
                >
                <Flex
                    flexDir="column"
                    justifyContent="space-between"
                    h={"100%"}
                    w={"100%"}
                    backgroundColor="gray.50"
                    marginTop={20}
                    marginBottom={20}
                    boxShadow="dark-lg"
                    boxSize={"lg"}
                >
                    {/*Sign In heading section */}
                    <Flex
                        padding={5}
                        w={"100%"}
                        h={"100%"}
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
                            mt={8}
                            ml={5}
                            fontSize={["4xl","4xl","2xl","3xl","4xl"]}
                            alignSelf="center"
                            letterSpacing="tighter"
                            fontWeight="semibold" 
                            color="gray.600"
                        >
                            <Icon display={"inline"} as={RiBookMarkFill} fontSize="lg" color="#805AD5"></Icon>Keeper.   
                        </Heading>
                        <Divider mt={2} ></Divider>
                        <Heading
                            mt={2}
                            ml={5}
                            fontSize={["2xl","2xl","lg","xl","2xl"]}
                            alignSelf="center"
                            letterSpacing="tighter"
                            fontWeight="semibold" 
                        >
                            <Icon display={"inline"} as={AiOutlineExclamationCircle} fontSize="xs" /> Verify your identity.    
                        </Heading>
                        {/** otp email code pin input */}
                        <Stack ml={5} mt={4} spacing={2}>
                            <chakra.form onSubmit={handleEmailCodeVerification}>
                            <HStack ml={150}>
                                <PinInput mask onComplete={(value: string)=> SetEmailCode(value)} onChange={(value: string)=>{ if(value.length !== 6){SetRemoveError(false)}}}>
                                    <PinInputField onClick={(_e: any) => { if(!removeError) {SetRemoveError(true)} }}/>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                            {/**  Verify Email code button */}
                            <Button 
                                textTransform='uppercase'
                                size={"sm"}
                                width="100%"
                                leftIcon={<AiOutlineCheck />}
                                _hover={{bg:"teal.200"}}
                                type="submit"
                                my={2}
                                disabled={mutation.isLoading}
                                onClick={()=>{if(removeError) {SetRemoveError(false)} }}
                            >
                                Verify
                            </Button>
                            {mutation.error && <Alert display={removeError ? 'none' : 'flex'} status='error'><AlertIcon/>Verification failed! </Alert>}
                            {
                                rpcDispatchedEmail && !mutation.error &&
                                <Alert status='info'>
                                    <AlertIcon />
                                    <Box>
                                        <AlertTitle>Status: {rpcDispatchedEmail.status}</AlertTitle>
                                        <AlertDescription>dispatching an otp to {userEmail}...</AlertDescription>
                                    </Box>
                                    </Alert> 
                            }
                            </chakra.form>
                        </Stack>
                        <Divider mt={2} ></Divider>
                        <Text color="gray.600" fontSize="xs" py={2} ml={44} fontWeight='hairline' fontFamily='cursive'>📝Note from developer📝</Text>
                        <Text color="gray.600" fontSize="xs" py={2} ml={12} fontWeight='hairline' fontFamily='cursive'>Keeper. is still in uat/sandbox env if you are not able to locate the otp in your inbox please check your spam , if its still not accessible please contact jasmeetbali.dev.2021@gmail.com </Text>
                    </motion.div>
                    </Flex>
                </Flex>
                </Flex>
            </Flex> 
        </>
    )
}