import React,{ useEffect, useState } from 'react';
import { 
    Flex, Heading, Text,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { trpcClient } from '../../utils/Clientrpc';
import { useCurrentRpcToken } from '../../store/rpc-token-store';


export default function Invoices(){
     
    const { push } = useRouter();     
    const { data: session, status } = useSession();
    const userEmail: any = session?.user?.email;
    const rpcAccessQuery: any = trpcClient.rpcAccess.checkRpcAccess.useQuery({email: userEmail});

    const rpcTokenInZustand =  useCurrentRpcToken.getState(); 
    const checkRpcTokenValidity: any = trpcClient.rpcAccess.checkRpcTokenValidity.useQuery({
        rpc_token: rpcTokenInZustand.token
    });

    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
        }
        if(!rpcAccessQuery.data){
            push('/user/dashboard');
        }
        if(!checkRpcTokenValidity.data || !checkRpcTokenValidity?.data?.data?.valid){
            push('/user/dashboard');
        }
    },[]);

    return(
        <>
            <Flex
                h={[null,null,"100vh"]}
                flexDir={["column","column","row"]}
                overflow="hidden"
                maxW="2000px"
                backgroundColor="#EDF2F7"
            >
                <Navbar /> 
            </Flex>
        </>
    )
}