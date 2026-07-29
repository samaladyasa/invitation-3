import React, { useEffect, useRef } from 'react';
export const JasminePetalRain = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        const handleResize = () => {
            if (!canvas)
                return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        const colors = [
            { fill: 'rgba(255, 252, 240, 0.9)', stroke: '#E6C280' },
            { fill: 'rgba(245, 230, 200, 0.85)', stroke: '#C5A059' },
            { fill: 'rgba(255, 248, 220, 0.9)', stroke: '#D4AF37' },
            { fill: 'rgba(238, 225, 190, 0.8)', stroke: '#B89047' },
            { fill: 'rgba(255, 255, 250, 0.95)', stroke: '#E2C896' },
        ];
        const petalCount = width < 640 ? 25 : 40;
        const createPetal = (initialYOffset = true) => {
            const colorObj = colors[Math.floor(Math.random() * colors.length)];
            return {
                x: Math.random() * width,
                y: initialYOffset ? Math.random() * height * -1 - 20 : -20,
                size: Math.random() * 8 + 10,
                speedY: Math.random() * 0.8 + 0.5,
                swaySpeed: Math.random() * 0.02 + 0.01,
                swayAngle: Math.random() * Math.PI * 2,
                swayRange: Math.random() * 1.5 + 0.5,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                opacity: Math.random() * 0.4 + 0.6,
                color: colorObj.fill,
            };
        };
        const petals = Array.from({ length: petalCount }, () => {
            const p = createPetal(false);
            p.y = Math.random() * height;
            return p;
        });
        const drawJasminePetal = (ctx, size, color) => {
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.bezierCurveTo(size * 0.8, -size * 0.4, size * 0.9, size * 0.6, 0, size);
            ctx.bezierCurveTo(-size * 0.9, size * 0.6, -size * 0.8, -size * 0.4, 0, -size);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -size * 0.6);
            ctx.lineTo(0, size * 0.6);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 0.6;
            ctx.stroke();
        };
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < petals.length; i++) {
                const p = petals[i];
                p.y += p.speedY;
                p.swayAngle += p.swaySpeed;
                p.x += Math.sin(p.swayAngle) * p.swayRange;
                p.rotation += p.rotationSpeed;
                if (p.y > height + 30) {
                    petals[i] = createPetal(true);
                }
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = p.opacity;
                drawJasminePetal(ctx, p.size, p.color);
                ctx.restore();
            }
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return (<canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30 w-full h-full"/>);
};
