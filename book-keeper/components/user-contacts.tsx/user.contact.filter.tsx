import { IconButton , Tooltip} from "@chakra-ui/react";
import { BsLayoutWtf } from "react-icons/bs";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";


const ContactListFilter = () => {
    
    const rpcTokenInZustand = useCurrentRpcToken.getState();

    const contactsFreshList: any = trpcClient.user.fetchFreshContactList.useQuery({
        access_token: rpcTokenInZustand.token
    })

    const utils = trpcClient.useContext();
    const resetContactList = async() => {
        await utils.user.fetchFreshContactList.invalidate({
            access_token: rpcTokenInZustand.token
        });
        return; 
    }
    
    return(
        <>
            {/**Contact List reset , refetch/invalidate full contact list */}
            <Tooltip hasArrow label='fetch all contacts' bg='#fff' color='black' placement="top">
                <IconButton
                    _hover={{bg:"#FBB6CE"}}
                    icon={<BsLayoutWtf />}
                    aria-label={'ResetContactsList'}
                    onClick={resetContactList}
                    ml={2}
                    mb={4}
                    bgColor="gray.200"
                >    
                </IconButton>
            </Tooltip>
        </>
    )
}

export default ContactListFilter;