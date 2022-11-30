import { Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const CheckEmail: NextPage = () => {
    return(
        <>
            <Flex flexDir="column" h={"100vh"} bgGradient='linear(to-r, red.50, blue.50, green.50,yellow.50)' >
                <Heading fontSize="lg" fontWeight="extrabold"> Check Your Email !! </Heading>
                <br/>
                <Text fontWeight="bold" fontSize="md">A magic email-link was sent to your email.  </Text>
                <Text fontWeight="bold" fontSize="sm">If you dont find the email at inbox check your spam section. </Text>
                <br/>
                <Text fontWeight="semibold" fontSize="sm"> Click on that link to Sign In...</Text>
            </Flex>
        </>
    )
}


export default CheckEmail;