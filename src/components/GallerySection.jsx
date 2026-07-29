import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2, X, Camera, MapPin, Calendar } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
import DATA from '../../data.json';
const galleryUrls = DATA.gallery?.images || [];
const placeholderUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200';
const GALLERY_PHOTOS = (galleryUrls.length ? galleryUrls : Array.from({ length: 6 }).fill(placeholderUrl)).map((url, i) => ({ id: String(i + 1), url, title: '', subtitle: '', location: '', date: '' }));
const getPhoto = (i) => GALLERY_PHOTOS[i % GALLERY_PHOTOS.length];
const ROW_1_PHOTOS = [getPhoto(0), getPhoto(1), getPhoto(2), getPhoto(3), getPhoto(0), getPhoto(1)];
const ROW_2_PHOTOS = [getPhoto(4), getPhoto(5), getPhoto(6), getPhoto(7), getPhoto(4), getPhoto(5)];
const ROW_3_PHOTOS = [getPhoto(8), getPhoto(2), getPhoto(0), getPhoto(3), getPhoto(6), getPhoto(8)];
export const GallerySection = () => {
    const containerRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.gallery-card');
            if (cards.length > 0) {
                gsap.fromTo(cards, { opacity: 0, scale: 0.82, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.75, stagger: 0.07, ease: 'back.out(1.2)', scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });
    const xRow1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const xRow2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);
    const xRow3 = useTransform(scrollYProgress, [0, 1], ['-10%', '-40%']);
    const handleKeyDown = (e) => {
        if (e.key === 'Escape')
            setSelectedPhoto(null);
    };
    return (<section ref={containerRef} id="gallery" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold tracking-widest text-[#2E3A2D] uppercase mb-1">
          <Camera className="w-3.5 h-3.5 text-[#4A6048]"/>
          <span>Captured Memories</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2E3A2D] mt-1">Engagement Gallery</h2>
      </div>

      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden py-2 cursor-grab active:cursor-grabbing">
        <motion.div style={{ x: xRow1, display: 'flex', gap: '1rem', width: 'max-content' }}>
          {ROW_1_PHOTOS.map((photo, idx) => (<PhotoCard key={`r1-${idx}`} photo={photo} onSelect={() => setSelectedPhoto(photo)}/>))}
        </motion.div>

        <motion.div style={{ x: xRow2, display: 'flex', gap: '1rem', width: 'max-content' }}>
          {ROW_2_PHOTOS.map((photo, idx) => (<PhotoCard key={`r2-${idx}`} photo={photo} onSelect={() => setSelectedPhoto(photo)}/>))}
        </motion.div>

        <motion.div style={{ x: xRow3, display: 'flex', gap: '1rem', width: 'max-content' }}>
          {ROW_3_PHOTOS.map((photo, idx) => (<PhotoCard key={`r3-${idx}`} photo={photo} onSelect={() => setSelectedPhoto(photo)}/>))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} tabIndex={0} onKeyDown={handleKeyDown} onClick={() => setSelectedPhoto(null)} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 outline-none">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative max-w-3xl w-full bg-[#FAF5EE] rounded-2xl overflow-hidden border border-[#C5A059]/60 shadow-2xl">
              <button onClick={() => setSelectedPhoto(null)} className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer">
                <X className="w-5 h-5"/>
              </button>

              <div className="relative max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
                <img src={selectedPhoto.url} alt={selectedPhoto.title} referrerPolicy="no-referrer" className="max-h-[68vh] w-auto max-w-full object-contain"/>
              </div>

              <div className="p-5 sm:p-6 bg-[#FAF5EE] text-[#2E3A2D] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#C5A059]/30">
                <div>
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#7A5B1E] font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]"/>
                    <span>{selectedPhoto.location}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]"/>
                    <span>{selectedPhoto.date}</span>
                  </div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2E3A2D]">{selectedPhoto.title}</h3>
                  <p className="text-xs sm:text-sm text-[#526950] mt-1 font-serif">{selectedPhoto.subtitle}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </section>);
};
const PhotoCard = ({ photo, onSelect }) => {
    return (<div onClick={onSelect} className="gallery-card group relative w-[280px] sm:w-[360px] md:w-[420px] aspect-[16/10] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#2D3A2C] border-2 border-[#C5A059]/40 shadow-md hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <img src={photo.url} alt={photo.title} referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-28 group-hover:opacity-40 transition-opacity duration-300"/>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#2E3A2D] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-xs">
        <Maximize2 className="w-4 h-4 text-[#7A5B1E]"/>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white flex flex-col justify-end">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#F5E6C8] font-cinzel font-semibold mb-1">
          <MapPin className="w-3 h-3 text-[#D4AF37]"/>
          <span>{photo.location}</span>
        </div>
        <h3 className="font-serif-display text-base sm:text-xl font-bold text-white leading-tight group-hover:text-[#FBF3D5] transition-colors">{photo.title}</h3>
      </div>
    </div>);
};
