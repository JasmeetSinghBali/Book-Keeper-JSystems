import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/index';
import { navVariants } from '../animations/landing_page.animations';
import { RiBookMarkFill } from 'react-icons/ri';
import { Icon } from '@chakra-ui/react';

const LandingNavbar = () => {
    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            whileInView="show"
            className={`${styles.xPaddings} py-8 relative`}
        >
            <div className="absolute w-[50%] inset-0 gradient-01" />
            <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
            <Icon display={["inline","inline","none","inline","inline"]} as={RiBookMarkFill} fontSize="xl" color="white"></Icon>
                <h2 className="font-extrabold text-[24px] leading-[30px] text-white" >
                    Keeper.
                </h2>
            </div>
            
        </motion.nav>
    )
}

export default LandingNavbar;
