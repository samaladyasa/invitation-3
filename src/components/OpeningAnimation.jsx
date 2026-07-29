import React, { useEffect, useRef, useState } from 'react';
export const OpeningAnimation = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    useEffect(() => {
        const vid = videoRef.current;
        if (!vid)
            return;
        const handleEnded = () => {
            setIsVisible(false);
            setTimeout(() => onComplete && onComplete(), 420);
        };
        vid.addEventListener('ended', handleEnded);
        vid.play().then(() => setIsPlaying(true)).catch(() => { });
        return () => {
            vid.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);
    const handleStart = async () => {
        const vid = videoRef.current;
        if (!vid)
            return;
        try {
            await vid.play();
            setIsPlaying(true);
        }
        catch (e) {
            setIsVisible(false);
            setTimeout(() => onComplete && onComplete(), 200);
        }
    };
    return (<div onClick={handleStart} role="button" tabIndex={0} className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <video ref={videoRef} src="https://res.cloudinary.com/xzimezus/video/upload/v1785055679/TensorPix_-_Envelope_dissolves_revealing_bac__202607261116_online-video-cutter_jmktxx.mp4" className="absolute inset-0 h-full w-full object-cover" muted playsInline preload="auto"/>

      
      {!isPlaying && (<div className="relative z-20 flex items-center justify-center">
          <span className="absolute inline-flex h-12 w-12 rounded-full bg-white/20 animate-ping"></span>
          <span className="inline-flex h-6 w-6 rounded-full bg-white/60"/>
        </div>)}
    </div>);
};
