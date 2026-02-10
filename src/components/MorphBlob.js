'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MorphBlob() {
    const svgRef = useRef(null);
    const blobRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const blobPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // Morph between blob shapes
        const paths = [
            'M45.3,-51.2C57.4,-40.8,65,-24.3,66.9,-7.2C68.8,9.9,65,27.6,54.8,40.9C44.6,54.2,28,63.1,10.1,66.2C-7.8,69.3,-27,66.6,-41.6,56.8C-56.2,47,-66.2,30.1,-68.6,12.3C-71,-5.6,-65.8,-24.4,-54.6,-35.2C-43.4,-46,-26.2,-48.8,-9.9,-50.1C6.4,-51.4,33.2,-61.6,45.3,-51.2Z',
            'M38.5,-46.1C51.7,-37.4,65.4,-27,69.2,-13.3C73.1,0.4,67.2,17.3,57.2,30.2C47.2,43.1,33.2,51.9,17.5,57.5C1.8,63.1,-15.6,65.4,-30.3,59.8C-45,54.2,-57,40.7,-62.2,25.1C-67.4,9.5,-65.8,-8.2,-58.8,-22.2C-51.8,-36.2,-39.4,-46.5,-26.5,-55.3C-13.6,-64.1,0,-71.4,11.8,-67.2C23.6,-63,25.3,-54.8,38.5,-46.1Z',
            'M43.9,-52.8C55.1,-42.8,61.1,-27.8,63.4,-12.4C65.7,3,64.3,18.8,56.7,31.3C49.1,43.8,35.3,53,19.8,58.5C4.3,64,-12.9,65.8,-27.8,60.1C-42.7,54.4,-55.3,41.2,-61.4,25.8C-67.5,10.4,-67.1,-7.2,-60.6,-21.2C-54.1,-35.2,-41.5,-45.6,-28.2,-55C-14.9,-64.4,0,-72.8,13.5,-70.8C27,-68.8,32.7,-62.8,43.9,-52.8Z',
        ];

        let currentPath = 0;

        const morphTimeline = gsap.timeline({ repeat: -1 });
        paths.forEach((path, i) => {
            const nextPath = paths[(i + 1) % paths.length];
            morphTimeline.to(blobRef.current, {
                attr: { d: nextPath },
                duration: 4,
                ease: 'sine.inOut',
            });
        });

        // Mouse follow with lag
        const onMouseMove = (e) => {
            const rect = svg.parentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouse.current = {
                x: (e.clientX - centerX) * 0.08,
                y: (e.clientY - centerY) * 0.08,
            };
        };

        const followMouse = () => {
            blobPos.current.x += (mouse.current.x - blobPos.current.x) * 0.05;
            blobPos.current.y += (mouse.current.y - blobPos.current.y) * 0.05;
            gsap.set(svg, {
                x: blobPos.current.x,
                y: blobPos.current.y,
            });
        };

        gsap.ticker.add(followMouse);
        window.addEventListener('mousemove', onMouseMove);

        // Gentle rotation
        gsap.to(svg, {
            rotation: 360,
            duration: 40,
            ease: 'none',
            repeat: -1,
        });

        return () => {
            morphTimeline.kill();
            gsap.ticker.remove(followMouse);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-0">
            <svg
                ref={svgRef}
                viewBox="-80 -80 160 160"
                className="w-[500px] h-[500px] md:w-[650px] md:h-[650px]"
                style={{ filter: 'blur(1px)' }}
            >
                <defs>
                    <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.12)" />
                        <stop offset="50%" stopColor="rgba(139, 92, 246, 0.1)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.08)" />
                    </linearGradient>
                    <filter id="blobGlow">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    ref={blobRef}
                    d="M45.3,-51.2C57.4,-40.8,65,-24.3,66.9,-7.2C68.8,9.9,65,27.6,54.8,40.9C44.6,54.2,28,63.1,10.1,66.2C-7.8,69.3,-27,66.6,-41.6,56.8C-56.2,47,-66.2,30.1,-68.6,12.3C-71,-5.6,-65.8,-24.4,-54.6,-35.2C-43.4,-46,-26.2,-48.8,-9.9,-50.1C6.4,-51.4,33.2,-61.6,45.3,-51.2Z"
                    fill="url(#blobGradient)"
                    filter="url(#blobGlow)"
                    transform="translate(0, 0)"
                />
            </svg>
        </div>
    );
}
