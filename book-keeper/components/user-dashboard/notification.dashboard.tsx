import React,{ useState } from 'react';
import { 
    Flex,
    IconButton,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    FormLabel,
    DrawerFooter,
    List,
    ListItem,
    ListIcon,
    Drawer,
} from "@chakra-ui/react";
import {
    AiOutlineBell,
} from 'react-icons/ai';
import {
    FcInfo
} from 'react-icons/fc';
const NotificationSection = () => {
    const [card,selectCard] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <IconButton
                onClick={onOpen} 
                icon={<AiOutlineBell />}
                fontSize="md"
                bgColor="#fff"
                borderRadius="50%"
                p="10px"
                aria-label={'Notifications'} 
                _hover={{bg:"teal.200"}}
            />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>
                    Notifications
                </DrawerHeader>

                <DrawerBody>
                    <Box>
                        <List spacing={3}>
                            <ListItem>
                            <ListIcon as={FcInfo} color='teal.300' />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                            </ListItem>
                            <ListItem>
                            <ListIcon as={FcInfo} color='teal.300' />
                            Assumenda, quia temporibus eveniet a libero incidunt suscipit
                            </ListItem>
                            <ListItem>
                            <ListIcon as={FcInfo} color='teal.300' />
                            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                            </ListItem>
                            {/* You can also use custom icons from react-icons */}
                            <ListItem>
                            <ListIcon as={FcInfo} color='teal.300' />
                            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                            </ListItem>
                        </List>
                    </Box>
                </DrawerBody>

                <DrawerFooter borderTopWidth='1px'>    
                    <Button colorScheme="teal" variant='outline' mr={3} onClick={onClose} _hover={{bg:"teal.300"}}>
                        Close
                    </Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {/*🎈 make this notification count dynamic fetch data from db or redis to tackle this */}
            <Flex
                w={30}
                h={25}
                bgColor="#4FD1C5"
                borderRadius="50%"
                color="#fff"
                align="center"
                justify="center"
                ml="-3"
                mt="-2"
                zIndex="100"
                fontSize="xs"
            >
                2
            </Flex>
        </>
    )
}
export default NotificationSection;