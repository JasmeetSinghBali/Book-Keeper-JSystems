import React from 'react';
import LandingAbout from './landing-about';
import LandingExplore from './landing-explore';
import LandingGetStarted from './landing-getstarted';
import LandingHero from './landing-hero';
import LandingNavbar from './landing-navbar';

const Landing = () => {
    return (
        <div className="bg-black overflow-hidden">
            <LandingNavbar />
            <LandingHero />
            <div className="relative">
                <LandingAbout />
                <div className="gradient-03 z-0" />
                <LandingExplore />
            </div>
            <div className="relative">
                <LandingGetStarted />
                <div className="gradient-03 z-0" />
            </div>
        </div>
    )
}

export default Landing;