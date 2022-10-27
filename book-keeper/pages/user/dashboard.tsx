import React,{ useState } from 'react';
import { 
    Flex,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import TxnList from '../../components/dashboard/txnlist.dashboard';
import SearchNotificationSection from '../../components/dashboard/searchnotif.dashboard';

export default function dashboard(){ 
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