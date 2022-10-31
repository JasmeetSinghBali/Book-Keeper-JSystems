import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import AnimatedCharacter from "../common/animations/animate.character";
import AnimatedSlider from "../common/animations/animate.slider";
import AnimatedWords from "../common/animations/animate.words";

const data=[
    {
        title: "Designs",
        body: "yo",
    },
    {
        title: "Dependencies",
        body: "ssa",
    },
    {
        title: "Frontend",
        body: "aaaa",
    },
    {
        title: "Backend",
        body: "aaaa",
    },
]
const data2=[
    {
        title: "Creds:",
        body: "yo",
    },
    {
        title: "Resources:",
        body: "ssa",
    },
    {
        title: "Devs:",
        body: "aaaa",
    },
    {
        title: "Devs:",
        body: "aaaa",
    },
]


export default function AnimatedCredits(){
    return (
        <>
            {/*Credits Section*/}
            <Flex
                w="90%"
                h="100%"
                flexDir="column"
                overflow="auto"
                // p={50}
                display="flex-start"
                backgroundColor="#E2E8F0"
            >
                <Flex
                    flexDir="row"
                    justifyContent="center"
                    h="20%"
                    w="100%"
                    p={10}
                    mb={1}
                    backgroundColor="#E2E8F0"
                    color="#fff"
                >
                    <Flex
                        flexDir="column"
                    >
                        <Flex
                            flexDir="row"
                            ml={1}
                            
                        >
                            <AnimatedCharacter text='⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐'/>
                        </Flex>
                        <Heading  color="#322659" fontSize="3rem" letterSpacing="widest">
                        <AnimatedWords text="Dev. Credits"  /> 
                        </Heading>
                        <Flex
                            flexDir="row"
                            ml={1}
                        >
                            <AnimatedCharacter text='⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐'/>
                        </Flex>
                    </Flex>
                </Flex>
                <Skeleton mt={10} startColor='purple.600' endColor='goldenrod' height='20px' />
                <Flex
                    display="flex"
                    flexDir="column"
                    height="50%"
                >
                    <AnimatedSlider data={data} />
                </Flex>
            </Flex>
        </>
    )
}
