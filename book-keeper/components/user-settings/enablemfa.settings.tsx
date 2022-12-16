import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Stack, useDisclosure, chakra, Tooltip, Flex, HStack, PinInput, PinInputField, Alert, AlertIcon, Image, Center, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from 'react';
import { AiFillEdit, AiOutlineSync } from "react-icons/ai";
import validator from "validator";
import { useCurrentUserInfo } from "../../store/current-user-info.store";
import { useCurrentRpcToken } from "../../store/rpc-token-store";
import { trpcClient } from "../../utils/Clientrpc";

const EnableAccountMfaModal = () => {

    const { push, pathname } = useRouter();
    const { data: session, status } = useSession();
    const userEmail = session?.user?.email;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mfaCode, SetMfaCode] = useState('null');
    const [removeError, SetRemoveError] = useState(true);
    const [removeValidationError, SetRemoveValidationError] = useState(true);

    const rpcTokenInZustand = useCurrentRpcToken.getState();
    const currentUserZustand: any = useCurrentUserInfo.getState();

    const fetchQrCodeMutation: any = trpcClient.user.generateQrForMfa.useMutation();
    const trackedMutationProcedure: any = trpcClient.user.enableAccountMfa.useMutation();

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    // 🎈 👇 under constructions
    // adjusts mfaCode value & make enableAccountMfa request to trpc server
    const handleAccountMfa = async (e: any): Promise<any> => {

        e.preventDefault();
        console.log(mfaCode);
        console.log("sorted");

        if (mfaCode === 'null' || mfaCode.length !== 6) {
            SetRemoveValidationError(false);
            return;
        }

        if (mfaCode !== 'null' || mfaCode.length === 6) {
            SetRemoveValidationError(true);
        }
        return;

        // // 🎈 make request to validate mfa code
        // await trackedMutationProcedure.mutate({email: userEmail,mfaCode: mfaCode, access_token: rpcTokenInZustand.token});   


        // if(trackedMutationProcedure.isError){
        //     SetRemoveError(false);
        //     return;
        // }
        // SetRemoveError(true);
        // SetRemoveValidationError(true);
        // return;
    }

    /**
     * @desc handles the opening of qr code modal and fetches qr code 
     * */
    const handleOpenAuthMfa = async () => {
        onOpen();
        await fetchQrCodeMutation.mutate({ email: userEmail, access_token: rpcTokenInZustand.token });
        return;
    }

    // 🎈 👇 uncomment this use Effect after done with enable mfa settings
    // useEffect(()=>{
    //     if(session?.user?.email !== currentUserZustand.user.email){
    //         push('/user/dashboard');
    //         return;
    //     }
    //     return;
    // },[])

    // 🎈 👇 uncomment this use effect after done with enable mfa settings
    // useEffect(()=>{
    //     if(!fetchQrCodeMutation.data || fetchQrCodeMutation.isError){
    //         push('/user/dashboard');
    //     }
    // },[fetchQrCodeMutation.data])

    useEffect(() => {
        if (trackedMutationProcedure.data) {
            // console.log("User was updated and trpc server responded with this=======");
            // console.log(trackedMutationProcedure.data);
            // update the zustand store with updated user data
            useCurrentUserInfo.setState(trackedMutationProcedure.data.data);
            push('/user/dashboard');
        }
    }, [trackedMutationProcedure.data])

    return (

        <>
            <Tooltip label='Android: Microsoft Authenticator | Google Authenticator, IOS: Authy' hasArrow arrowSize={15} closeDelay={500} placement="right">
                <IconButton
                    onClick={handleOpenAuthMfa}
                    onMouseEnter={() => { SetMfaCode('null'); }}
                    icon={<AiFillEdit />}
                    fontSize="xs"
                    bgColor="gray.200"
                    borderRadius="100%"
                    aria-label={'EnableAccountMfa'}
                    _hover={{ bg: "pink.200" }}
                />
            </Tooltip>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size={["sm", "md", "lg", "lg", "xl"]}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Enable's your account's MFA
                    </ModalHeader>
                    <ModalCloseButton />

                    <chakra.form onSubmit={handleAccountMfa}>
                        <ModalBody pb={2}>
                            <Stack mt={2} ml={300} mb={2} direction='column'>
                                <Image
                                    boxSize='150px'
                                    objectFit='cover'
                                    src={fetchQrCodeMutation.data && fetchQrCodeMutation?.data?.data?.show_url}
                                    fallbackSrc='https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png'
                                    align="right bottom" />
                            </Stack>
                            <Accordion allowToggle mb={2} display={!fetchQrCodeMutation.data ? 'none' : 'flex' }>
                                <AccordionItem>
                                    <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            Instructions
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        1. Open your authenticator app like Google Authenticator, Microsoft Authenticator etc...
                                        <br /> 
                                        2. Create an mfa account via scanning the QR code that you see above
                                        <br />
                                        3. enter the 6 digit code that is regenerating, keeping the time constraint in notice enter the 6 digit pin in the below pin space provided
                                        <br />
                                        <br />
                                        Please contact support/dev jasmeetbali.dev.2021@gmail.com if you are unable to enable mfa for your account. 
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            
                            <FormControl>

                                <HStack ml={150}>
                                    <PinInput mask onComplete={(value: string) => SetMfaCode(value)} onChange={(value: string) => { if (value.length !== 6) { SetRemoveValidationError(false) } }}>
                                        <PinInputField onClick={(_e: any) => { if (!removeError) { SetRemoveError(true) } if (!removeValidationError) { SetRemoveValidationError(true) } }} />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>

                            </FormControl>
                            <Stack mt={2} direction = 'column'>
                                <Alert display={fetchQrCodeMutation.isError || trackedMutationProcedure.isError || !removeError ? 'flex' : 'none'} status='error'><AlertIcon />Failed to enable mfa, code verification failed! </Alert>
                                <Alert display={!removeValidationError ? 'flex' : 'none'} status='error'><AlertIcon />Validation failed, make sure you enter 6 digit generated mfa code in your authenticator app! </Alert>
                                <Alert display={!fetchQrCodeMutation.data ? 'flex' : 'none'} status='warning'><AlertIcon />Loading qr code generation...  if it fails to generate qr code  please refresh the page & try again or contact support if issue persists.</Alert>
                            </Stack>

                        </ModalBody>

                        <ModalFooter>
                            <Button
                                _hover={{ bg: "teal.400" }}
                                bgColor="blackAlpha.900"
                                color="#fff"
                                mr={3}
                                type="submit"
                                disabled={trackedMutationProcedure.isLoading ? true : false}
                            >
                                Enable MFA
                            </Button>
                            <Button onClick={onClose} _hover={{ bg: "red.300" }}>Cancel</Button>   
                        </ModalFooter>

                    </chakra.form>

                </ModalContent>
            </Modal>
        </>
    )
}

export default EnableAccountMfaModal;