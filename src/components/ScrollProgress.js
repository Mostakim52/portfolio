'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        gsap.to(bar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars.trigger === document.documentElement) t.kill();
            });
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]">
            <div
                ref={barRef}
                className="h-full origin-left"
                style={{
                    transform: 'scaleX(0)',
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #22d3ee)',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.2)',
                }}
            />
        </div>
    );
}
