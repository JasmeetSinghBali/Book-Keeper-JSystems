import { Badge, Button, Divider, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Switch, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

import React,{ useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp, AiOutlineDownload, AiOutlineFileSearch, AiOutlineQuestion } from 'react-icons/ai';
import {
    RiBillLine, RiFilterLine
} from 'react-icons/ri';
import AnimatedCharacter from '../common/animations/animate.character';


const BillingSettings = ({userStoreData}: any) => {
    const [view,changeView] = useState('hide');
    return (
        <>
            <Flex
                w="100%"
                h="80%"
                p={3}
                mt={[30,15,65,20,10]}
                mb={1}
                display="flex"
                flexDir="column"
                marginLeft={[65,45,65,10,5]}
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
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]} />
                        <Icon as={RiBillLine} fontSize={["xs","sm","sm","md","md"]} mt={[1,1,2,-1,1]}></Icon>
                        <Heading color="purple.700" mt={[1,1,1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}><AnimatedCharacter text='Billing' /></Heading>
                    </Flex>
                    <Flex
                        mt={-5}
                        mb={10}
                        h={["33%","27%","6%","8%","10%"]}
                        display="flex"
                        flexDir={["column","column","row","row","row"]}
                    >
                        <Text letterSpacing="tighter" fontSize={["xs","xs","sm","sm","sm"]} fontWeight="hairline"><Button size={["xs","xs","xs","md","md"]} bgColor="gray.200" _hover={{bgColor: "#FBB6CE"}}><Icon mr={2} as={AiOutlineDownload}></Icon>All bills</Button></Text>
                        <Text letterSpacing="tighter" fontSize="sm" fontWeight="hairline">
                            <Badge variant="subtle" ml={2} colorScheme="gray" fontSize={["0.6em","0.6em","0.6em","0.6em","0.8em"]}>
                                <Flex>
                                    {/* 🎈 make this badge number 9 dynamic */}
                                    <Text>Recurring Bills:</Text>
                                    <Text ml={1}>9</Text>
                                </Flex>
                            </Badge>
                            <Badge variant="subtle" ml={2} colorScheme="gray" fontSize={["0.6em","0.6em","0.6em","0.6em","0.8em"]}>
                                <Flex>
                                    {/* 🎈 make this badge number 15 dynamic */}
                                    <Text>One Time Bills:</Text>
                                    <Text ml={1}>15</Text>
                                </Flex>
                            </Badge>
                        </Text>
                        <Flex
                            align="flex-end"
                            flexDir={["column","column","row","row","row"]}
                        >
                            <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#1A202C" borderRadius="2px" ml={[10,1,5,10,50]}>
                                <InputLeftElement pointerEvents="none" >
                                    <AiOutlineFileSearch color="#1A202C"/>
                                </InputLeftElement>
                                <Input type="date" borderRadius="1px"/>
                            </InputGroup>
                            <IconButton
                                _hover={{bg:"#FBB6CE"}}
                                icon={<RiFilterLine />}
                                aria-label={'Filters'}
                                //onClick={}
                                ml={2}
                                mb={4}
                                bgColor="gray.200"
                                size={["sm","sm","md","md","md"]}
                            >    
                            </IconButton>
                            <Text letterSpacing="tighter" fontSize={["xs","xs","sm","sm","sm"]} fontWeight="hairline">
                                <Button size={["xs","xs","xs","md","md"]} ml={2} mb={4} bgColor="gray.200" _hover={{bgColor: "#FBB6CE"}}>
                                    <Icon as={AiOutlineQuestion} fontSize={"xs"}>
                                    </Icon>
                                    Submit Query
                                </Button>
                            </Text>
                        </Flex>
                    </Flex>

                    {/* Billing List Section */}
                    <Flex
                        overflow="auto"
                    >
                        <Table variant="unstyled" ml={-5} >
                            <Thead>
                                <Tr color="gray">
                                    <Th>Type</Th>
                                    <Th>Issue Date</Th>
                                    <Th>Amount</Th>
                                    <Th>Due Date</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>
                                    One-Time
                                </Td>
                                <Td>
                                   Apr 14 `23 
                                </Td>
                                <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="tighter">
                                    $ 507.45
                                </Td>
                                <Td>
                                    May 14 `23
                                </Td>
                                <Td>
                                <Badge variant="solid" ml={2} colorScheme="green" fontSize="0.8em">
                                    <Flex>
                                        {/* 🎈 make this badge status dynamic */}
                                        <Text>Paid</Text>
                                    </Flex>
                                </Badge>
                                </Td>
                            </Tr>
                            {
                                view === 'show' &&
                                <>
                                    <Tr>
                                        <Td>
                                            Recurring
                                        </Td>
                                        <Td>
                                            Aug 05 `23 
                                        </Td>
                                        <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="tighter">
                                            $ 75.80
                                        </Td>
                                        <Td>
                                            Aug 28 `23
                                        </Td>
                                        <Td>
                                        <Badge variant="solid" ml={2} colorScheme="red" fontSize="0.8em">
                                            <Flex>
                                                {/* 🎈 make this badge status dynamic */}
                                                <Text>Unpaid</Text>
                                            </Flex>
                                        </Badge>
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

export default BillingSettings;