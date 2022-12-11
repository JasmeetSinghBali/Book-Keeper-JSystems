import React,{ useEffect, useState } from 'react';
import { 
    Flex, Heading, Text,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import UserContactSection from '../../components/user-contacts.tsx/user.contact';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { trpcClient } from '../../utils/Clientrpc';


export default function contacts(){
    const { push } = useRouter(); 
    
    const { data: session, status } = useSession();
    const userEmail: any = session?.user?.email;
    const rpcAccessQuery: any = trpcClient.rpcAccess.checkRpcAccess.useQuery({email: userEmail});

    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
        }
        if(!rpcAccessQuery.data){
            push('/user/dashboard');
        }
    },[]);  
    return(
        <Flex
            h={[null,null,"100vh"]}
            flexDir={["column","column","row"]}
            overflow="hidden"
            maxW="2000px"
        >
            <Navbar /> 
            <UserContactSection />
        </Flex>
    )
}