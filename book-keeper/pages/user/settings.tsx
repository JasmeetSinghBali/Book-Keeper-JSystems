import React,{ useEffect, useState } from 'react';
import { 
    Flex, Heading, Text
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import SettingsNavbar from '../../components/user-settings/navbar.settings';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { trpcClient } from '../../utils/Clientrpc';
import { useCurrentUserInfo } from '../../store/current-user-info.store';


export default function settings(){
    
    const { push } = useRouter(); 
    const { data: session, status } = useSession();
    const userEmail: any = session?.user?.email;
    const rpcAccessQuery: any = trpcClient.rpcAccess.checkRpcAccess.useQuery({email: userEmail}); 
    if(!rpcAccessQuery.data){
        push('/user/dashboard');
    }
    
    /**if no session show not signed in & redirect user to login page */
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