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
    AiFillCalendar,
    AiFillCaretDown,
    AiFillCaretUp,
    AiFillPlusCircle,
    AiFillCreditCard,
    AiOutlineFileSearch,
    AiOutlineBell,
} from 'react-icons/ai';
import BKChartMain from '../components/bkmain.chart'
import Navbar from '../components/navbar';

export default function dashboard(){
    return(
        <Flex
            h="100vh"
            flexDir="row"
            overflow="hidden"
            maxW="2000px"
        >
            <Navbar /> 
            {/*Chart + Latest Transaction List Section*/}
            <Flex>

            </Flex>

            {/*Search + Incoming/Outgoing Total Funds Amount + [For Future Versions] Dispatch/Send Fiat Section */}
            <Flex>

            </Flex>
            
        </Flex>
    )
}