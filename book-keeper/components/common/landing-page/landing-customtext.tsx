import React from 'react';

import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../animations/landing_page.animations';


export const LandingCustomTypingText = ({title, textStyles}) => (
    <motion.p
        variants={textContainer}
        className={`font-normal text-[24px] text-gray-300 ${textStyles}`}
    >
        {Array.from(title).map((letter: any,index)=>(
                <motion.span variants={textVariant2} key={index}>
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            )
        )}
    </motion.p >
     
);

export const LandingCustomTitleText = ({title, textStyles}) => (
    <>
        Title text
    </>
);
