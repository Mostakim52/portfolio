'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Bangla Emotion Detection',
        description: 'Hybrid CNN-Transformer & CNN-BiLSTM architecture for emotion recognition on native Bangla speech data.',
        tags: ['Python', 'TensorFlow', 'NLP'],
        links: {
            repo: 'https://github.com/Mostakim52/7-Emotion-Bangla-Speech-Recognition-Model',
            live: 'https://realtimebser.vercel.app',
        },
        image: '/assets/CSE499.png',
        color: '#8b5cf6',
    },
    {
        title: 'Repugate',
        description: 'A SaaS app for an AI-based review reply system for Facebook Business.',
        tags: ['SaaS', 'AI', 'Product'],
        links: {
            repo: 'https://github.com/Mostakim52/repugate',
            live: 'https://repugate.vercel.app',
        },
        image: '/assets/repugate.png',
        color: '#6366f1',
    },
    {
        title: 'Khuje Nao – Lost & Found App',
        description: 'A Flutter App for Finding Lost Items in North South University',
        tags: ['React', 'Flutter', 'FastAPI'],
        links: {
            repo: 'https://github.com/Mostakim52/khuje_nao',
        },
        image: '/assets/khuje_nao.png',
        color: '#22d3ee',
    },
    {
        title: 'ESP32 Pocket LLM',
        description: 'Voice-controlled pocket LLM on ESP32: record speech, transcribe with AssemblyAI, and generate stories locally on-device with a tiny 260K-parameter model.',
        tags: ['ESP32', 'LLM', 'Embedded AI'],
        links: {
            repo: 'https://github.com/Mostakim52/ESP32-Pocket-LLM',
        },
        image: '/assets/esp32_pocket_llm.jpg',
        color: '#06b6d4',
    },
    {
        title: 'ESP32 Smart Helmet',
        description: 'IoT-enabled ESP32 smart helmet for construction worker safety with fall detection, environmental sensing, and real-time mobile + server alerts.',
        tags: ['Iot', 'Microcontrollers', 'Safety'],
        links: {
            repo: 'https://github.com/Mostakim52/ESP32-Smart-Helmet',
        },
        image: '/assets/helmet.png',
        color: '#ec4899',
    },
    {
        title: 'ESP32 Macropad',
        description: 'A smart ESP32-S3 Macropad featuring a WebUI for real-time configuration, F13-F24 mapping, OLED GIF support, and persistent on-device storage.',
        tags: ['ESP32-S3', 'WebUI', 'Firmware'],
        links: {
            repo: 'https://github.com/Mostakim52/esp32-macropad',
        },
        image: '/assets/esp32_macropad.jpg',
        color: '#f97316',
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const sequenceRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title entrance
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                    once: true,
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            const cards = gsap.utils.toArray('.project-slide');
            if (!cards.length || !sequenceRef.current) return;

            gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.98 });
            gsap.set(cards[0], { autoAlpha: 1, y: 0, scale: 1 });

            const revealTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sequenceRef.current,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * (cards.length * 1.35 + 0.5)}`,
                    scrub: 0.8,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            const stepSize = 1.5;
            const fadeDuration = 0.42;
            const holdDuration = 0.95;
            const firstHold = 1.15;

            // Keep the first project on screen longer before transitioning.
            revealTl.to(cards[0], {
                autoAlpha: 1,
                duration: firstHold,
                ease: 'none',
            }, 0);

            cards.forEach((card, index) => {
                if (index === 0) return;
                const previousCard = cards[index - 1];
                const stepStart = firstHold + (index - 1) * stepSize;

                revealTl
                    .to(previousCard, {
                        autoAlpha: 0,
                        y: -24,
                        scale: 1.01,
                        duration: fadeDuration,
                        ease: 'power2.inOut',
                    }, stepStart)
                    .to(card, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: fadeDuration,
                        ease: 'power2.out',
                    }, stepStart)
                    .to(card, {
                        autoAlpha: 1,
                        duration: holdDuration,
                        ease: 'none',
                    }, stepStart + fadeDuration);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            className="relative w-full"
            ref={sectionRef}
        >
            {/* Title section */}
            <div className="py-20 px-6 relative z-10">
                <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    Featured <span className="gradient-text">Projects</span>
                </h2>
                <p className="text-gray-500 text-center max-w-xl mx-auto">
                    Scroll through my recent work
                </p>
            </div>

            {/* Pinned full-screen one-by-one reveal */}
            <div
                ref={sequenceRef}
                className="relative w-full h-screen"
            >
                <div className="h-screen w-full flex items-center justify-center px-3 md:px-5 py-10 md:py-12">
                    <div className="relative w-full h-full">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="project-slide absolute inset-0 flex items-center justify-center"
                                style={{
                                    opacity: index === 0 ? 1 : 0,
                                    visibility: index === 0 ? 'visible' : 'hidden',
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-5 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle, ${project.color}40, transparent 80%)`,
                                    }}
                                />

                                <div className="w-full mx-auto relative z-10">
                                    <div className="glass-card rounded-3xl overflow-hidden border border-white/10 backdrop-blur-md w-[min(98vw,1700px)] h-[88vh] mx-auto">
                                        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-0 h-full">
                                            {/* Image - Full height */}
                                            <div className="h-[42vh] lg:h-full relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-transparent z-10" />
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                    priority={index === 0}
                                                />
                                                <div
                                                    className="absolute top-0 left-0 right-0 h-1"
                                                    style={{
                                                        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                                                        boxShadow: `0 0 30px ${project.color}80`,
                                                    }}
                                                />
                                            </div>

                                            {/* Content - Full height */}
                                            <div className="p-7 md:p-10 lg:p-14 flex flex-col justify-center relative h-full overflow-y-auto">
                                                <div
                                                    className="absolute inset-0 pointer-events-none"
                                                    style={{
                                                        background: `radial-gradient(circle at 20% 50%, ${project.color}08, transparent 60%)`,
                                                    }}
                                                />

                                                <div className="relative z-10 max-w-2xl">
                                                    <div
                                                        className="text-sm font-mono opacity-60 mb-4"
                                                        style={{ color: project.color }}
                                                    >
                                                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                                                    </div>

                                                    <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                                                        {project.title}
                                                    </h3>

                                                    <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl">
                                                        {project.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-3 mb-8">
                                                        {project.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-4 py-2 text-sm rounded-full font-mono border"
                                                                style={{
                                                                    color: project.color,
                                                                    backgroundColor: `${project.color}12`,
                                                                    borderColor: `${project.color}40`,
                                                                }}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 relative z-10 mt-2">
                                                    <a
                                                        href={project.links.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-white border transition-all duration-300 hover:scale-105"
                                                        style={{
                                                            borderColor: `${project.color}60`,
                                                            backgroundColor: `${project.color}15`,
                                                        }}
                                                        data-cursor="link"
                                                    >
                                                        <Github size={20} /> Code
                                                    </a>
                                                    {project.links.live && (
                                                        <a
                                                            href={project.links.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-white border transition-all duration-300 hover:scale-105"
                                                            style={{
                                                                borderColor: `${project.color}60`,
                                                                backgroundColor: `${project.color}15`,
                                                            }}
                                                            data-cursor="link"
                                                        >
                                                            <ExternalLink size={20} /> Live
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
