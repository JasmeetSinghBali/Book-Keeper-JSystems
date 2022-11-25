import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Box, Button, Flex, Grid, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { trpcClient } from '../../utils/Clientrpc';
import { RiBookMarkFill } from 'react-icons/ri';
import { BsGithub , BsGoogle, BsTwitter} from 'react-icons/bs';
import { motion } from 'framer-motion';

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

const LogIn: NextPage = () => {
  
  const { data: session } = useSession();
  const {push} = useRouter();
  
  console.log(`@Current User Session: ${session}`);
  
  /**🎈 if session exists then redirect to user dashboard page which will have a signout button */
  if(session){
    setTimeout(()=>{
      push('/user/dashboard');
      },5000);
  }

  console.log(providers);

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
                      /**🎈 change this to gradient */ 
                      backgroundColor="#CBD5E0"
                  >
                    <Flex
                      flexDir="column"
                      justifyContent="space-between"
                      h={"100vh"}
                      w={"50%"}
                    >
                      {/*Sign In heading section */}
                      <Flex
                          flexDir="column"
                          padding={20}
                          marginLeft={250}
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
                                fontWeight="semibold" 
                            >
                                <Icon display={"inline"} as={RiBookMarkFill} fontSize="xl" color="goldenrod"></Icon>Keeper.   
                            </Heading>
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