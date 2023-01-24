import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText } from './landing-customs';
import styles from '../../../styles/index';
import { fadeIn, staggerContainer } from '../animations/landing_page.animations';


const LandingMap = () => (
    <section className={`${styles.paddings} relative z-10`}>
        <motion.div 
            variants={staggerContainer as any}
            initial="hidden"
            whileInView="show"
            viewport={ {once: false,amount: 0.25} }
            className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
         <LandingCustomTypingText title="| Premium Feature " textStyles="text-center" />
         <LandingCustomTitleText title={<>Paid only Keeper. app users can add contacts and dispatch funds to them within or across countries & continents</>} textStyles="text-center" />
         <motion.div variants={fadeIn('up','tween',0.3,1)}
            className="relative mt-[68px] flex w-full h0[550px]"
         >
            <img
                src="/map.png"
                alt="landing-map"
                className="w-full h-full object-cover" 
            />
            {/* Australian man bottom right */}
            <div className="absolute bottom-10 right-10 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
                <img
                src="/people-01.png"
                alt="dummy-people-icon"
                className="w-full h-full"
                />
            </div>
            {/* Lady from India(Punjab) Asia center-east*/}
            <div className="absolute top-10 right-60 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
                <img
                src="/people-02.png"
                alt="dummy-people-icon"
                className="w-full h-full"
                />
            </div>
            {/* Canadian guy top left*/}
            <div className="absolute top-2 left-2 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
                <img
                src="/people-03.png"
                alt="dummy-people-icon"
                className="w-full h-full"
                />
            </div>
            <div className="absolute top-3 left-20 w-[100px] h-[60px] p-[6px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <img
                src="/map-card-01.png"
                alt="dummy-people-card-icon"
                className="w-full h-full"
                />
            </div>
            <div className="absolute bottom-10 right-28 w-[100px] h-[60px] p-[6px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <img
                src="/map-card-02.png"
                alt="dummy-people-card-icon"
                className="w-full h-full"
                />
            </div>
            <div className="absolute top-20 right-60 w-[100px] h-[60px] p-[6px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <img
                src="/map-card-03.png"
                alt="dummy-people-card-icon"
                className="w-full h-full"
                />
            </div>
         </motion.div>   
        </motion.div>
    </section>           
)

export default LandingMap;
