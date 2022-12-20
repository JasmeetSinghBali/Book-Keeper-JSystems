import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tooltip, useDisclosure } from "@chakra-ui/react";

import { GrTrash } from "react-icons/gr";


const ContactDeleteModal = ({...contactDeleteID}) => {
    const { isOpen, onToggle, onClose } = useDisclosure();    
    console.log("contact ID to be deleted ========")
    console.log(contactDeleteID);
    return(
        <>
            {/**Contact List Filter On Basis of Email, Phone, Card Number */}
            <Tooltip hasArrow label='Remove Contact' bg='#fff' color='black' placement="top">
                <IconButton
                    _hover={{bg:"#FC8181"}}
                    icon={<GrTrash />}
                    aria-label={'removeContact'}
                    onClick={onToggle}
                    ml={2}
                    mb={4}
                    bgColor="gray.200"
                ></IconButton>
            </Tooltip>
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}
                placement='right'
                closeOnBlur={false}
            >
                <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    Are you sure you want to continue with your action?
                </PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end'>
                    <ButtonGroup size='sm'>
                        <Button variant='outline'>Cancel</Button>
                        <Button colorScheme='red'>Yes</Button>
                    </ButtonGroup>
                </PopoverFooter>
                </PopoverContent>
            </Popover> 
        </>
    )
}

export default ContactDeleteModal;