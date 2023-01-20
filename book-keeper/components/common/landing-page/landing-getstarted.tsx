import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText, StartSteps } from './landing-customs';
import styles from '../../../styles/index';
import { fadeIn, staggerContainer, miscKeeperVariants } from '../animations/landing_page.animations';
import { startingFeatures } from './landing-misc';



const LandingGetStarted = () => (
    <section className={`${styles.paddings} relative z-10`}>
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{once: false,amount: 0.25}}
            className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
        >
            <motion.div
                variants={miscKeeperVariants('left')}
                className={`flex-1 ${styles.flexCenter}`}
            >
                <img
                    src= "/get-started.png"
                    alt="get-started"
                    className="w-[90%] h-[90%] object-contain" 
                />
            </motion.div>
            <motion.div
            variants={fadeIn('left','tween',0.2,1)}
            className="flex-[0.75] flex justify-center flex-col"
            >
                <LandingCustomTypingText title="| How Keeper. Works" textStyles="text-center"/>
                <LandingCustomTitleText title={<>Get Started With Just Few Clicks</>} textStyles="text-center"/>
                <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
                    {startingFeatures.map((feature,index)=>(
                        <StartSteps
                            key={feature}
                            number={index + 1}
                            text={feature} 
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    </section>           
)

export default LandingGetStarted;
