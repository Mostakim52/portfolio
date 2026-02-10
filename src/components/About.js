'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Code2, Brain, Zap, Coffee } from 'lucide-react';
import Timeline from '@/components/Timeline';
import TextScramble from '@/components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: <Code2 size={22} />, label: 'Projects Built', value: '15+' },
    { icon: <Zap size={22} />, label: 'Technologies Used', value: '20+' },
    { icon: <Brain size={22} />, label: 'AI / ML Projects', value: '5+' },
    { icon: <Coffee size={22} />, label: 'Talks / Workshops', value: '8+' },
];

export default function About() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text slide in from left
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                },
                x: -60,
                opacity: 100,
                duration: 1,
                ease: 'power3.out',
            });

            // Image from right
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 80%',
                },
                x: 60,
                opacity: 100,
                duration: 1,
                ease: 'power3.out',
            });

            // Stats cards stagger
            gsap.from('.stat-card', {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 85%',
                },
                y: 40,
                opacity: 100,
                stagger: 0.15,
                duration: 0.8,
                ease: 'back.out(1.5)',
            });

            // Counter animation for stats
            document.querySelectorAll('.stat-value').forEach((el) => {
                const value = el.getAttribute('data-value');
                const numericMatch = value.match(/\d+/);
                if (numericMatch) {
                    const target = parseInt(numericMatch[0]);
                    const suffix = value.replace(/\d+/, '');
                    const counter = { val: 0 };

                    ScrollTrigger.create({
                        trigger: el,
                        start: 'top 90%',
                        once: true,
                        onEnter: () => {
                            gsap.to(counter, {
                                val: target,
                                duration: 2,
                                ease: 'power2.out',
                                onUpdate: () => {
                                    el.textContent = Math.round(counter.val) + suffix;
                                },
                            });
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="py-28 px-6 relative" ref={sectionRef}>
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                    <TextScramble text="About Me" Tag="span" className="gradient-text !font-bold" />
                </h2>

                <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
                    {/* Text */}
                    <div ref={textRef}>
                        <h3 className="text-2xl font-bold mb-6 text-white">
                            Beyond <span className="text-purple-400">Code</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            I&apos;m a Computer Science student at North South University with a focus on
                            full‑stack development and applied AI. I work with Python, Java, JavaScript,
                            C/C++, and modern stacks like React, Node.js, Django, and FastAPI to build
                            end‑to‑end web applications and APIs.
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                            My recent work includes embedded IoT prototypes and deep learning projects in
                            speech and NLP, such as hybrid CNN‑Transformer and CNN‑BiLSTM models for Bengali
                            emotion detection. I care about building practical systems that solve real
                            problems for my campus and community.
                        </p>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="relative group" data-cursor="card">
                        <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10">
                            <Image
                                src="/assets/profile2.jpeg"
                                alt="Mostakim Hossain"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
                        </div>

                        {/* Corner accents */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-purple-500/50 rounded-tl-lg" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-pink-500/50 rounded-bl-lg" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-indigo-500/50 rounded-br-lg" />
                    </div>
                </div>

                {/* Quick Stats */}
                <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 auto-rows-fr">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-card glass-card p-6 text-center group h-full flex flex-col items-center justify-center rounded-2xl border border-white/10"
                            data-cursor="card"
                        >
                            <div className="text-purple-400 mb-3 flex justify-center group-hover:text-cyan-400 transition-colors duration-300">
                                {stat.icon}
                            </div>
                            <div
                                className="stat-value text-2xl font-bold text-white mb-1"
                                data-value={stat.value}
                            >
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <h3 className="text-2xl font-bold mb-10 text-center text-white">
                    My <span className="gradient-text-static">Journey</span>
                </h3>
                <Timeline />
            </div>
        </section>
    );
}
