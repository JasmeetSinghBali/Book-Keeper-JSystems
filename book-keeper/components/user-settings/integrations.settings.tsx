import { Avatar, Badge, Divider, Flex, Heading, Icon, IconButton, Link, Switch, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React,{ useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineApi, AiOutlineCopy } from 'react-icons/ai';
import {motion} from 'framer-motion';

const IntegrationSettings = ({...userInfo}) => {
    const [view,changeView] = useState('hide');
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
                        mt={-5}
                        mb={10}
                        h={["33%","27%","6%","8%","10%"]}
                        display="flex"
                        flexDir="row"
                    >
                        <Divider orientation="vertical" borderColor="#D53F8C" />
                        <Divider orientation="vertical" borderColor="#D53F8C"/>
                        <Divider orientation="vertical" borderColor="#D53F8C" />
                        <Icon as={AiOutlineApi} fontSize="md"></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.2
                                }
                            },
                        }}>
                        <Heading color="purple.700" mt={[1,1,-1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Documentations <Badge ml={1} fontSize="md" colorScheme="cyan" >v0.1.0</Badge></Heading>
                        </motion.div>
                        <Link href="http://keeper.integeration/documentations" _hover={{textDecor: 'none', color: "#FBB6CE"}} display="flex">
                            <Text><Icon fontSize={["3xl","5xl","4xl","5xl","6xl"]} as={AiOutlineCopy}></Icon></Text>
                        </Link>
                    </Flex>
                    <motion.div initial="hidden" animate="visible" variants={{
                        hidden:{
                            scale: .8,
                            opacity: 0
                        },
                        visible:{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                delay: 0.4
                            }
                        },
                    }}>
                        <Heading color="purple.700" fontSize={["normal","large","xl","2xl","normal"]}>Connected Apps</Heading>
                    </motion.div>
                    <Text mt={1} fontSize="xs" fontWeight="hairline"color="gray.900">supercharge your workflow and connect the tool you use every day.</Text>
                    
                    {/**Integration List & Action Section */}
                    <Flex 
                        overflow='auto'
                    >
                        <Table variant="unstyled" ml={-5}>
                            <Thead>
                                <Tr color="gray">
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>
                                    <Flex align="center">
                                        <Avatar size={["sm","md","md","lg","lg"]} mr={2} src="john.jpeg"/>
                                        <Flex flexDir="column">
                                            <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>Notion</Heading>
                                            <Text fontSize="xs" color="gray" letterSpacing="tighter">Embed notion pages and notes in projects.</Text>
                                        </Flex>
                                    </Flex>
                                </Td>
                                <Td fontSize="xs">
                                        <Flex>
                                            <Link href="https://www.notion.so/" target="_blank" _hover={{textDecor: 'none'}} display="flex">
                                                <Text fontSize="xs" color="gray" letterSpacing="tighter" mr={2}>
                                                    Learn more
                                                </Text>
                                            </Link>
                                            <Switch
                                                //onClick={} 
                                                colorScheme="pink"
                                                borderColor="gray.200"
                                            >

                                            </Switch>
                                        </Flex>
                                </Td>
                            </Tr>
                            {
                                view === 'show' &&
                                <>
                                    <Tr>
                                        <Td>
                                            <Flex align="center">
                                                <Avatar size={["sm","md","md","lg","lg"]} mr={2} src="john.jpeg"/>
                                                <Flex flexDir="column">
                                                    <Heading fontWeight="extrabold" fontSize={["sm","md","md","lg","lg"]} letterSpacing={["tighter","tight","tight","wider","wider"]}>Slack</Heading>
                                                    <Text fontSize="xs" color="gray" letterSpacing="tighter">Send notifications to channel and create projects from messages</Text>
                                                </Flex>
                                            </Flex>
                                        </Td>
                                        <Td fontSize="xs">
                                            <Flex>
                                                <Link href="https://slack.com/intl/en-in" target="_blank" _hover={{textDecor: 'none'}}>
                                                    <Text fontSize="xs" color="gray" letterSpacing="tighter" mr={2}>
                                                        Learn more
                                                    </Text>
                                                </Link>
                                                <Switch 
                                                    //onClick={} 
                                                    colorScheme="pink"
                                                    borderColor="gray.200">
                                                </Switch>
                                            </Flex>
                                        </Td>
                                    </Tr>       
                                </>
                            }
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex align="center">
                        <Divider/>
                        <IconButton 
                            _hover={{bg:"#FBB6CE"}}
                            icon={view === 'show' ? <AiFillCaretUp /> : <AiFillCaretDown />}
                            aria-label={''}
                            onClick={()=>{
                                if(view === 'show'){
                                    changeView('hide');
                                }else{
                                    changeView('show');
                                }
                            }} 
                        />
                        <Divider/>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default IntegrationSettings;