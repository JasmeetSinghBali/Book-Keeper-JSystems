import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText } from './landing-customtext';
import styles from '../../../styles/index';
import { fadeIn, staggerContainer } from '../animations/landing_page.animations';


const LandingAbout = () => (
    <section className={`${styles.paddings} relative z-10`}>
        <div className= "gradient-02 z-0" />
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{once:false, amount: 0.25}}
            className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
        >
            <LandingCustomTypingText title="| About Keeper." textStyles="text-center" />
            <motion.p
                variants={fadeIn('up','tween',0.2,1)}
                className="mt-[8px] font-normal sm:text-[20px] text-[20px] text-center text-gray-300 tracking-tightest hover:tracking-widest"
            >
                <span className="font-bold text-white italic">Keeper. is a MIT LICENSED [only applicable to unpaid version/package]</span> utility based tool with motto  
                <span className="font-bold text-white italic">"individual/business book-keeping related compliance and engagements made simpler",</span> In addition to that it has 
                <span className="font-bold text-white italic"> dual nature/usecase package support unpaid i.e community and paid i.e premium respectively, </span>
                the tool is exposed to unpaid audience under MIT LICENSE guidelines while the paid version will be exposed to audience under proprietary software
                while the specifics and details governing the paid package version is yet to be decided in future & is uncertain presently, 
                The project origins intially founded & developed by 
                <span className="font-extrabold text-white"> Jasmeet Singh Bali tagged with JSystems [JSYS.] </span>
                you can <span className="font-extrabold text-white italic">explore</span> further by scrolling down     
            </motion.p>
            <motion.img
                variants={fadeIn('up', 'tween', 0.3, 1)}
                src="/arrow-down.svg"
                alt="arrow-down"
                className="w-[18px] h-[28px] object -contain mt-[28px]"
            />
        </motion.div>
    </section>           
)

export default LandingAbout;
