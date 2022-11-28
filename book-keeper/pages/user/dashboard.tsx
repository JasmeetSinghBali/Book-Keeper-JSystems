import React,{ useEffect, useState } from 'react';
import { 
    Flex, Heading, Text,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import TxnList from '../../components/user-dashboard/txnlist.dashboard';
import SearchNotificationSection from '../../components/user-dashboard/searchnotif.dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function dashboard(){

    const { push } = useRouter(); 
    /**🎈 if no session show not signed in & redirect user to login page with set timeout */
    const { data: session, status } = useSession();

    if(!session){
        setTimeout(()=>{
            push('/user/login');
          },2000);
          return <Flex flexDir="column" h={"100vh"} bgGradient='linear(to-r, red.50, blue.50, green.50,yellow.50)'>
                    <Heading fontSize="lg" fontWeight="extrabold"> Authenticating.... </Heading>
                    <br/>
                    <Text fontWeight="semibold" fontSize="sm"> You will be redirected to Sign in page in case authentication fails...</Text>
                 </Flex>
    }   
    return(
        <Flex
            h={[null,null,"100vh"]}
            flexDir={["column","column","row"]}
            overflow="hidden"
            maxW="2000px"
        >
            <Navbar /> 
            <TxnList/>
            <SearchNotificationSection />
        </Flex>
    )
}