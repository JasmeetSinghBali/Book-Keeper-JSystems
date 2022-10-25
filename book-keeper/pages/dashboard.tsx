import React,{ useState } from 'react';
import { 
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import {
    AiFillPlusCircle,
    AiFillCreditCard,
    AiOutlineFileSearch,
    AiOutlineBell,
} from 'react-icons/ai';
import Navbar from '../components/navbar';
import TxnList from '../components/txnlist.dashboard';

export default function dashboard(){ 
    return(
        <Flex
            h="100vh"
            flexDir="row"
            overflow="hidden"
            maxW="2000px"
        >
            
            <Navbar /> 
            
            <TxnList/>
            
            {/*Search + Incoming/Outgoing Total Funds Amount + [For Future Versions] Dispatch/Send Fiat Section */}
            <Flex
                w="30%"
                bgColor="#F5F5F5"
                p="3%"
                flexDir="column"
                overflow="auto"
            >

            </Flex>
            
        </Flex>
    )
}