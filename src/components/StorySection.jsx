import React, { useState } from 'react';
import DATA from '../../data.json';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, MapPin, Sparkles } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
const storyBgDesktop = new URL('../../assets/images/storybgd.png', import.meta.url).href;
const storyBgMobile = new URL('../../assets/images/storybgm.png', import.meta.url).href;
export const StorySection = () => {
  const milestones = DATA.story?.milestones || [];
  const [selectedImage, setSelectedImage] = useState(null);
    return (<section id="our-story" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F5E7D9] relative overflow-hidden text-black">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src={storyBgDesktop} alt="Story background desktop" className="hidden sm:block absolute inset-0 w-full h-full object-cover object-center"/>
        <img src={storyBgMobile} alt="Story background mobile" className="block sm:hidden absolute inset-0 w-full h-full object-cover object-center"/>
      </div>
      
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#E8E0D2]/40 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#F0E6D8]/50 rounded-full blur-3xl pointer-events-none"/>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel font-bold tracking-[0.25em] text-[#B86B42] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]"/>
            <span>Our Love Story</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]"/>
          </div>
          <h2 className="font-serif-display italic text-4xl sm:text-6xl font-semibold text-black mt-1">
            Chapters of Togetherness
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-3 max-w-lg mx-auto font-serif leading-relaxed">
            From our first accidental cup of chai in Mumbai to quiet sunset promises on Lake Pichola.
          </p>
        </div>

        
        <div className="space-y-24 sm:space-y-36">
          {milestones.map((item, index) => {
            const chapterNum = String(index + 1).padStart(2, '0');
            const isEven = index % 2 === 0;
            return (<div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                
                <motion.div initial={{ x: isEven ? -30 : 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }} className={`lg:col-span-5 flex flex-col justify-center order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  <div className="text-[#B86B42] text-xs sm:text-sm font-cinzel font-bold tracking-[0.25em] uppercase mb-3">
                    CHAPTER {chapterNum}
                  </div>

                  
                  <h3 className="font-serif-display italic text-3xl sm:text-5xl lg:text-6xl font-semibold text-black leading-[1.15] mb-5 sm:mb-6">
                    {item.title}
                  </h3>

                  
                  <p className="text-sm sm:text-base text-black leading-relaxed font-serif max-w-md mb-6">
                    {item.description}
                  </p>

                  
                  <div className="flex items-center gap-3 text-xs font-cinzel text-black pt-3 border-t border-[#E8DFC2]/60 w-fit">
                    <span className="flex items-center gap-1.5 font-semibold text-black">
                      <MapPin className="w-3.5 h-3.5 text-[#B86B42]"/>
                      {item.location}
                    </span>
                    <span className="text-[#B86B42]">•</span>
                    <span className="font-semibold tracking-wider uppercase text-black">{item.date}</span>
                  </div>
                </motion.div>

                
                <motion.div initial={{ opacity: 0, x: isEven ? 30 : -30, y: 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }} className={`lg:col-span-7 order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div onClick={() => setSelectedImage({
                    url: item.imageUrl,
                    title: item.title,
                    date: item.date,
                    location: item.location,
                    quote: item.quote,
                })} className="relative w-full max-w-xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-[#E8E0D2] border border-[#E2D6C3] cursor-pointer group">
                    
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-[#FFFDF8]/95 px-3 py-1 text-xs sm:text-sm font-cinzel font-bold text-[#2D4233] border border-[#E2D6C3] rounded-sm shadow-xs tracking-widest">
                      {chapterNum}
                    </div>

                    
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                      
                      <motion.div initial={{ scaleY: 1 }} whileInView={{ scaleY: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }} className="absolute inset-0 bg-[#E8E0D2] z-10 origin-top pointer-events-none"/>

                      
                      <motion.img initial={{ scale: 1.18, opacity: 0.3 }} whileInView={{ scale: 1.0, opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }} src={item.imageUrl} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"/>

                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

                      
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-full shadow-md text-[#2D4233] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ZoomIn className="w-4 h-4 text-[#B86B42]"/>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>);
        })}
        </div>
      </div>

      
      <AnimatePresence>
        {selectedImage && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative max-w-2xl w-full bg-[#FAF5EE] rounded-2xl overflow-hidden border border-[#E2D6C3] shadow-2xl">
              <button onClick={() => setSelectedImage(null)} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer">
                <X className="w-5 h-5"/>
              </button>

              <div className="relative max-h-[65vh] bg-black flex items-center justify-center">
                <img src={selectedImage.url} alt={selectedImage.title} referrerPolicy="no-referrer" className="max-h-[65vh] w-auto object-contain"/>
              </div>

              <div className="p-6 text-center bg-[#FAF5EE]">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#B86B42] font-cinzel uppercase tracking-wider mb-1">
                  <span>{selectedImage.date}</span>
                  <span>•</span>
                  <span>{selectedImage.location}</span>
                </div>
                <h4 className="font-serif-display italic text-2xl font-normal text-[#2D4233]">
                  {selectedImage.title}
                </h4>
                {selectedImage.quote && (<p className="text-xs font-serif italic text-[#6E685E] mt-2 max-w-md mx-auto">
                    "{selectedImage.quote}"
                  </p>)}
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </section>);
};
