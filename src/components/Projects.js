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
        },
        image: '/assets/CSE499.png',
        color: '#8b5cf6',
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
        title: 'ESP32 Smart Helmet',
        description: 'This very website — built with Next.js, GSAP, and Anime.js featuring immersive scroll animations.',
        tags: ['Iot', 'Microcontrollers', 'Safety'],
        links: {
            repo: 'https://github.com/Mostakim52/ESP32-Smart-Helmet',
        },
        image: '/assets/helmet.png',
        color: '#ec4899',
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Cards staggered reveal
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                    },
                    y: 80,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.9,
                    delay: i * 0.15,
                    ease: 'power3.out',
                });
            });

            // 3D tilt effect on cards
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card) => {
                const glowEl = card.querySelector('.card-glow');

                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = -(y - centerY) / 15;
                    const rotateY = (x - centerX) / 15;

                    gsap.to(card, {
                        rotateX,
                        rotateY,
                        scale: 1.02,
                        duration: 0.4,
                        ease: 'power2.out',
                        transformPerspective: 800,
                    });

                    // Move glow to mouse position
                    if (glowEl) {
                        gsap.to(glowEl, {
                            left: x,
                            top: y,
                            opacity: 1,
                            duration: 0.3,
                        });
                    }

                    // Image parallax
                    const img = card.querySelector('.project-img');
                    if (img) {
                        gsap.to(img, {
                            x: (x - centerX) / 20,
                            y: (y - centerY) / 20,
                            scale: 1.08,
                            duration: 0.5,
                            ease: 'power2.out',
                        });
                    }
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                    });

                    if (glowEl) {
                        gsap.to(glowEl, { opacity: 0, duration: 0.3 });
                    }

                    const img = card.querySelector('.project-img');
                    if (img) {
                        gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" className="py-28 px-6 relative" ref={sectionRef}>
            {/* Background */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    Featured <span className="gradient-text">Projects</span>
                </h2>
                <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
                    A selection of things I&apos;ve built and explored
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card glass-card overflow-hidden group tilt-card"
                            style={{ transformStyle: 'preserve-3d' }}
                            data-cursor="card"
                        >
                            {/* Mouse-following glow */}
                            <div
                                className="card-glow absolute w-[250px] h-[250px] rounded-full pointer-events-none z-[1]"
                                style={{
                                    background: `radial-gradient(circle, ${project.color}20, transparent 70%)`,
                                    transform: 'translate(-50%, -50%)',
                                    opacity: 0,
                                }}
                            />

                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent z-10" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="project-img object-cover transition-transform"
                                    unoptimized
                                />
                                {/* Color accent line */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                                        boxShadow: `0 0 10px ${project.color}40`,
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-20">
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs bg-white/[0.04] rounded-full font-mono"
                                            style={{ color: project.color, borderColor: `${project.color}20`, border: '1px solid' }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.links.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                        data-cursor="link"
                                    >
                                        <Github size={16} /> Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
