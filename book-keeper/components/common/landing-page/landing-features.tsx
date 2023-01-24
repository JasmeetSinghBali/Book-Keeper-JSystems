import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText, NewFeatures } from './landing-customs';
import styles from '../../../styles/index';
import { fadeIn, staggerContainer, miscKeeperVariants } from '../animations/landing_page.animations';
import { newFeatures } from './landing-misc';

const LandingFeatures = () => (
    <section className={`${styles.paddings} relative z-10`}>
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{once:'false',amount: 0.25}}
            className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
        >
            <motion.div
            variants={fadeIn('right','tween',0.2,1)}
            className="flex-[0.75] flex justify-center flex-col"
            >
                <LandingCustomTypingText title="| What's New?" textStyles="text-center"/>
                <LandingCustomTitleText title={<>What&apos;s New About Keeper.?</>} textStyles="text-center"/>
                <div className="mt-[418px] flex flex-wrap justify-between gap-[24px]">
                    {newFeatures.map((feature)=>(
                        <NewFeatures
                            key={feature.title}
                            {...feature}
                        />
                    ))}
                </div>
            </motion.div>
            <motion.div
                variants={miscKeeperVariants('right')}
                className={`flex-1 ${styles.flexCenter}`}
            >
                <img
                    src= "/whats-new.png"
                    alt="get-started"
                    className="w-[90%] h-[90%] object-contain" 
                />
            </motion.div>
        </motion.div>
    </section>           
)

export default LandingFeatures;
