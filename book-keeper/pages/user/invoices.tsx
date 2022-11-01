import React,{ useState } from 'react';
import { 
    Flex,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';


export default function invoices(){ 
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