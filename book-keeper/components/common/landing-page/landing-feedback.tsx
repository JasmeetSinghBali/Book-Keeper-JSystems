import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText } from './landing-customs';
import styles from '../../../styles/index';
import { fadeIn, staggerContainer,zoomIn } from '../animations/landing_page.animations';
import Image from 'next/image';


const LandingFeedbacks = () => (
    <section className={`${styles.paddings} relative z-10`}>
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={ {once: false,amount: 0.25} }
            className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-6`}
        >
            <motion.div variants={fadeIn('right','tween',0.2,1)} className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6a6a6a] relative">
                <div className="feedback-gradient"/>
                <div>
                    <h4 className="font-bold sm:text-[32px] text-[28px] sm:leading-[40px] leading-[36px] text-white">
                        Jasmeet Bali
                    </h4>
                    <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                        Founder | Keeper. and JSystems
                    </p>
                </div> 
                <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                &quot;With the uncertainity of future and what it awaits, be it good or bad depending on individual&apos;s perception,
                     A need always arise&apos;s to take charge of your finances be it individual or business oriented....
                     Keeper. is developed with the same motto aligned.&quot;
                </p>
            </motion.div>
            <motion.div variants={fadeIn('left','tween',0.2,1)} className="relative flex-1 flex justify-center items-center">
                <Image
                    src="/founder.jpg"
                    alt="Jasmeet Bali"
                    className="w-full lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]"
                />
                <motion.div variants={zoomIn(0.3,1)} className="lg:block sm:hidden absolute -left-[8%] top-[25%]">
                    <Image src="/flowto.png" alt="zoominAction" className="w-[155px] h-[155px] object-contain"/>
                </motion.div>
            </motion.div>
        </motion.div>
    </section>           
)

export default LandingFeedbacks;
