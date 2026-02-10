'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextScramble from '@/components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: 'Programming & Development',
        color: '#8b5cf6',
        skills: [
            { name: 'Python', icon: '🐍' },
            { name: 'Java', icon: '☕' },
            { name: 'JavaScript', icon: '🟨' },
            { name: 'C / C++', icon: '💻' },
            { name: 'PHP', icon: '🐘' },
        ],
    },
    {
        title: 'Web & APIs',
        color: '#6366f1',
        skills: [
            { name: 'React / Next.js', icon: '⚛️' },
            { name: 'Node.js', icon: '🟢' },
            { name: 'Django / FastAPI', icon: '🌐' },
            { name: 'HTML / CSS', icon: '🧩' },
            { name: 'REST APIs', icon: '🔗' },
        ],
    },
    {
        title: 'AI / ML & Data',
        color: '#ec4899',
        skills: [
            { name: 'TensorFlow / PyTorch', icon: '🧠' },
            { name: 'Scikit‑Learn', icon: '📈' },
            { name: 'Computer Vision', icon: '👁️' },
            { name: 'Speech & Audio', icon: '🎧' },
            { name: 'NLP · CNN / Transformer / BiLSTM', icon: '💬' },
            { name: 'Pandas / NumPy / Matplotlib', icon: '📊' },
        ],
    },
    {
        title: 'Embedded, Databases & Tools',
        color: '#22d3ee',
        skills: [
            { name: 'Embedded / IoT (MCU prototyping)', icon: '📡' },
            { name: 'MongoDB / MySQL', icon: '🗄️' },
            { name: 'Git / GitHub', icon: '' },
            { name: 'Postman', icon: '📮' },
            { name: 'Excel / Data Handling', icon: '📑' },
            { name: 'Discord / Trello', icon: '🧩' },
        ],
    },
];

export default function SkillsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Category cards stagger (but keep them visible before scroll)
            gsap.fromTo(
                '.skill-category',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.9,
                    ease: 'power3.out',
                    immediateRender: false,
                }
            );

            // Tilt effect on category cards
            const cards = sectionRef.current.querySelectorAll('.skill-category');
            cards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = -(y - centerY) / 20;
                    const rotateY = (x - centerX) / 20;

                    gsap.to(card, {
                        rotateX,
                        rotateY,
                        duration: 0.3,
                        ease: 'power2.out',
                        transformPerspective: 800,
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="py-28 px-6 relative" ref={sectionRef}>
            {/* Background */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    <TextScramble text="Skills & Expertise" Tag="span" className="gradient-text !font-bold" />
                </h2>
                <p className="text-gray-500 text-center mb-16 max-w-lg mx-auto">
                    Technologies I work with to bring ideas to life
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="skill-category glass-card p-8 group"
                            data-cursor="card"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <h3
                                className="text-xl font-bold mb-6 flex items-center gap-3"
                                style={{ color: category.color }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        background: category.color,
                                        boxShadow: `0 0 8px ${category.color}60`,
                                    }}
                                />
                                {category.title}
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, sIndex) => (
                                    <div
                                        key={sIndex}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm"
                                        style={{
                                            boxShadow: `0 0 18px ${category.color}22`,
                                        }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                                            style={{
                                                background: `${category.color}22`,
                                                color: category.color,
                                                boxShadow: `0 0 10px ${category.color}55`,
                                            }}
                                        >
                                            <span>{skill.icon}</span>
                                        </div>
                                        <span className="text-sm text-gray-200 whitespace-nowrap">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
