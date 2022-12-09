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
    
    const { setToken } = useCurrentRpcToken();
    const {user,setUserInfo} = useCurrentUserInfo()

    const result: any = trpcClient.user.whoami.useMutation();
    

    const grabUserData = async() => {
        try{
            if(rpcAccessQuery.data && rpcAccessQuery.data.data.rpc_token.length > 1){
                // store this token in zustand rpc token store
                setToken(rpcAccessQuery.data.data.rpc_token);
                await result.mutate({ email: userEmail, access_token: rpcAccessQuery.data.data.rpc_token })
                return;
            }
            if(result.data){
                console.log(result.data)
                // updated user info in zustand store
                setUserInfo(result.data.data);
                console.log(user);
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
     * Case-3 if phone null then this is newly signed up cum sign in user & redirect to setting page to manipulate user to update their phone number and edit their settings
     *   */
    // 📝 moved push to useEffect as server side push is not supported casues router instance error
    useEffect(()=>{
        if(!session){
            push('/user/login');
            return;
        }
        grabUserData();
        if(!rpcAccessQuery.data || !rpcAccessQuery.data.data.rpc_token){
            push('/user/verify');
            return;
        }
        return; 
    },[]);

    // 🎈 pass this as props to navbar, txlist & search notifications
    const userDataGrabbed: any = result.data;
    
    console.log(userDataGrabbed);  

    return ( 
            <Flex
                h={[null,null,"100vh"]}
                flexDir={["column","column","row"]}
                overflow="hidden"
                maxW="2000px"
            >
                <Navbar userData={userDataGrabbed} /> 
                <TxnList/>
                <SearchNotificationSection />
            </Flex>
    )
}