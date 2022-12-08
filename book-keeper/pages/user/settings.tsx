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
    const [rpcToken, SetRpcToken] = useState('');
    const { data: session, status } = useSession();
    const userEmail: any = session?.user?.email; 
    
    // 🎈 use this to set user info in zustand store to be available/accessible to all pages then
    const { user, setUserInfo } =  useCurrentUserInfo();

    /**if no session show not signed in & redirect user to login page */
    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
        }
        // 🎈 under construction================
        // exposed an api that dispatches rpc access token and attach them 
        // as await all promise
        // 1. get rpc access token from trpc server 
        // 2. trpc make whoami route with authorization header with this access token to get user info from DB and store in zustand store 
        // ref: https://trpc.io/docs/links/httpBatchLink
    
        // const context : any = {
        //     skipBatch: false,
        //     headers: {
        //         Authorization: `Bearer ${window.localStorage.getItem('rpcAccessToken') ? window.localStorage.getItem('rpcAccessToken') : 'placeholder'}`
        //     }
        // } 
        
        // const result: any = trpcClient.query( 
        //     ['user.whoami'], 
        //     { email: userEmail },
        //     context,
        // );
        
        // SetUserInfo(result.data.data);
    
    },[session]); 
    
    
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