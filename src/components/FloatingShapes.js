'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function FloatingShapes() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const shapes = container.querySelectorAll('.floating-shape');
        const ctx = gsap.context(() => {
            shapes.forEach((shape, i) => {
                // Random infinite floating animation
                gsap.to(shape, {
                    y: `random(-40, 40)`,
                    x: `random(-30, 30)`,
                    rotation: `random(-20, 20)`,
                    scale: `random(0.8, 1.2)`,
                    duration: `random(8, 16)`,
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.5,
                });
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Large purple sphere */}
            <div
                className="floating-shape absolute -top-20 -left-20 w-[350px] h-[350px] rounded-full opacity-[0.07]"
                style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
            />

            {/* Cyan ring */}
            <div
                className="floating-shape absolute top-[30%] -right-16 w-[300px] h-[300px] rounded-full opacity-[0.08] border-[3px] border-cyan-400/30"
            />

            {/* Small pink dot */}
            <div
                className="floating-shape absolute bottom-[20%] left-[10%] w-16 h-16 rounded-full opacity-[0.15]"
                style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
            />

            {/* Rotated square */}
            <div
                className="floating-shape absolute top-[60%] right-[15%] w-20 h-20 rotate-45 opacity-[0.06] border-2 border-indigo-400/40"
            />

            {/* Small orbiting triangle (SVG) */}
            <svg
                className="floating-shape absolute top-[15%] right-[30%] opacity-[0.08]"
                width="60" height="60" viewBox="0 0 60 60"
            >
                <polygon
                    points="30,5 55,50 5,50"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                />
            </svg>

            {/* Hexagon */}
            <svg
                className="floating-shape absolute bottom-[30%] right-[5%] opacity-[0.06]"
                width="80" height="80" viewBox="0 0 80 80"
            >
                <polygon
                    points="40,5 72,22 72,58 40,75 8,58 8,22"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="1.5"
                />
            </svg>

            {/* Large blurred blue orb */}
            <div
                className="floating-shape absolute bottom-[-10%] right-[30%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
                style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
            />

            {/* Subtle dark overlay to blend shapes */}
            <div className="absolute inset-0 bg-[#050508]/30" />
        </div>
    );
}
