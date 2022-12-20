import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tooltip, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { GrTrash } from "react-icons/gr";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";


const ContactDeleteModal = ({...contactDeleteID}) => {
    // console.log("contact ID to be deleted ========")
    // console.log(contactDeleteID);
    
    const { isOpen, onToggle, onClose } = useDisclosure();    
    const utils = trpcClient.useContext();
    const [mutationProcessFailed,SetMutationProcessFailed] = useState(false);


    const rpcTokenInZustand = useCurrentRpcToken.getState();

    const contactsFreshList: any = trpcClient.user.fetchFreshContactList.useQuery({
        access_token: rpcTokenInZustand.token
    })

    const deleteContactMutation: any = trpcClient.user.deleteUserContact.useMutation();

    /**@desc delete contact by user id, makes trpc server call */
    const handleContactDeletion = async() => {
        
        await deleteContactMutation.mutate(Object.freeze({
            id: contactDeleteID ? contactDeleteID.contactDeleteID.id : 'null',
            access_token: rpcTokenInZustand.token
        }));
        
        if(!deleteContactMutation.data || deleteContactMutation.isError){
            SetMutationProcessFailed(true);
            return;
        }

        SetMutationProcessFailed(false);
        // console.log("Success========");
        // console.log(deleteContactMutation.data);
        return onClose();

    }

    useEffect(()=>{
        //invalidate/refetch query to update contactsFreshList, after contact was deleted
        utils.user.fetchFreshContactList.invalidate({
            access_token: rpcTokenInZustand.token
        });
    },[deleteContactMutation.data])

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
                        <Button variant='outline' onClick={onClose}>Cancel</Button>
                        <Button colorScheme='red' onClick={handleContactDeletion} disabled={deleteContactMutation.isLoading ? true : false}>Yes</Button>
                    </ButtonGroup>
                </PopoverFooter>
                </PopoverContent>
            </Popover> 
        </>
    )
}

export default ContactDeleteModal;