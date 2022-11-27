import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Box, Button, Divider, Flex, Grid, Heading, Icon, Input, InputGroup, InputLeftAddon, Skeleton, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpcClient } from '../../utils/Clientrpc';
import { RiBookMarkFill } from 'react-icons/ri';
import { BsGithub , BsGoogle, BsTwitter} from 'react-icons/bs';
import { motion } from 'framer-motion';
import { FiLogIn } from 'react-icons/fi';
import { AiFillMail } from 'react-icons/ai';
import AnimatedCharacter from '../../components/common/animations/animate.character';
import AnimatedWords from '../../components/common/animations/animate.words';



const LogIn: NextPage = () => {
  
  const { data: session, status } = useSession();
  const {push} = useRouter();

  /**Oauth single sign in options */
  const providers: any = [
    {
      name: 'github',
      Icon: BsGithub
    },
    {
      name: 'google',
      Icon: BsGoogle
    },
    {
      name: 'twitter',
      Icon: BsTwitter
    }
  ];
  /** handle Oauth single sign in flow a/c to the provider name */
  const handleOauthSignIn = (providerName: string) => () => signIn(providerName)
  
  console.log(`@Current User Session: ${session}`);
  
  /**If the oauth is still processing show a skelton loader... */
  if(status !== 'authenticated' && status !== 'unauthenticated'){
    return <Skeleton startColor='gray.200' endColor='gray.600'></Skeleton>
  }

  /**if session exists then redirect to user dashboard page which will have a signout button */
  if(session){
      setTimeout(()=>{
        push('/user/dashboard');
      },3000)
      const userEmail: any = session?.user?.email;
      return <Flex flexDir="column" h={"100vh"} bgGradient='linear(to-r, red.50, blue.50, green.50,yellow.50)' >
              <Heading fontSize="lg" fontWeight="extrabold"> <AnimatedWords text="Welcome!! Wonderer"/> </Heading>
              <br/>
              <Text fontWeight="bold" fontSize="md"><AnimatedWords text={userEmail} /></Text>
              <br/>
              <Text fontWeight="semibold" fontSize="sm"><AnimatedWords text="redirecting you to your dashboard..." /></Text>
             </Flex>
  }

  return (      
            <>
               <Flex
                  h={[null,null,"100vh"]}
                  flexDir={["column","column","row"]}
                  overflow="hidden"
                  maxW="2000px"
                >
                  <Flex
                      w={"100%"}
                      flexDir="column"
                      alignItems="center"
                      bgGradient='linear(to-r, red.50, blue.50, green.50,yellow.50)'
                  >
                    <Flex
                      flexDir="column"
                      justifyContent="space-between"
                      h={"100%"}
                      w={"50%"}
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
                                ml={10}
                                fontSize={["4xl","4xl","2xl","3xl","4xl"]}
                                alignSelf="center"
                                letterSpacing="tighter"
                                fontWeight="semibold" 
                                color="gray.600"
                            >
                              <Icon display={"inline"} as={RiBookMarkFill} fontSize="lg" color="#805AD5"></Icon>Keeper.   
                            </Heading>
                            <Divider ml={10} mt={1} ></Divider>
                            <Heading
                                mt={4}
                                ml={10}
                                fontSize={["2xl","2xl","lg","xl","2xl"]}
                                alignSelf="center"
                                letterSpacing="tighter"
                                fontWeight="semibold" 
                            >
                              Sign in. <Icon display={"inline"} as={FiLogIn} fontSize="xs" />   
                            </Heading>
                            {/** email magic link sign in */}
                            <Stack ml={8} mt={6} spacing={2}>
                              <InputGroup>
                                <InputLeftAddon children='@mail' />
                                <Input type='email' placeholder='john.doe@funxmail.com'></Input>
                              </InputGroup>
                              {/** 🚧 Sign in button via mail magic link */}
                              <Button textTransform='uppercase' size={"sm"} width="100%" leftIcon={<AiFillMail />} _hover={{bg:"gray.900"}} colorScheme="purple">
                                Sign in via mail
                              </Button>
                            </Stack>
                            {/** 🚧 Oauth sign in options github,microsoft,google */}
                            <VStack marginTop={4} marginLeft={10}>
                              <Text color="gray.500"> OAuth Single Sign In. </Text>
                              {
                                providers.map(({ name, Icon }: any )=>{
                                  return <Button 
                                            key={name}
                                            leftIcon={<Icon />}
                                            _hover={{bg:"teal.200"}}
                                            colorScheme="gray"
                                            onClick={handleOauthSignIn(name)}
                                            textTransform='uppercase'
                                            width="100%"
                                            letterSpacing="tighter"
                                            size="sm"
                                            >
                                              Sign in via {name}
                                          </Button>
                                })
                              }
                            </VStack>
                        </motion.div>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex> 
            </>
  );
};


export default LogIn;



/** 📝 Helpers */
// session ? 
// (
//   <>
//     {
//       setTimeout(()=>{
//         push('/user/dashboard');
//         },5000)
//     }
//     <Text>Signed in as {session.user?.email} redirecting to Dashboard...</Text>
//     <Button onClick={handleSignOut}>SignOut</Button>
//   </>
// )
/**
   * ⭐ redirect: false prevents page refresh on signout
   * ⭐ also callbackUrl specify the page where to redirect the user after they signout change this to landing page url
   */ 
//  const handleSignOut = async () => {
//   const data = await signOut({redirect: false, callbackUrl: '/'});
//   push(data.url)
// }
//const handleSignIn = () => signIn();
//const result = trpcClient.message.useQuery({name: '🐱‍🚀'});
/** 📝 can be used in landing page to redirect user to login user page on click */
  // const handleSignIn = () => push('/user/login');