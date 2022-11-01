import { motion } from "framer-motion";

interface Props{    
    text: string;
}
export default function AnimatedCharacter({ text}: Props){
    const letters = Array.from(text);

    const container={
        hidden: {opacity: 0},
        visible: (i=1)=>({
            opacity: 1,
            transition: {staggerChildren: 0.2 , delayChildren: 0.04 * i},
        }),
    }

    const child = {
        visible: {
            opacity:1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping:12,
                stiffness:100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 20,
            transition: {
                type: "spring",
                damping:12,
                stiffness:100,
            }
        }
    }
    return(
        
            <motion.div 
                style={
                    {
                        overflow: "hidden",
                        display: "flex"
                    }
                }
                variants={container}
                initial="hidden"
                animate="visible">
                    {
                        letters.map((character: string, index: number) => 
                        <motion.span 
                            variants={child}
                            key={index}>
                                {character === " "?" ":character}
                        </motion.span>)
                    }
            </motion.div>
        
    )
}

