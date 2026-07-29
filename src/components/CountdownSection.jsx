import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Heart } from 'lucide-react';
import DATA from '../../data.json';

export const CountdownSection = () => {
  const targetDate = DATA?.wedding?.weddingDate ? new Date(DATA.wedding.weddingDate) : null;

  const calculateTimeLeft = () => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = useMemo(() => [
    { id: 'days', label: 'Days', value: timeLeft.days },
    { id: 'hours', label: 'Hours', value: timeLeft.hours },
    { id: 'minutes', label: 'Minutes', value: timeLeft.minutes },
    { id: 'seconds', label: 'Seconds', value: timeLeft.seconds },
  ], [timeLeft]);

  return (<section id="countdown" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] relative overflow-hidden">
    <div className="max-w-5xl mx-auto text-center relative z-10">

      <div className="flex flex-col items-center justify-center mb-2">
        <div className="flex items-center justify-center gap-2 text-[#4A6048] text-xs font-cinzel font-bold tracking-widest uppercase">
          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Counting Down To Forever</span>
        </div>
      </div>


      <div className="mb-8">
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#2E3A2D] mt-1">
          The Auspicious Muhurat
        </h2>
        <p className="text-xs sm:text-sm text-[#526950] mt-2 font-medium max-w-lg mx-auto">
          Saturday, December 12, 2026 • 11:30 AM IST • Udaipur, Rajasthan
        </p>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto my-6">
        {timeUnits.map((unit) => {
          const formattedValue = String(unit.value).padStart(2, '0');
          return (<div key={unit.id} className="flex flex-col items-center">

            <div className="relative w-full max-w-[170px] h-28 sm:h-36 rounded-2xl bg-[#2A3629] p-2 border-2 border-[#C5A059] shadow-xl flex flex-col justify-between overflow-hidden">

              <div className="relative w-full h-[49%] bg-gradient-to-b from-[#384837] to-[#253024] rounded-t-xl border-b border-[#1A2319] flex items-end justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span key={unit.value} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.3 }} className="font-serif-display text-4xl sm:text-6xl font-black text-[#F5E6C8] tracking-wider translate-y-[52%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {formattedValue}
                  </motion.span>
                </AnimatePresence>
              </div>


              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#C5A059] z-20 shadow-[0_1px_3px_rgba(0,0,0,0.9)] flex justify-between items-center px-1">
                <div className="w-1.5 h-3 bg-[#C5A059] rounded-sm -translate-y-0.5" />
                <div className="w-1.5 h-3 bg-[#C5A059] rounded-sm -translate-y-0.5" />
              </div>


              <div className="relative w-full h-[49%] bg-gradient-to-b from-[#212C20] to-[#182117] rounded-b-xl border-t border-[#314030] flex items-start justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span key={unit.value} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.3 }} className="font-serif-display text-4xl sm:text-6xl font-black text-[#F5E6C8] tracking-wider -translate-y-[52%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {formattedValue}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>


            <div className="mt-3 px-4 py-1 rounded-full bg-white/90 border border-[#C5A059]/60 shadow-xs">
              <span className="text-xs font-cinzel font-bold text-[#7A5B1E] uppercase tracking-widest">
                {unit.label}
              </span>
            </div>
          </div>);
        })}
      </div>


      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#526950] font-medium italic">
          <Heart className="w-3.5 h-3.5 text-[#4A6048] fill-[#4A6048]/20" />
          <span>Every second brings us closer to our sacred vows</span>
          <Heart className="w-3.5 h-3.5 text-[#4A6048] fill-[#4A6048]/20" />
        </div>
      </div>
    </div>
  </section>);
};
