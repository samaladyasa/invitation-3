import React from 'react';
import DATA from '../../data.json';
import { motion } from 'motion/react';
import { Navigation, ExternalLink } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
export const VenueSection = () => {
  const venue = DATA.venue || {};
  const mapSearchQuery = encodeURIComponent(`${venue.name}, ${venue.city}, Rajasthan`);
  const iframeSrc = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
    return (<section id="venue" className="py-16 sm:py-24 px-4 bg-[#EAF2E8]/40 border-y border-[#C2D3BE]/60 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        
        <div className="mb-8">
          <span className="text-xs font-cinzel tracking-[0.25em] text-[#4A6048] uppercase font-bold block mb-1">
            Destination
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2E3A2D]">
            {venue.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#526950] font-medium mt-2">
            {venue.hall} &bull; {venue.city}
          </p>
        </div>

        
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-2xl overflow-hidden border border-[#C2D3BE] shadow-sm bg-[#FAF7F2]">
          
          <div className="relative w-full h-[300px] sm:h-[380px] bg-[#E2EBE0] overflow-hidden">
            <iframe title={`${venue.name} Google Map`} src={iframeSrc} width="100%" height="100%" style={{ border: 'none' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full grayscale-[20%] contrast-[95%] hover:grayscale-0 transition-all duration-500"/>
          </div>

          
          <div className="p-4 sm:p-6 bg-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C2D3BE]">
            <p className="text-xs sm:text-sm text-[#4E5E4D] font-medium text-center sm:text-left">
              {venue.address}, {venue.city}
            </p>

            <a href={venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#4A6048] text-white text-xs font-bold hover:bg-[#344832] transition-all shadow-sm">
              <Navigation className="w-3.5 h-3.5 fill-white"/>
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 opacity-80"/>
            </a>
          </div>
        </motion.div>
      </div>
    </section>);
};
