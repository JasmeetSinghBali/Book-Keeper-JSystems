import React from 'react';

import { motion } from 'framer-motion';
import { fadeIn, textContainer, textVariant2 } from '../animations/landing_page.animations';
import styles from '../../../styles';
import { Icon } from '@chakra-ui/react';
import { FcAbout } from 'react-icons/fc';
import { FiMousePointer } from 'react-icons/fi';


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
    <motion.h2 variants={textVariant2} initial="hidden" whileInView="show" className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}>
        {title}
    </motion.h2>
);


export const LandingCustomExploreCard = ({ id ,imgUrl,title,index,active, handleClick } : any) => (
    <motion.div
        variants={fadeIn('right', 'spring', index * 0.5, 0.75 )}
        className={`relative ${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'} flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
        onClick={()=>handleClick(id)}
    >
        <img src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover rounded-[34px]" 
        />
        {
            active !== id ? (
                <h3 className="font-semibold sm:text-[26px] text-[18px] text-slate-700 absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
                    {id}
                </h3>
            ) :
            (
                <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.3)] rounded-b-[24px]">
                    <div className={`${styles.flexCenter} w-[25px] h-[25px] rounded-[14px] glassmorphism mb-[16px]`}>
                        <Icon display={"inline"} as={FiMousePointer} fontSize="sm" />
                    </div>
                    <p className="font-hairline text-[16px] leading-[20px] text-white ">
                        Screen selected
                    </p>
                    <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
                        {id}
                    </h2>
                </div>
            )
        }
    </motion.div>
);
