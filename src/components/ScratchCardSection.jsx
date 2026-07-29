import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Calendar, CheckCircle2 } from 'lucide-react';
import DATA from '../../data.json';
const floralBg1 = new URL('../../assets/images/floral-bg-1.png', import.meta.url).href;
const floralBg2 = new URL('../../assets/images/floral-bg-2.jpg', import.meta.url).href;
const CircleScratchCard = ({ label, value, subtext, isRevealed, onReveal }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const lastPosRef = useRef(null);
    const initCanvas = useCallback(() => {
        if (isRevealed)
            return;
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx)
            return;
        const rect = canvas.getBoundingClientRect();
        const size = rect.width || 120;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.scale(dpr, dpr);
        const center = size / 2;
        const radius = size / 2;
        const forestGrad = ctx.createRadialGradient(center, center, radius * 0.05, center, center, radius);
        forestGrad.addColorStop(0, '#537257');
        forestGrad.addColorStop(0.45, '#415A44');
        forestGrad.addColorStop(0.8, '#304533');
        forestGrad.addColorStop(1, '#233525');
        ctx.fillStyle = forestGrad;
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.fill();
        const imgData = ctx.getImageData(0, 0, size, size);
        const data = imgData.data;
        for (let p = 0; p < data.length; p += 16) {
            const noise = (Math.random() - 0.5) * 8;
            data[p] = Math.min(255, Math.max(0, data[p] + noise));
            data[p + 1] = Math.min(255, Math.max(0, data[p + 1] + noise));
            data[p + 2] = Math.min(255, Math.max(0, data[p + 2] + noise));
        }
        ctx.putImageData(imgData, 0, 0);
        ctx.strokeStyle = '#C5A059';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(center, center, radius - 1.2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(center, center, radius - 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(center, center, radius - 9, 0, Math.PI * 2);
        ctx.stroke();
        lastPosRef.current = null;
    }, [isRevealed]);
    useEffect(() => {
        initCanvas();
        const handleResize = () => initCanvas();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [initCanvas]);
    const checkPercentage = useCallback(() => {
        if (isRevealed)
            return;
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx)
            return;
        const width = canvas.width;
        const height = canvas.height;
        if (!width || !height)
            return;
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        let transparentCount = 0;
        let totalSampled = 0;
        const stride = 16 * 4;
        for (let i = 3; i < pixels.length; i += stride) {
            totalSampled++;
            if (pixels[i] < 128)
                transparentCount++;
        }
        if (totalSampled === 0)
            return;
        const pct = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
        if (pct >= 28)
            onReveal();
    }, [isRevealed, onReveal]);
    const scratchAt = useCallback((clientX, clientY, isStarting = false) => {
        if (isRevealed)
            return;
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx)
            return;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        if (isStarting || lastPosRef.current) {
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2, false);
            ctx.fill();
        }
        else {
            ctx.beginPath();
            ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
            ctx.lineTo(x, y);
            ctx.lineWidth = 44;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
        }
        ctx.restore();
        lastPosRef.current = { x, y };
        checkPercentage();
    }, [checkPercentage, isRevealed]);
    const handlePointerDown = (e) => {
        e.preventDefault();
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        }
        catch { }
        setIsDragging(true);
        scratchAt(e.clientX, e.clientY, true);
    };
    const handlePointerMove = (e) => {
        if (!isDragging)
            return;
        scratchAt(e.clientX, e.clientY, false);
    };
    const handlePointerUp = (e) => {
        try {
            if (e.currentTarget.hasPointerCapture(e.pointerId))
                e.currentTarget.releasePointerCapture(e.pointerId);
        }
        catch { }
        setIsDragging(false);
        lastPosRef.current = null;
    };
    return (<div className="flex flex-col items-center">
      <div ref={containerRef} className={`relative w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-2 transition-all duration-500 overflow-hidden shrink-0 ${isRevealed ? 'border-[#4A6048] shadow-[0_0_20px_rgba(74,96,72,0.35)] scale-105' : 'border-[#4A6048] shadow-sm hover:border-[#6A8068] hover:shadow-md'}`}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-2 rounded-full bg-gradient-to-br from-[#FFFBF5] via-[#F6F2EA] to-[#E6EFE3] z-0 select-none border-2 border-[#E2B852]/40">
          <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-widest text-[#7A5B1E] uppercase">{label}</span>
          <p className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2E3A2D] leading-none my-0.5">{value}</p>
          <span className="text-[10px] sm:text-xs font-marcellus text-[#526950] font-semibold tracking-wide">{subtext}</span>

        </div>

        <canvas ref={canvasRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} className={`absolute inset-0 w-full h-full cursor-pointer z-10 touch-none transition-opacity duration-700 ${isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100'}`}/>

      </div>
    </div>);
};
export const ScratchCardSection = () => {
    const data = DATA.wedding || {};
    const [revealedState, setRevealedState] = useState({ date: false, month: false, year: false });
    const fireConfetti = useCallback(() => {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 }, colors: ['#D4AF37', '#C85A32', '#8A9A86', '#F3E5AB', '#AA7C11'], scalar: 1.2 });
    }, []);
    const handleCircleReveal = useCallback((id) => {
        setRevealedState((prev) => {
            const next = { ...prev, [id]: true };
            if (next.date && next.month && next.year)
                fireConfetti();
            return next;
        });
    }, [fireConfetti]);
    const allRevealed = revealedState.date && revealedState.month && revealedState.year;
    const getGoogleCalendarUrl = () => {
        const title = encodeURIComponent("Rohan & Meera's Wedding Ceremony");
        const details = encodeURIComponent('Join us in celebrating the wedding of Rohan & Meera in Udaipur');
        const location = encodeURIComponent(`${data?.venue?.name || ''}, ${data?.venue?.city || ''}`);
        const startDate = '20261212T060000Z';
        const endDate = '20261212T120000Z';
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    };
    return (<section id="save-the-date" className="py-16 sm:py-20 px-4 bg-[#EAF2E8]/40 border-y border-[#C2D3BE]/60 relative overflow-hidden" style={{ backgroundImage: `url('${floralBg1}'), url('${floralBg2}')`, backgroundPosition: 'center center, center center', backgroundRepeat: 'no-repeat, no-repeat', backgroundSize: 'cover, cover' }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="mt-12 mb-6 sm:mt-16">
          <h2 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-[#000] tracking-[0.45em] uppercase" style={{ textShadow: '0 0 16px rgba(255,255,255,0.6), 0 0 12px rgba(0,0,0,0.2)', WebkitTextStroke: '0.75px rgba(255,255,255,0.65)' }}>
            Save the Date
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 my-4 max-w-full overflow-visible">
          <CircleScratchCard label="Date" value="12" subtext="Saturday" isRevealed={revealedState.date} onReveal={() => handleCircleReveal('date')}/>
          <CircleScratchCard label="Month" value="DEC" subtext="December" isRevealed={revealedState.month} onReveal={() => handleCircleReveal('month')}/>
          <CircleScratchCard label="Year" value="2026" subtext="2026" isRevealed={revealedState.year} onReveal={() => handleCircleReveal('year')}/>
        </div>

        <AnimatePresence>
          {allRevealed && (<motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 inline-flex flex-col items-center gap-2.5 bg-gradient-to-r from-[#FFFBF5] via-[#E6EFE3] to-[#FFFBF5] px-6 py-4 rounded-2xl border border-[#4A6048]/40 shadow-sm">
              <div className="flex items-center gap-2 text-[#2E3A2D] font-bold text-sm sm:text-base font-serif-display">
                <CheckCircle2 className="w-4 h-4 text-[#4A6048]"/>
                <span>December 12, 2026</span>
              </div>
              <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#4A6048] text-white text-xs font-semibold hover:bg-[#344832] transition-all shadow-sm cursor-pointer mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#F5E6C8]"/>
                <span>Add to Google Calendar</span>
              </a>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </section>);
};
