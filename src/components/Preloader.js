'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null);
    const textRef = useRef(null);
    const counterRef = useRef(null);
    const barRef = useRef(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setDone(true);
                    if (onComplete) onComplete();
                },
            });

            // Letters stagger in
            const nameText = 'MOSTAKIM';
            const letters = textRef.current;
            if (letters) {
                letters.innerHTML = nameText
                    .split('')
                    .map((char) => `<span class="preloader-letter" style="display:inline-block;opacity:0;transform:translateY(40px)">${char}</span>`)
                    .join('');
            }

            // Counter from 0 to 100
            const counter = { val: 0 };

            tl
                // Phase 1: Letters animate in
                .to('.preloader-letter', {
                    opacity: 1,
                    y: 0,
                    stagger: 0.06,
                    duration: 0.5,
                    ease: 'back.out(2)',
                }, 0.3)

                // Progress bar fills
                .to(barRef.current, {
                    scaleX: 1,
                    duration: 1.4,
                    ease: 'power2.inOut',
                }, 0.3)

                // Counter goes up
                .to(counter, {
                    val: 100,
                    duration: 1.4,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        if (counterRef.current) {
                            counterRef.current.textContent = Math.round(counter.val) + '%';
                        }
                    },
                }, 0.3)

                // Phase 2: Hold
                .to({}, { duration: 0.3 })

                // Phase 3: Wipe away
                .to('.preloader-letter', {
                    opacity: 0,
                    y: -30,
                    stagger: 0.03,
                    duration: 0.3,
                    ease: 'power2.in',
                })
                .to(counterRef.current, {
                    opacity: 0,
                    duration: 0.2,
                }, '-=0.2')
                .to(barRef.current, {
                    opacity: 0,
                    duration: 0.2,
                }, '-=0.2')

                // Clip-path reveal
                .to(preloaderRef.current, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 0.8,
                    ease: 'power3.inOut',
                });
        });

        return () => ctx.revert();
    }, [onComplete]);

    if (done) return null;

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{
                background: '#030305',
                clipPath: 'inset(0 0 0% 0)',
            }}
        >
            {/* Ambient glow */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />

            {/* Name text */}
            <div
                ref={textRef}
                className="text-5xl md:text-7xl font-bold tracking-[0.3em] text-white mb-12 relative z-10"
                style={{
                    fontFamily: "'Outfit', sans-serif",
                }}
            />

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative z-10">
                <div
                    ref={barRef}
                    className="h-full origin-left rounded-full"
                    style={{
                        transform: 'scaleX(0)',
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
                    }}
                />
            </div>

            {/* Counter */}
            <div
                ref={counterRef}
                className="mt-6 text-sm font-mono text-gray-500 tracking-widest relative z-10"
            >
                0%
            </div>
        </div>
    );
}
