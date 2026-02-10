'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedButton from '@/components/AnimatedButton';
import Socials from '@/components/Socials';
import FloatingShapes from '@/components/FloatingShapes';
import MorphBlob from '@/components/MorphBlob';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
    ssr: false,
});
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const greetings = [
    'Hello', 'Bonjour', 'Hola', 'Ciao', 'こんにちは',
    '안녕하세요', '你好', 'Olá', 'Привет', 'Salam', 'নমস্কার',
];

export default function Hero() {
    const [greetingIndex, setGreetingIndex] = useState(0);
    const sectionRef = useRef(null);
    const nameRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const imageWrapRef = useRef(null);
    const greetingRef = useRef(null);
    const spotlightRef = useRef(null);

    // Cycling greetings
    useEffect(() => {
        const interval = setInterval(() => {
            setGreetingIndex((prev) => (prev + 1) % greetings.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Greeting transition
    useEffect(() => {
        if (greetingRef.current) {
            gsap.fromTo(greetingRef.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            );
        }
    }, [greetingIndex]);

    // Mouse spotlight effect
    useEffect(() => {
        const section = sectionRef.current;
        const spotlight = spotlightRef.current;
        if (!section || !spotlight) return;

        const onMouseMove = (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(spotlight, {
                left: x,
                top: y,
                duration: 0.8,
                ease: 'power2.out',
            });
        };

        section.addEventListener('mousemove', onMouseMove);
        return () => section.removeEventListener('mousemove', onMouseMove);
    }, []);

    // Main entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 2.8 }); // After preloader

            // Animate name as a whole (keeps gradient + layout intact)
            const nameEl = nameRef.current;
            if (nameEl) {
                tl.from(nameEl, {
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    ease: 'power3.out',
                }, 0);
            }

            // Subtitle
            tl.from(subtitleRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
            }, 0.4);

            // CTA buttons
            tl.from(ctaRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
            }, 0.6);

            // Profile image
            tl.from(imageWrapRef.current, {
                opacity: 0,
                scale: 0.7,
                rotation: -15,
                duration: 1.2,
                ease: 'elastic.out(1, 0.6)',
            }, 0.3);

            // Parallax on scroll
            gsap.to('.hero-parallax-slow', {
                y: 150,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            gsap.to('.hero-parallax-fast', {
                y: 250,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col md:flex-row justify-center items-center relative overflow-hidden px-6 gap-12 pt-20"
        >
            <FloatingShapes />

            {/* Mouse-follow spotlight */}
            <div
                ref={spotlightRef}
                className="absolute w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.02) 40%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                }}
            />

            {/* Parallax background layers */}
            <div className="hero-parallax-slow absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.04] blur-[100px] pointer-events-none" />
            <div className="hero-parallax-fast absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/[0.04] blur-[80px] pointer-events-none" />
            <div className="hero-parallax-slow absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-600/[0.03] blur-[60px] pointer-events-none" />

            {/* Text Content */}
            <div className="text-center md:text-left z-10 max-w-2xl">
                <div className="h-10 mb-5 flex items-center justify-center md:justify-start gap-2">
                    <span className="text-purple-400 text-xl">👋</span>
                    <span
                        ref={greetingRef}
                        key={greetingIndex}
                        className="text-xl md:text-2xl font-light text-gray-400"
                    >
                        {greetings[greetingIndex]}, I am
                    </span>
                </div>

                <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]"
                    ref={nameRef}
                    data-cursor="text"
                >
                    <span className="gradient-text block md:inline">Mostakim</span>{' '}
                    <span className="text-white block md:inline">Hossain</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed"
                >
                    <span className="text-cyan-400 font-mono">&lt;</span>
                    <span className="text-indigo-400">Full-Stack</span>
                    <span className="text-cyan-400 font-mono"> /&gt;</span> Developer crafting
                    <span className="text-purple-400 neon-text"> immersive</span> digital experiences with
                    AI & Modern Web Tech.
                </p>

                <div ref={ctaRef} className="flex gap-4 justify-center md:justify-start mb-8">
                    <AnimatedButton href="#projects" variant="primary">
                        View Projects
                    </AnimatedButton>
                    <AnimatedButton href="https://github.com/Mostakim52" variant="secondary">
                        GitHub
                    </AnimatedButton>
                </div>

                <div className="flex justify-center md:justify-start">
                    <Socials />
                </div>
            </div>

            {/* Profile Image with MorphBlob and orbiting elements */}
            <div ref={imageWrapRef} className="relative w-64 h-64 md:w-[380px] md:h-[380px] shrink-0 z-10">
                {/* MorphBlob behind image */}
                <MorphBlob />

                {/* Glow behind image */}
                <div className="absolute inset-[-20%] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-[60px] animate-pulse pointer-events-none" />

                {/* Orbiting shapes */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="orbit-shape absolute w-5 h-5 rounded-full bg-indigo-500/60 blur-[2px]"
                        style={{ '--orbit-radius': '170px', '--orbit-duration': '12s' }} />
                    <div className="orbit-shape absolute w-3 h-3 rounded-full bg-pink-500/50 blur-[1px]"
                        style={{ '--orbit-radius': '190px', '--orbit-duration': '18s', animationDirection: 'reverse' }} />
                    <div className="orbit-shape absolute w-4 h-4 rounded-full bg-cyan-400/40 blur-[2px]"
                        style={{ '--orbit-radius': '155px', '--orbit-duration': '25s' }} />
                </div>

                {/* Orbit rings */}
                <div className="absolute inset-[-15px] md:inset-[-20px] border border-white/[0.04] rounded-full pointer-events-none" />
                <div className="absolute inset-[-35px] md:inset-[-45px] border border-white/[0.02] rounded-full pointer-events-none" />

                {/* 3D Hero Scene */}
                <HeroScene />

                {/* Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
                    <Image
                        src="/assets/profile.jpg"
                        alt="Mostakim Hossain"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/70 via-transparent to-transparent" />
                </div>
            </div>
        </section>
    );
}
