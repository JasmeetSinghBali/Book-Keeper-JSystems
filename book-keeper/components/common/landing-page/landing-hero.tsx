import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/index';
import { navVariants } from '../animations/landing_page.animations';
import { RiBookMarkFill } from 'react-icons/ri';
import { Icon } from '@chakra-ui/react';
import { FcLink } from 'react-icons/fc';
import { AiOutlineLink } from 'react-icons/ai';
import { slideIn, staggerContainer, textVariant } from '../animations/landing_page.animations';

const LandingHero = () => (        
        <section className={`${styles.yPaddings} sm:pl-3 pl-6`}>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{once: false, amount: 0.25}}
                className={`${styles.innerWidth} mx-auto flex flex-col`}
            >
                <div className="flex justify-center items-center flex-col relative  z-10">
                    <motion.h1 className="font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white" variants={textVariant(1.2)}>
                        KEEPER.
                    </motion.h1>
                    <motion.div
                        variants={textVariant(1.4)}
                        className="flex flex-row justify-center items-center"
                    >
                        <div className="md:w-[80px] sm:w-[45px] w-[20px] md:h-[88px] sm:h-[45px] h-[38px] md:border-[12px] border-[9px] rotate-45 hover:skew-y-12 border-yellow-400 sm:mx-4 mx-[6px] space-x-0.5 " />
                        <h1 className="font-thin lg:text-[100px] md:text-[70px] sm:text-[35px] text-[34px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] leading-[64.4px] uppercase text-white">
                           JSys.
                        </h1>
                    </motion.div>
                </div>
                <motion.div
                    variants={slideIn('left','tween', 0.3,0.9)}
                    className="relative w-full md:-mt-[20px] -mt-[12px]"
                >
                    <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />
                    <img
                        src="/keepercover.png"
                        alt="keeper-cover"
                        className="w-full smh-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative" 
                    />
                    <a href="#explore">
                        <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10">
                            <img
                                src="/flowto.png"
                                alt="explore"
                                className="sm:w-[150px] w-[100px] sm:h-[155px] h-[100px] object-contain"
                            />
                        </div>
                    </a>
                </motion.div>
            </motion.div>
        </section>   
)

export default LandingHero;
