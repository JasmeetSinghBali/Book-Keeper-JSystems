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
import { useCurrentRpcToken } from '../../store/rpc-token-store';
import { useCurrentUserInfo } from '../../store/current-user-info.store';


export default function dashboard(){
 
    const { push, pathname } = useRouter();
    const { data: session, status } = useSession(); 
    const userEmail: any = session?.user?.email;
    let rpcAccessQuery: any;
    rpcAccessQuery = trpcClient.rpcAccess.fetchRpcToken.useQuery({email: userEmail});
    
    const result: any = trpcClient.user.whoami.useMutation();
    
    const grabUserData = async() => {
        try{
            if(rpcAccessQuery.data && rpcAccessQuery.data.data.rpc_token.length > 1){
                await useCurrentRpcToken.setState({token: rpcAccessQuery.data.data.rpc_token});
                await result.mutate({ email: userEmail, access_token: rpcAccessQuery.data.data.rpc_token })
                return;
            }
            return;
        }catch(err: any){
            console.log(err);
            return;
        }
    }

    /**
     * Case-1 if no session means not signed in, redirect user to login page
     * Case-2 if whoami protected procedure fails with unauthorized it means that no auth cookie header token is present, then redirect user to a verify page with that asks them to enter the OTP they recieved at their email , use sessioned procedure for that , enable the rpcAccess for user & return back the token in cookie header
     *   */
    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
            return;
        }
        grabUserData();
        if(!rpcAccessQuery.data){
            push('/user/verify');
            return;
        }
        return; 
    },[]);

    // 💭 helper , get zustand state token
    // const rpcTokenInZustand = useCurrentRpcToken.getState();
    // console.log("==================I AM HERE=============");
    // console.log(rpcTokenInZustand);
    useEffect(()=>{
        if(result.data){
            // ✨ user data stored in zustand store for other componenets access to the same data
            useCurrentUserInfo.setState({user: result.data.data})
        }
    },[result.data])

    return ( 
            <Flex
                h={[null,null,"100vh"]}
                flexDir={["column","column","row"]}
                overflow="hidden"
                maxW="2000px"
            >
                <Navbar/> 
                <TxnList/>
                <SearchNotificationSection />
            </Flex>
    )
}