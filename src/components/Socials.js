'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
    Facebook, Github, Linkedin, Twitter, Instagram, Music, Ghost,
} from 'lucide-react';

const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Mostakim52', color: '#8b5cf6' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/mostakimhossain', color: '#6366f1' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/mostakim.rubaiyat', color: '#3b82f6' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/mostakim.rubaiyat/', color: '#ec4899' },
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/Mostakim52', color: '#22d3ee' },
    { name: 'Spotify', icon: Music, href: 'https://open.spotify.com/user/31vtxswenmmj3xu5ztwarljjqypy?si=9962bc9af1104559', color: '#22c55e' },
    { name: 'Snapchat', icon: Ghost, href: 'https://www.snapchat.com/add/mostakim52?share_id=PDbwrLHVf58&locale=en-GB', color: '#eab308' },
];

export default function Socials() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const icons = container.querySelectorAll('.social-icon');
        icons.forEach((icon) => {
            const color = icon.getAttribute('data-color');

            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    y: -6,
                    scale: 1.15,
                    boxShadow: `0 0 20px ${color}40, 0 8px 20px rgba(0,0,0,0.3)`,
                    borderColor: `${color}60`,
                    duration: 0.3,
                    ease: 'back.out(2)',
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    y: 0,
                    scale: 1,
                    boxShadow: 'none',
                    borderColor: 'rgba(255,255,255,0.08)',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });
    }, []);

    return (
        <div ref={containerRef} className="flex flex-wrap gap-3 justify-center">
            {socialLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon p-3 bg-white/[0.03] rounded-full border border-white/[0.08] text-gray-400 hover:text-white transition-colors duration-300"
                    aria-label={social.name}
                    data-color={social.color}
                >
                    <social.icon size={20} />
                </a>
            ))}
        </div>
    );
}
