import React,{ useState } from 'react';
import { 
    Flex,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import AnimatedCredits from '../../components/user-credits/animatedcredits';


export default function hallofame(){ 
    return(
        <>
            <Flex
                h={[null,null,"100vh"]}
                flexDir={["column","column","row"]}
                overflow="hidden"
                maxW="2000px"
                backgroundColor="#E2E8F0"
            >
                <Navbar />
                <AnimatedCredits/> 
            </Flex>
        </>
    )
}