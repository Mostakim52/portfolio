'use client';
import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export default function AnimatedButton({
    children,
    onClick,
    href,
    className = '',
    variant = 'primary',
}) {
    const btnRef = useRef(null);

    const baseStyles = 'inline-flex items-center justify-center px-8 py-3.5 font-semibold rounded-full transition-all duration-300 relative overflow-hidden cursor-pointer';

    const variants = {
        primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]',
        secondary: 'border border-white/15 text-white hover:bg-white/5 hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]',
    };

    const handleMouseEnter = useCallback(() => {
        const btn = btnRef.current;
        if (!btn) return;
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(2)',
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        const btn = btnRef.current;
        if (!btn) return;
        gsap.to(btn, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
        });
    }, []);

    // Magnetic pull toward cursor
    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        gsap.to(btn, {
            x: dx * 0.2,
            y: dy * 0.2,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, []);

    const handleClick = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;

        // Ripple effect
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            width: 0; height: 0;
            left: ${x}px; top: ${y}px;
            transform: translate(-50%, -50%);
            pointer-events: none;
        `;
        btn.appendChild(ripple);

        gsap.to(ripple, {
            width: 200,
            height: 200,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
        });

        // Press effect
        gsap.to(btn, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'back.out(2)' });
            },
        });

        if (onClick) onClick(e);
    }, [onClick]);

    const Component = href ? 'a' : 'button';
    const linkProps = href ? { href, target: href.startsWith('#') ? undefined : '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <Component
            ref={btnRef}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            data-cursor="button"
            data-magnetic="0.3"
            {...linkProps}
        >
            {/* Shimmer overlay for primary */}
            {variant === 'primary' && (
                <span
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s infinite',
                    }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </Component>
    );
}
