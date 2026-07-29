import React, { useEffect, useState, useRef } from 'react';
export const JasminePetalCursor = () => {
    const [petals, setPetals] = useState([]);
    const petalIdRef = useRef(0);
    const lastSpawnTimeRef = useRef(0);
    const animationFrameRef = useRef(null);
    const colors = ['#C5A059', '#D4AF37', '#E6C280', '#DAA520', '#F2D398'];
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
            return;
        }
        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastSpawnTimeRef.current < 40)
                return;
            lastSpawnTimeRef.current = now;
            const newPetal = {
                id: petalIdRef.current++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 8 + 10,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 3,
                vx: (Math.random() - 0.5) * 1.2,
                vy: Math.random() * 1.5 + 0.5,
                opacity: 0.9,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
            setPetals((prev) => [...prev.slice(-22), newPetal]);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    useEffect(() => {
        if (petals.length === 0)
            return;
        const updatePetals = () => {
            setPetals((prevPetals) => prevPetals
                .map((petal) => ({
                ...petal,
                x: petal.x + petal.vx,
                y: petal.y + petal.vy,
                rotation: petal.rotation + petal.rotationSpeed,
                opacity: petal.opacity - 0.02,
            }))
                .filter((petal) => petal.opacity > 0));
            animationFrameRef.current = requestAnimationFrame(updatePetals);
        };
        animationFrameRef.current = requestAnimationFrame(updatePetals);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [petals.length]);
    if (petals.length === 0)
        return null;
    return (<div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (<svg key={petal.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75" style={{
                left: `${petal.x}px`,
                top: `${petal.y}px`,
                width: `${petal.size}px`,
                height: `${petal.size * 1.3}px`,
                opacity: petal.opacity,
                transform: `translate(-50%, -50%) rotate(${petal.rotation}deg)`,
                filter: 'drop-shadow(0 1px 2px rgba(197, 160, 89, 0.3))',
            }} viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          <path d="M12 2C12 2 2 12 2 20C2 25.5 6.5 30 12 30C17.5 30 22 25.5 22 20C22 12 12 2 12 2Z" fill={petal.color} fillOpacity="0.85" stroke="#FFF5E1" strokeWidth="0.8"/>
          
          <path d="M12 8V24" stroke="#FFF" strokeWidth="0.6" strokeOpacity="0.6" strokeDasharray="1 1"/>
        </svg>))}
    </div>);
};
