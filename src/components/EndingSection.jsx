import { motion } from 'motion/react';
import DATA from '../../data.json';
const peacockBg = new URL('../../assets/images/peacock_bgd.png', import.meta.url).href;
const peacockBgAlt = new URL('../../assets/images/peacock_bgm.jpg', import.meta.url).href;
export const EndingSection = () => {
  const data = DATA.wedding || {};
  return (<footer id="ending" className="relative py-16 sm:py-20 px-4 overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src={peacockBgAlt} alt="" aria-hidden="true" style={{fontSize: 0, lineHeight: 0}} className="absolute inset-0 h-full w-full object-cover object-bottom"/>
        <img src={peacockBg} alt="" aria-hidden="true" style={{fontSize: 0, lineHeight: 0}} className="absolute inset-0 h-full w-full object-cover object-top"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/90 via-[#FAF7F2]/80 to-transparent"/>
      </div>
      <div className="relative z-10 py-12 px-6 sm:px-10 mx-auto max-w-2xl">
        <div className="max-w-xl mx-auto z-10 relative space-y-5">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-[#C5A059] bg-[#E6EFE3] flex items-center justify-center shadow-xs relative">
              <div className="absolute inset-1 rounded-full border border-[#C2D3BE] border-dashed"/>
              <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#4A6048] tracking-wider">{data.monogram}</span>
            </div>
          </motion.div>

          <div className="space-y-2 px-4">
            <p className="font-serif-display text-lg sm:text-xl text-black italic leading-relaxed font-semibold" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.18)' }}>
              “{data.blessing}”
            </p>
            <p className="text-xs font-cinzel text-black tracking-widest uppercase font-bold mt-3" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.18)' }}>
              With Love
            </p>
          </div>

          <p className="text-[11px] text-black font-semibold tracking-wide" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.12)' }}>
            Rohan & Meera • {data.formattedDate}
          </p>
          <p className="text-[11px] text-black/80 tracking-wide mt-2">
            Crafted by{' '}
            <a href="https://tekkzy.com" target="_blank" rel="noreferrer" className="underline decoration-[#B86B42] decoration-2 underline-offset-2">
              Tekkzy
            </a>
          </p>
        </div>
      </div>
    </footer>);
};
