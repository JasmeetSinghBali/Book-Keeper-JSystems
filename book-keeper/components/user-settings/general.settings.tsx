import { Avatar, Flex, Icon, IconButton, Text, Divider } from '@chakra-ui/react';
import React from 'react';
import { AiFillCamera } from 'react-icons/ai';

const GeneralSettings = () => {
    return (
        <>
            <Flex
                w="100%"
                h="80%"
                p={3}
                mt={[-10,-10,5,5,5]}
                mb={1}
                display="flex"
                flexDir="column"
                marginLeft={[3,2,17,20,20]}
            >

                <Flex
                    w="100%"
                    h="100%"
                    display="flex"
                    flexDir="column"

                >
                    <Flex
                        flexDir="row"
                        h={["33%","27%","23%","20%","18%"]}
                    >
                        {/*🎈 make this dynamic a/c to current User Image */}
                        <IconButton
                            //onClick={onOpen} 
                            icon={<AiFillCamera />}
                            fontSize="x-large"
                            bgColor="#fff"
                            borderRadius="100%"
                            // p="10px"
                            aria-label={'ChangePhoto'} 
                            _hover={{bg:"#FBB6CE"}}
                        />
                        <Divider orientation="vertical" />
                        <Divider orientation="vertical" />
                        <Divider orientation="vertical" />            
                        <Flex
                            flexDir="column"
                        >
                            <Avatar size="xl" my={2} src="avatar-1.jpg" />
                        </Flex>
                        <Divider orientation="vertical" />
                        <Divider orientation="vertical" />
                        <Divider orientation="vertical" />
                        <Flex
                         flexDir="column"
                         ml={5}
                         mt={5}
                        >
                            {/*🎈 Make This Dynamic User Data make sure to show the username & Email in upper case*/}
                            <Text fontSize="md" fontWeight="semibold" letterSpacing="tight" >Username: jasmeet.b</Text>
                            <Text fontSize="md" fontWeight="semibold" letterSpacing="tight" >Email: jasmeet.bali@niche.com</Text>
                            <Text fontSize="md" fontWeight="semibold" letterSpacing="tight" >Phone: 9871134488</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default GeneralSettings;