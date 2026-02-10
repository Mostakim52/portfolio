'use client';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const logoRef = useRef(null);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // Entrance animation (delayed for preloader)
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 2.8,
            });

            gsap.from(logoRef.current, {
                x: -30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 3.1,
            });

            gsap.from(linksRef.current, {
                y: -20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(2)',
                delay: 3.3,
            });
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[#050508]/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    ref={logoRef}
                    className="text-2xl font-bold gradient-text-static hover:opacity-80 transition-opacity"
                    data-cursor="link"
                    data-magnetic="0.2"
                >
                    MH.
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            ref={(el) => (linksRef.current[i] = el)}
                            className="text-sm font-medium tracking-wide uppercase text-gray-300 relative group"
                            data-cursor="link"
                            data-magnetic="0.25"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-b border-white/[0.06]">
                    <div className="flex flex-col p-6 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg text-gray-300 hover:text-purple-400 transition-colors py-2 border-b border-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
