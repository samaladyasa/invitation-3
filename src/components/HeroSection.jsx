import { useEffect, useRef, useState } from 'react';
import DATA from '../../data.json';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const HeroSection = () => {
  const data = DATA.wedding || {};
    const sectionRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setIsReady(true));
        return () => window.cancelAnimationFrame(frame);
    }, []);
    useEffect(() => {
        const section = sectionRef.current;
        if (!section)
            return;
        const ctx = gsap.context(() => {
            gsap.set('.hero-text-names', {
                y: 0,
                opacity: 1,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (<section id="hero" ref={sectionRef} className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 py-12 sm:py-20 overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video src="https://res.cloudinary.com/xzimezus/video/upload/v1785108914/TensorPix_-_Boat_gliding_upward_revealing_pond_202607270413_online-video-cutter_zxttkr.mp4" autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover sm:object-cover" style={{ display: 'block', minWidth: '100%', minHeight: '100%', objectPosition: 'right center' }}/>
        
        
      </div>

      

      <div className="w-full max-w-2xl mx-auto my-auto flex flex-col items-center justify-center pt-8 z-30 relative">
        <div className="relative w-full p-6 sm:p-10">
          <div className={`mb-4 sm:mb-6 transition-all duration-700 ease-out ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
            <span className="inline-block px-5 py-1.5 rounded-full bg-[#E6EFE3] border border-[#C2D3BE] text-black font-marcellus text-sm sm:text-base tracking-widest font-bold shadow-2xs">
              {data.sanskritInvocation}
            </span>
          </div>

          <div className={`hero-text-names my-3 sm:my-5 flex flex-col items-center gap-1 sm:gap-2 px-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)] transition-all duration-900 ease-out ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {data.groom.name}
            </h1>

            <div className="my-2 sm:my-3">
              <span className="font-script text-3xl sm:text-5xl text-white italic font-bold tracking-wide px-2">
                weds
              </span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {data.bride.name}
            </h1>
          </div>

          <div className={`text-center space-y-1.5 mb-6 max-w-xl mx-auto px-4 transition-all duration-[1000ms] ease-out ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-xs sm:text-sm text-white/90 leading-relaxed">
              <p className="font-medium text-white">
                Son of <span className="text-white font-semibold">{data.groom.parents}</span>
              </p>
              <p className="text-[10px] text-white/60 my-0.5">•</p>
              <p className="font-medium text-white">
                Daughter of <span className="text-white font-semibold">{data.bride.parents}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
