import React,{ useEffect, useState } from 'react';
import { 
    Flex, Heading, Text
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import SettingsNavbar from '../../components/user-settings/navbar.settings';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function settings(){
    const { push } = useRouter(); 
    
    const { data: session, status } = useSession();

    /**if no session show not signed in & redirect user to login page with set timeout */
    // if(!session){
    //     setTimeout(()=>{
    //         push('/user/login');
    //       },2000);
    //       return <Flex flexDir="column" h={"100vh"} bgGradient='linear(to-r, red.50, blue.50, green.50,yellow.50)'>
    //                 <Heading fontSize="lg" fontWeight="extrabold"> Authenticating.... </Heading>
    //                 <br/>
    //                 <Text fontWeight="semibold" fontSize="sm"> You will be redirected to Sign in page in case authentication fails...</Text>
    //              </Flex>
    // }
    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
        }
    },[]);  
    return(
        <>
            <Flex
                h={[null,null,"100vh"]}
                flexDir={["column","column","row"]}
                overflow="hidden"
                maxW="2000px"
                display="flex"
                backgroundColor="#EDF2F7"
            >
                <Navbar /> 
                <SettingsNavbar />
            </Flex>
        </>
    )
}