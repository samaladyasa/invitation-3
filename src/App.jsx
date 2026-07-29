import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OpeningAnimation } from './components/OpeningAnimation.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { ScratchCardSection } from './components/ScratchCardSection.jsx';
import { CountdownSection } from './components/CountdownSection.jsx';
import { StorySection } from './components/StorySection.jsx';
import { GallerySection } from './components/GallerySection.jsx';
import { EventsSection } from './components/EventsSection.jsx';
import { VenueSection } from './components/VenueSection.jsx';
import { EndingSection } from './components/EndingSection.jsx';
import { JasminePetalCursor } from './components/JasminePetalCursor.jsx';
import { JasminePetalRain } from './components/JasminePetalRain.jsx';
import { MountainsDivider } from './components/MountainsDivider.jsx';
// Components now import data.json directly; no central `types.js` needed.
gsap.registerPlugin(ScrollTrigger);
export default function App() {
    const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);
    const scrollToHero = () => {
        const heroElement = document.getElementById('hero');
        if (heroElement) {
            heroElement.scrollIntoView({ block: 'start', behavior: 'auto' });
            window.history.replaceState(null, '', '#hero');
        }
    };
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenis.on('scroll', ScrollTrigger.update);
        const updateLenis = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);
        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        };
    }, []);
    useEffect(() => {
        const fallback = document.getElementById('opening-animation-fallback');
        if (fallback) {
            fallback.remove();
        }
        const ctx = gsap.context(() => {
            const revealElements = document.querySelectorAll('.gsap-reveal');
            revealElements.forEach((el) => {
                gsap.fromTo(el, { opacity: 0, y: 24 }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        once: true,
                    },
                });
            });
        });
        return () => ctx.revert();
    }, []);
    return (<div className={`min-h-screen text-[#2E3A2D] font-sans antialiased overflow-x-hidden selection:bg-[#8FAD88]/30 selection:text-[#344832] ${showOpeningAnimation ? 'bg-black' : 'bg-[#FAF7F2]'}`}>
        {showOpeningAnimation ? (<OpeningAnimation onComplete={() => {
            setShowOpeningAnimation(false);
            scrollToHero();
        }} />) : (<>
            <JasminePetalRain />
            <JasminePetalCursor />

            <main className="w-full">
                <HeroSection />
                <ScratchCardSection />
                <CountdownSection />

                <div className="bg-[#FAF7F2] -mb-1 relative z-10"><MountainsDivider fill="#F5E7D9" /></div>
                <StorySection />

                <div className="bg-[#F5E7D9] -mb-1 relative z-10"><MountainsDivider fill="#FAF7F2" /></div>
                <GallerySection />

                <div className="bg-[#FAF7F2] -mb-1 relative z-10"><MountainsDivider fill="#F3E7D8" /></div>
                <EventsSection />

                <div className="bg-[#F3E7D8] -mb-1 relative z-10"><MountainsDivider fill="#EAF2E8" /></div>
                <VenueSection />
                <EndingSection />
            </main>
        </>)}
    </div>);
}
