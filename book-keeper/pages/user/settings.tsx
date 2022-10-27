import React,{ useState } from 'react';
import { 
    Flex,
} from "@chakra-ui/react";
import Navbar from '../../components/common/navbar';
import SettingsNavbar from '../../components/user-settings/navbar.settings';

export default function settings(){ 
    return(
        <Flex
            h={[null,null,"100vh"]}
            flexDir={["column","column","row"]}
            overflow="hidden"
            maxW="2000px"
        >
            <Navbar /> 
            <SettingsNavbar />
        </Flex>
    )
}