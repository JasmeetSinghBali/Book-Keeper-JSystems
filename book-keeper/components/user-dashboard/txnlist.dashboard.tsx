import React,{ useState } from 'react';
import { 
    Flex,
    Heading,
    Avatar,
    Text,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
} from "@chakra-ui/react";
import {
    AiFillCaretDown,
    AiFillCaretUp,
} from 'react-icons/ai';
import BKChartMain from './chart.dashboard.tsx'
import { motion } from 'framer-motion';
import AnimatedCharacter from '../common/animations/animate.character';
import ChartRanger  from './chart.dashboard.filter';
import TxnListFilter from './txnlist.dashboard.filter';

const TxnList = () => {
    const [view,changeView] = useState('hide');
    return(
        <>
            {/*Chart + Latest Transaction List Section*/}
            <Flex
                w={["100%", "100%", "60%", "60%", "55%"]}
                p="3%"
                flexDir="column"
                overflow="auto"
                minH="100vh"
                backgroundColor="#fff"
            >
                <motion.div initial="hidden" animate="visible" variants={{
                    hidden:{
                        scale: .8,
                        opacity: 0
                    },
                    visible:{
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: 1
                        }
                    },
                 }}>
                    <Heading fontWeight="normal" mb={1} mt={1} fontSize="xl" letterSpacing="tighter"> Welcome back, <Flex fontWeight="bold" display="inline-flex" fontSize="xl">Jasmeet</Flex></Heading>
                 </motion.div>
                <Flex
                    justifyContent="space-between"
                    mt={0}
                >
                    <Flex
                        align="flex-end"
                    >
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 1.2
                                }
                            },
                        }}>
                            <Text color="gray" fontSize="xs">Funds Accounted Worth</Text>
                        </motion.div>
                    </Flex>
                    <ChartRanger />
                </Flex>
                <Text fontWeight="bold" fontSize="md"> $5,325.10 </Text>
                
                <BKChartMain />
                
                {/*Transactions List Header*/}
                <Flex
                    justifyContent="space-between"
                    mt={4}
                >
                    <Flex
                        align="flex-end"
                    >
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 1.4
                                }
                            },
                        }}>
                            <Heading as="h2" size="md" letterSpacing="tighter">Transactions</Heading>
                        </motion.div>
                        <Text fontSize="xs" color="gray" ml={4}>Apr 2023</Text>
                    </Flex>
                    <TxnListFilter/>
                </Flex>
                {/*Transactions List Section [scrollable & responsive]*/}
                <Flex flexDir='column'>
                    <Flex overflow='auto'>
                        <Table variant="unstyled" mt={0.5}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>Sender/Reciever</Th>
                                    <Th>Category</Th>
                                    <Th isNumeric>Amount</Th>
                                    <Th>Description</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>
                                    <Flex align="center">
                                        <Avatar size="xs" mr={2} src="john.jpeg"/>
                                        <Flex flexDir="column">
                                            <Heading fontWeight="bold" fontSize="sm" letterSpacing="tighter">John Wick</Heading>
                                            <Text fontSize="xs" color="gray">Apr 13, 2022 at 10:45am</Text>
                                        </Flex>
                                    </Flex>
                                </Td>
                                <Td textColor="#E53E3E" letterSpacing="tighter" fontSize="xs">Fiat-Debit</Td>
                                <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="wider">-$2.45</Td>
                                <Td fontSize="xs" letterSpacing="tighter">Computer Repair</Td>
                            </Tr>
                            <Tr>
                                <Td>
                                    <Flex align="center">
                                        <Avatar size="xs" mr={2} src="doe.jpeg"/>
                                        <Flex flexDir="column">
                                            <Heading fontWeight="bold" fontSize="sm" letterSpacing="tighter">Simon Danny</Heading>
                                            <Text fontSize="xs" color="gray">Nov 20, 2022 at 9:40pm</Text>
                                        </Flex>
                                    </Flex>
                                </Td>
                                <Td textColor="#38B2AC" letterSpacing="tighter" fontSize="xs">Fiat-Credit</Td>
                                <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="tighter">+$507.45</Td>
                                <Td fontSize="xs" letterSpacing="tighter">Betting</Td>
                            </Tr>
                                {
                                  view === 'show' &&
                                    <>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="xs" mr={2} src="john.jpeg"/>
                                                    <Flex flexDir="column">
                                                        <Heading fontWeight="bold" fontSize="sm" letterSpacing="tighter">John Wick</Heading>
                                                        <Text fontSize="xs" color="gray">Apr 13, 2022 at 10:45am</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td textColor="#E53E3E" letterSpacing="tighter" fontSize="xs">Fiat-Debit</Td>
                                            <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="wider">-$2.45</Td>
                                            <Td fontSize="xs" letterSpacing="tighter">Computer Repair</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="xs" mr={2} src="doe.jpeg"/>
                                                    <Flex flexDir="column">
                                                        <Heading fontWeight="bold" fontSize="sm" letterSpacing="tighter">Doe Jane</Heading>
                                                        <Text fontSize="xs" color="gray">Aug 20, 2022 at 5:45pm</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td textColor="#38B2AC" letterSpacing="tighter" fontSize="xs">Fiat-Credit</Td>
                                            <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="tighter">+$10</Td>
                                            <Td fontSize="xs" letterSpacing="tighter">App Designs</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                <Flex align="center">
                                                    <Avatar size="xs" mr={2} src="doe.jpeg"/>
                                                    <Flex flexDir="column">
                                                        <Heading fontWeight="bold" fontSize="sm" letterSpacing="tighter">Simon Danny</Heading>
                                                        <Text fontSize="xs" color="gray">Nov 20, 2022 at 9:40pm</Text>
                                                    </Flex>
                                                </Flex>
                                            </Td>
                                            <Td textColor="#38B2AC" letterSpacing="tighter" fontSize="xs">Fiat-Credit</Td>
                                            <Td isNumeric fontWeight="bold" fontSize="sm" letterSpacing="tighter">+$507.45</Td>
                                            <Td fontSize="xs" letterSpacing="tighter">Betting</Td>
                                        </Tr>
                                    </>
                                }
                            </Tbody>
                        </Table>
                    </Flex>
                    <Flex align="center">
                        <Divider/>
                        <IconButton 
                            _hover={{bg:"teal.200"}}
                            icon={view === 'show' ? <AiFillCaretUp /> : <AiFillCaretDown />}
                            aria-label={'expandcompresstxnlist'}
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


export default TxnList;