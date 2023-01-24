import React from 'react';

import { motion } from 'framer-motion';
import { fadeIn, textContainer, textVariant2 } from '../animations/landing_page.animations';
import styles from '../../../styles';
import { Icon } from '@chakra-ui/react';
import { FcAbout } from 'react-icons/fc';
import { FiMousePointer } from 'react-icons/fi';


export const LandingCustomTypingText = ({title, textStyles}: any) => (
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

export const LandingCustomTitleText = ({title, textStyles}: any) => (
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

export const StartSteps = ({number,text}: any) => (
    <div className={`${styles.flexCenter} flex-row`}>
        <div className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323f5d]`}>
            <p className="font-bold text-[20px] text-white">0{number}</p>
        </div>
        <p className="flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32px]">
            {text}
        </p>
    </div>
)

export const NewFeatures = ({imgUrl, title, subtitle}: any) => (
    <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
        <div className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323f5d]`}>
            <img
                src={imgUrl}
                alt="feature-icon"
                className="w-1/3 h-1/3 object-contain"
             />
        </div>        
        <h1 className="mt-[26px] font-bold text-[24px] leading-[3opx] text-white">{title}</h1>
        <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#b0b0b0] leading-[32px]">{subtitle}</p>
    </div>
)

export const InsightCard = ({imgUrl, title, subtitle, index }: any) => (
    <motion.div variants={fadeIn('up','spring', index*0.5 , 1 )} className="flex md:flex-row flex-col gap-4">
        <img src={imgUrl} alt="insights" className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover" />
        <div className="w-full flex justify-between items-center">
            <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <h4 className="font-normal lg:text-[42px] text-[26px] text-white">{title}</h4>
                <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-slate-300">{subtitle}</p>
            </div>            
        </div>
    </motion.div>   
)