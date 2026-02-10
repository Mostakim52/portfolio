'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        year: 'Jan 2025 – Present',
        title: 'Vice Chair (Technical), IEEE NSU WIE AG',
        company: 'North South University',
        description:
            'Overseeing the technical direction of the WIE Affinity Group, mentoring teams, and coordinating projects and events.',
        icon: Briefcase,
        color: '#6366f1',
    },
    {
        year: 'Jun 2023 – Jan 2025',
        title: 'Graphics Team Lead, IEEE NSU WIE AG',
        company: 'North South University',
        description:
            'Led the graphics team to produce event branding, posters, and crests while supervising volunteers and meeting tight deadlines.',
        icon: Award,
        color: '#8b5cf6',
    },
    {
        year: 'Fall 2021 – Summer 2025',
        title: 'B.Sc. in Computer Science & Engineering',
        company: 'North South University · CGPA 3.46',
        description:
            'Coursework and projects in algorithms, full‑stack development, embedded systems, and AI/ML with a focus on speech and NLP.',
        icon: GraduationCap,
        color: '#22d3ee',
    },
];

export default function Timeline() {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate the line growing
            gsap.fromTo(lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: 0.5,
                    },
                }
            );

            // Cards stagger in
            gsap.utils.toArray('.timeline-card').forEach((card, i) => {
                const direction = i % 2 === 0 ? -60 : 60;
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    },
                    x: direction,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            });

            // Dots pulse in
            gsap.from('.timeline-dot', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                scale: 0,
                opacity: 0,
                stagger: 0.3,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative max-w-4xl mx-auto px-6 flex flex-col space-y-12">
            {/* Animated vertical line */}
            <div
                ref={lineRef}
                className="absolute top-0 bottom-0 left-8 md:left-1/2 w-[2px] origin-top"
                style={{
                    background: 'linear-gradient(180deg, #6366f1, #8b5cf6, #22d3ee)',
                    boxShadow: '0 0 8px rgba(139, 92, 246, 0.3)',
                }}
            />

            {timelineData.map((item, index) => (
                <div
                    key={index}
                    className={`timeline-card relative z-10 flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                >
                    {/* Node */}
                    <div className="absolute left-8 md:left-1/2 -ml-3 md:-ml-4 mt-1.5 md:mt-0">
                        <div
                            className="timeline-dot w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-[#050508] flex items-center justify-center"
                            style={{
                                background: item.color,
                                boxShadow: `0 0 15px ${item.color}60, 0 0 30px ${item.color}20`,
                            }}
                        />
                    </div>

                    {/* Card */}
                    <div className="ml-20 md:ml-0 md:w-1/2">
                        <div
                            className={`glass-card p-6 group ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <item.icon className="text-gray-400 group-hover:text-white transition-colors" size={18} />
                                <span
                                    className="text-sm font-mono font-medium"
                                    style={{ color: item.color }}
                                >
                                    {item.year}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1 text-white">{item.title}</h3>
                            <p className="text-gray-500 text-sm mb-3">{item.company}</p>
                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
