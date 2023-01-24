import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText, InsightCard } from './landing-customs';
import styles from '../../../styles/index';
import { staggerContainer } from '../animations/landing_page.animations';
import { insightsList } from './landing-misc';


const LandingInsights = () => (
    <section className={`${styles.paddings} relative z-10`}>
        <motion.div 
            variants={staggerContainer as any}
            initial="hidden"
            whileInView="show"
            viewport={ {once: false,amount: 0.25} }
            className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
            <LandingCustomTypingText title="| Insight" textStyles="text-center" />
            <LandingCustomTitleText title="Insight about Keeper." textStyles="text-center" />
            <div className="mt-[50px] flex flex-col gap-[30px]">
                {
                    insightsList.map((insight,index)=>(
                        <InsightCard key={`insight-${index}`} {...insight} index={index+1}/>
                    ))
                }
            </div>
        </motion.div>
    </section>           
)

export default LandingInsights;
