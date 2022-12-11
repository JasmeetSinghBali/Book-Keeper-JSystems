import { Badge, Button, Divider, Flex, Grid, GridItem, Heading, Icon, Link, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import React from 'react';
import { AiFillBug, AiFillInfoCircle, AiOutlineIdcard, AiOutlineUpCircle, AiOutlineWarning, AiTwotoneThunderbolt } from 'react-icons/ai';
import { motion } from 'framer-motion'
import AnimatedCharacter from '../common/animations/animate.character';

const DangerSettings = ({userStoreData}: any) => {
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
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]} />
                        <Icon  display={['none',"flex","flex","flex","flex"]} as={AiOutlineIdcard} fontSize={["xs","sm","sm","md","md"]} mt={[1,1,2,-1,1]}></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.3
                                }
                            },
                        }}>
                            <Heading display={['none',"flex","flex","flex","flex"]} color="purple.700" mt={[1,1,1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Plan and Access Logs</Heading>
                        </motion.div>
                    </Flex>

                    {/*CurrentPlan, IP & Last Accessed date logs Section*/}
                    <Grid
                        h='200px'
                        templateRows='repeat(2, 1fr)'
                        templateColumns={['repeat(2, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']}
                        gap={5}
                        display={['none',"flex","flex","flex","flex"]}
                        >
                        <GridItem boxShadow="xl" borderWidth="thin" rowSpan={2} colSpan={1} bg='gray.200'>
                            <Badge variant="solid" colorScheme="purple">Active Plan</Badge>
                            <Flex
                                display="flex"
                                flexDir="column"
                                mt={4}
                            >
                                {/* 🎈 make TagLabels Dynamic a/c to user info */}
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Plan:     Premium</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Services:     All</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Activated-On:     Apr 12 `2022</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Valid-Until:      Apr 12 `2023</TagLabel>
                                </Tag>
                                
                            </Flex>
                        </GridItem>
                        <GridItem boxShadow="xl" borderWidth="thin" rowSpan={2} colSpan={1} bg='gray.200' >
                            <Badge variant="solid" colorScheme="purple">Access Logs</Badge>
                            <Flex
                                display="flex"
                                flexDir="column"
                                mt={4}
                            >
                                {/* 🎈 make TagLabels Dynamic a/c to user info */}
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>IP Address:     127.0.0.1</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Country:     Mars</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Login-date:     Sept 13 `2022</TagLabel>
                                </Tag>
                                <Tag mb={2} size={["sm","sm","md","md","md"]} key="md" variant='solid' colorScheme='pink'>
                                    <TagLeftIcon as={AiFillInfoCircle} />
                                    <TagLabel>Login-time:      16:48 [IST]</TagLabel>
                                </Tag>   
                            </Flex>
                        </GridItem>
                    </Grid>

                    {/* Update Plan Section*/}
                    <Flex
                        mt={10}
                        mb={10}
                        h={["33%","27%","6%","8%","10%"]}
                        display="flex"
                        flexDir="row"
                    >
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]}/>
                        <Divider orientation="vertical" borderColor="#D53F8C" mt={[1,1,2,-1,1]} />
                        <Icon as={AiOutlineUpCircle} fontSize={["xs","sm","sm","md","md"]} mt={[1,1,2,-1,1]}></Icon>
                        <motion.div initial="hidden" animate="visible" variants={{
                            hidden:{
                                scale: .8,
                                opacity: 0
                            },
                            visible:{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.3
                                }
                            },
                        }}>
                            <Heading color="purple.700" mt={[1,1,1,-1,1]} ml={1.8} letterSpacing="tighter" fontWeight="semibold" fontSize={["2xl","normal","xl","2xl","3xl"]}>Update Plan</Heading>
                        </motion.div>
                        <Link href="http://keeper.updatePlan/paymentGateway" _hover={{textDecor: 'none', color: "pink.500"}} display="flex">
                            <Text fontWeight="thick" letterSpacing="tighter">click here to update/renew your plan -{'>'} <Icon fontSize={["3xl","5xl","4xl","5xl","6xl"]} as={AiTwotoneThunderbolt}></Icon></Text>
                        </Link>
                    </Flex>
                    <Flex
                        display="flex"
                        mt={2}
                    >
                        {/* Report bugs section*/}
                        <motion.button key="deletemyaccount" className="card" whileHover={{
                            position: 'relative',
                            zIndex: 1,
                            background: 'white',
                            scale: [1,1.4,1.2],
                            rotate: [0,10,-10,0],
                            transition: {
                                duration: .2,
                            },
                        }}>
                            <Button
                            //onClick={}
                            _hover={{bg: "goldenrod"}}
                            >
                                <Icon as={AiFillBug} fontSize={["xs","sm","sm","md","md"]} mt={0} mr={2}></Icon>
                                Report A Bug
                            </Button>
                        </motion.button>
                    </Flex>
                    {/* Delete Account Section*/}
                    <Flex
                        mt={30}
                        mb={10}
                        h={["33%","27%","6%","8%","10%"]}
                        display="flex-start"
                        flexDir="column"
                    >
                        <motion.button key="deletemyaccount" className="card" whileHover={{
                            position: 'relative',
                            zIndex: 1,
                            background: 'red',
                            scale: [1,1.4,1.2],
                            filter: [
                                'hue-rotate(0) contrast(100%)'  ,
                                'hue-rotate(360deg) contrast(200%)',
                                'hue-rotate(90deg)contrast(300%)',
                                'hue-rotate(0) contrast(100%)'
                            ],
                            rotate: [0,20,-30,0],
                            transition: {
                                duration: .2,
                            },
                        }}>
                            <Button
                            //onClick={}
                            _hover={{bg: "red"}}
                            >
                                <Icon as={AiOutlineWarning} fontSize={["xs","sm","sm","md","md"]} mt={0} mr={2}></Icon>
                                Delete My Account
                            </Button>
                        </motion.button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default DangerSettings;