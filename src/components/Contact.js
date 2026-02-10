'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Download } from 'lucide-react';
import TextScramble from '@/components/TextScramble';
import AnimatedButton from '@/components/AnimatedButton';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'mostakim.rubaiyat@gmail.com', color: '#8b5cf6' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+880 1319 674564', color: '#6366f1' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Dhaka, Bangladesh', color: '#ec4899' },
];

export default function Contact() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal
            gsap.from('.contact-text', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Contact items stagger
            gsap.from('.contact-item', {
                scrollTrigger: {
                    trigger: '.contact-item',
                    start: 'top 85%',
                },
                x: -40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'back.out(1.5)',
            });

            // Form card
            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 85%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Mouse-follow glow on form card
            const form = formRef.current;
            if (form) {
                const glowEl = form.querySelector('.form-glow');
                form.addEventListener('mousemove', (e) => {
                    const rect = form.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    if (glowEl) {
                        gsap.to(glowEl, {
                            left: x,
                            top: y,
                            opacity: 1,
                            duration: 0.3,
                        });
                    }
                });
                form.addEventListener('mouseleave', () => {
                    if (glowEl) {
                        gsap.to(glowEl, { opacity: 0, duration: 0.3 });
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" className="py-28 px-6 relative" ref={sectionRef}>
            {/* Background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center contact-text">
                    <TextScramble text="Get in Touch" Tag="span" className="gradient-text !font-bold" />
                </h2>
                <p className="text-gray-500 text-center mb-16 max-w-lg mx-auto contact-text">
                    Have a project in mind? Let&apos;s build something amazing together.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-white contact-text">
                            Let&apos;s <span className="text-purple-400">Collaborate</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-10 contact-text">
                            Whether it&apos;s a startup idea, a research project, or just a conversation about AI and the future of tech — I&apos;m always open to new opportunities.
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="contact-item flex items-center gap-4 group"
                                    data-cursor="link"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: `${info.color}15`,
                                            border: `1px solid ${info.color}20`,
                                            color: info.color,
                                        }}
                                    >
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{info.label}</p>
                                        <p className="text-sm text-gray-300 font-medium">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Download CV card (replaces right-side widget) */}
                    <div ref={formRef} className="glass-card-strong p-8 relative overflow-hidden flex items-center justify-center" data-cursor="pointer">
                        {/* Mouse-following glow */}
                        <div
                            className="form-glow absolute w-[300px] h-[300px] rounded-full pointer-events-none z-[0]"
                            style={{
                                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent 70%)',
                                transform: 'translate(-50%, -50%)',
                                opacity: 0,
                            }}
                        />

                        <div className="relative z-10 text-center w-full">
                            <h4 className="text-white text-2xl font-semibold mb-3">Download My CV</h4>
                            <p className="text-gray-400 mb-6">Prefer a quick overview? Download my résumé as a PDF.</p>

                            <a href="/assets/Mostakim_Hossain_CV.pdf" download rel="noopener noreferrer" className="inline-block">
                                <AnimatedButton variant="primary" className="px-8 py-4 text-lg">
                                    <span className="flex items-center gap-2 justify-center"><Download size={18} /> Download CV</span>
                                </AnimatedButton>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
