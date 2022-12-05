import React,{ useEffect, useState } from 'react';
import { 
    Flex, Heading, Text,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import TxnList from '../../components/user-dashboard/txnlist.dashboard';
import SearchNotificationSection from '../../components/user-dashboard/searchnotif.dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { trpcClient } from '../../utils/Clientrpc';


export default function dashboard(){
 
    const { push, pathname } = useRouter();
    const { data: session, status } = useSession(); 
    const userEmail: any = session?.user?.email;
    const result: any = trpcClient.user.whoami.useQuery({ email: userEmail });
    const userInfo: any = result?.data?.data;


    /**
     * Case-1 if no session show not signed in & redirect user to login page
     * Case-2 if whoami protected procedure fails with unauthorized it means that no auth header token is present, then redirect user to a page with navbar and simplistic ui that asks them to enter the OTP they recieved at their email , use sessioned procedure for that , update the token recieved in zustand store, and reconfig token value in Clientrpc.ts utils
     * Case-3 if phone null then newly signed up user & redirect to setting page
     *   */
    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
            return;
        }
        if(result.data === undefined){
            push('/user/verify');
            return;
        }
        if( userInfo?.phone === null || !userInfo?.name){
            push('/user/settings');
            return;
        } 
        return;
    },[]);
    return ( 
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