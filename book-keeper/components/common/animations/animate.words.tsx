import { motion } from "framer-motion";

interface Props{    
    text: string;
}
export default function AnimatedWords({ text}: Props){
    const words = text?.split(" ");

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
            y:0,
            x: 0,
            transition: {
                type: "spring",
                damping:12,
                stiffness:100,
            },
        },
        hidden: {
            opacity: 0,
            y: 100,
            x: 50,
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
                        words.map((word: string, index: number) => 
                        <motion.span 
                            variants={child}
                            key={index}>
                                {word}
                        </motion.span>)
                    }
            </motion.div>
        
    )
}

