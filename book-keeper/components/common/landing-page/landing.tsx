import React from 'react';
import LandingAbout from './landing-about';
import LandingExplore from './landing-explore';
import LandingFeatures from './landing-features';
import LandingFeedbacks from './landing-feedback';
import LandingGetStarted from './landing-getstarted';
import LandingHero from './landing-hero';
import LandingInsights from './landing-insights';
import LandingMap from './landing-map';
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
                <div className="gradient-04 z-0" />
                <LandingFeatures />
            </div>
            <LandingMap />
            <div className="relative">
                <LandingInsights />
                <div className="gradient-04 z-0" />
                <LandingFeedbacks />
            </div>
        </div>
    )
}

export default Landing;