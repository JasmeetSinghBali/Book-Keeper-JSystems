import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const GeneralSettings = () => {
    return (
        <>
            <Flex
                w="100%"
                h="80%"
                p={2}
                mb={1}
            >
                <Heading>General</Heading>
                <Flex
                    w="100%"
                    h="100%"
                    display="flex"
                    flexDir="row"
                >
                </Flex>
            </Flex>
        </>
    )
}

export default GeneralSettings;