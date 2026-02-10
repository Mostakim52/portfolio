'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee({ text = 'CREATIVE DEVELOPER', repeat = 4, direction = 'left', className = '' }) {
    const containerRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {
        const inner = innerRef.current;
        const container = containerRef.current;
        if (!inner || !container) return;

        // Calculate width of one set of text
        const textWidth = inner.scrollWidth / 2;

        // Base continuous animation
        const baseTween = gsap.to(inner, {
            x: direction === 'left' ? -textWidth : textWidth,
            duration: 25,
            ease: 'none',
            repeat: -1,
        });

        // Scroll velocity effect
        const scrollProxy = { velocity: 0 };

        ScrollTrigger.create({
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const v = self.getVelocity();
                const normalizedV = Math.min(Math.abs(v) / 3000, 2);
                scrollProxy.velocity = normalizedV;

                gsap.to(baseTween, {
                    timeScale: 1 + normalizedV,
                    duration: 0.3,
                    overwrite: true,
                });
            },
        });

        // Reset speed when not scrolling
        const resetInterval = setInterval(() => {
            gsap.to(baseTween, {
                timeScale: 1,
                duration: 1,
                ease: 'power2.out',
            });
        }, 500);

        return () => {
            baseTween.kill();
            clearInterval(resetInterval);
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === container) t.kill();
            });
        };
    }, [direction, text, repeat]);

    const items = Array.from({ length: repeat }, (_, i) => i);

    return (
        <div ref={containerRef} className={`overflow-hidden py-8 ${className}`}>
            <div ref={innerRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
                {/* Two sets for seamless loop */}
                {[0, 1].map((set) => (
                    <div key={set} className="flex items-center gap-8">
                        {items.map((i) => (
                            <span key={`${set}-${i}`} className="flex items-center gap-8">
                                <span
                                    className="text-6xl md:text-8xl font-bold tracking-wider uppercase select-none"
                                    style={{
                                        WebkitTextStroke: '1.5px rgba(255,255,255,0.08)',
                                        color: 'transparent',
                                    }}
                                >
                                    {text}
                                </span>
                                <span
                                    className="text-2xl md:text-3xl"
                                    style={{ color: 'rgba(139, 92, 246, 0.3)' }}
                                >
                                    ✦
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
