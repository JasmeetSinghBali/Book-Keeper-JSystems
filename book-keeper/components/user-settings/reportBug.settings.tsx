import { Button, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure, chakra } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillBug } from "react-icons/ai";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";

/**@desc report bug via in-app email UI interface Modal */
const ReportBugSettings = () => {

    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const [ bugComplaint, SetBugComplaint] = useState('');

    const rpcTokenInZustand =  useCurrentRpcToken.getState();
    const submitBugReportMutation: any = trpcClient.user.sendBugReport.useMutation();

    const handleBugComplaintInput = async(e: any) =>{
        let inpVal = e.target.value;
        SetBugComplaint(inpVal);
        return;
    }

    /**
     * @desc calls mutation to send complain to server which when dispatches email to the dev/support team */
    const handleBugComplainSubmission = async (e: any)=>{
        e.preventDefault();
        
        await submitBugReportMutation.mutate({
            access_token: rpcTokenInZustand.token,
            bug_report: bugComplaint
        });
        
        if(submitBugReportMutation.isError || !submitBugReportMutation.data){
            console.log("failed to submit bug report!!");
            return;
        }
        onClose();
        return;
    }
    
    return (
        <>
            <Button
            onClick={()=>{ SetBugComplaint(''); onOpen();}}
            _hover={{bg: "goldenrod"}}
            >
                <Icon as={AiFillBug} fontSize={["xs","sm","sm","md","md"]} mt={0} mr={2}></Icon>
                Report A Bug
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />            
                <ModalContent>
                <ModalHeader>Submit Bug Report</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <chakra.form onSubmit={handleBugComplainSubmission}>
                        <Textarea
                            value={bugComplaint}
                            onChange={handleBugComplaintInput}
                            placeholder='Describe the bug in your words!'
                            size='sm' 
                        />
                        <Button disabled={submitBugReportMutation.isLoading ? true : false} type="submit" _hover={{bg: "red"}} mt={2} >Submit</Button>
                    </chakra.form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default ReportBugSettings;