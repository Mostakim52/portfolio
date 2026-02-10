'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Socials from '@/components/Socials';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(footerRef.current, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 95%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Gradient divider */}
            <div className="section-divider" />

            <footer
                ref={footerRef}
                className="py-16 text-center text-gray-500 text-sm relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Logo */}
                    <span className="text-3xl font-bold gradient-text-static">MH.</span>

                    <Socials />

                    <div className="space-y-2">
                        <p className="text-gray-400">
                            Designed & built with ❤️ by <span className="text-purple-400">Mostakim Hossain</span>
                        </p>
                        <p className="text-gray-600">
                            &copy; {new Date().getFullYear()} &middot; Built with Next.js, GSAP & Anime.js
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
