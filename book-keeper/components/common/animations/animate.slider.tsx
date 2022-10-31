import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Flex } from "@chakra-ui/react";

interface Props{    
    data: Array<{
        title: string,
        body: any
    }>;
}

export default function AnimatedSlider({ data }: Props){
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });
    return(
        <Flex 
            className="app-level-slider"
            flexDir="row"
            backgroundColor="#E2E8F0"
        >
            <svg id="progress" width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                cx="50"
                cy="50"
                r="30"
                pathLength="1"
                className="indicator"
                style={{ pathLength: scrollXProgress }}
                />
            </svg>
            <ul ref={ref}>
                {
                    data.map((elem: any)=>
                        
                        <li>{elem.title}</li>
                    
                    )
                }
            </ul>
        </Flex>
    )
}

