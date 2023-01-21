import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { LandingCustomExploreCard, LandingCustomTitleText, LandingCustomTypingText } from './landing-customs';
import styles from '../../../styles/index';
import { fadeIn, staggerContainer } from '../animations/landing_page.animations';
import { exploreKeeperPreviews } from './landing-misc';


const LandingExplore = () => {
    const [active, setActive] = useState('02');
    return (
        <section className={`sm:p-20 xs:p-10 px-8 py-14`}
        id="explore"
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{once:false,amount:0.25}}
                className={`${styles.innerWidth} mx-auto flex flex-col`}
            >
                <LandingCustomTypingText title="| Keeper. Preview" textStyles="text-center"/>
                <LandingCustomTitleText title={<>Choose The Screen To Expand <br className="md:block hidden" /> The Preview</>} textStyles="text-center" />
                <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
                    {
                        exploreKeeperPreviews.map((preview: any,index: any)=>(
                            <LandingCustomExploreCard 
                                key={preview.id}
                                {...preview}
                                index={index}
                                active={active}
                                handleClick={setActive}
                            />
                        ))
                    }
                </div>
            </motion.div>
        </section>
    )

}
               


export default LandingExplore;
