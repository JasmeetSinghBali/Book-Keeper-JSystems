import React from 'react';

import { motion } from 'framer-motion';
import { LandingCustomTitleText, LandingCustomTypingText } from './landing-customs';
import styles from '../../../styles/index';
import { footerVariants } from '../animations/landing_page.animations';
import { socialsList } from './landing-misc';
import Link from 'next/link';


const LandingFooter = () => (
        <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-8 relative`}
        >
            <div className="footer-gradient"/>
            <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
                <div className="flex items-center justify-between flex-wrap gap-5">
                    <h4 className="font-bold md:text-[64px] text-[44px] text-white">
                        Sign Up Today & Try Keeper.
                    </h4>
                    <Link key="placeholder-dummy-1" href="/user/login">
                        <button type="button" className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]">
                            <img  src="/tryoutkeeper.svg" alt="trykeeper" className="w-[24px] h-[24px] object-contain" />
                            <span className="font-normal text-[16px] text-white">Try Keeper.</span>
                        </button>
                    </Link>
                    
                </div>
                <div className="flex flex-col">
                    <div className="mb-[50px] h-[2px] bg-white opacity-10" />

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h4 className="font-extrabold text-[24px] text-white">
                            KEEPER.
                        </h4>
                        <p className="font-normal text-[14px] text-white opacity-50">
                            Copyright © 2022 - {new Date().getFullYear()} Keeper. All rights reserved.
                        </p>

                        <div className="flex gap-4">
                            {socialsList.map((social) => (
                                <a key={social.name} href="https://github.com/Jasmeet-1998/Book-Keeper-JSystems" target="_blank" rel="noreferrer">
                                    <img
                                        key={social.name}
                                        src={social.imgUrl}
                                        alt={social.name}
                                        className="w-[24px] h-[24px] object-contain cursor-pointer"
                                    />
                                    
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>    
        </motion.footer>               
)

export default LandingFooter;
