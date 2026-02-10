'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: -100, y: -100 });
    const mouse = useRef({ x: -100, y: -100 });
    const isVisible = useRef(false);

    useEffect(() => {
        // Don't show on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        document.documentElement.classList.add('custom-cursor-active');

        const onMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            if (!isVisible.current) {
                isVisible.current = true;
                gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
            }

            // Dot follows immediately
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
            });

            // Ring follows with lag
            gsap.to(ring, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power3.out',
            });
        };

        const onMouseLeave = () => {
            isVisible.current = false;
            gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
        };

        const onMouseEnter = () => {
            isVisible.current = true;
            gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        };

        // Hover detection for interactive elements
        const handleHoverEnter = (e) => {
            const el = e.target;
            if (!el || typeof el.closest !== 'function') return;
            const target = el.closest('[data-cursor]');
            if (!target) return;
            const type = target.getAttribute('data-cursor');

            if (type === 'link' || type === 'button') {
                gsap.to(ring, {
                    width: 60,
                    height: 60,
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                    duration: 0.3,
                    ease: 'power2.out',
                });
                gsap.to(dot, {
                    scale: 0.5,
                    duration: 0.3,
                });
            } else if (type === 'text') {
                gsap.to(ring, {
                    width: 80,
                    height: 80,
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    mixBlendMode: 'difference',
                    duration: 0.3,
                });
            } else if (type === 'card') {
                gsap.to(ring, {
                    width: 50,
                    height: 50,
                    borderColor: 'rgba(236, 72, 153, 0.4)',
                    duration: 0.3,
                });
            }
        };

        const handleHoverLeave = (e) => {
            const el = e.target;
            if (!el || typeof el.closest !== 'function') return;
            const target = el.closest('[data-cursor]');
            if (!target) return;
            gsap.to(ring, {
                width: 36,
                height: 36,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                mixBlendMode: 'normal',
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(dot, {
                scale: 1,
                duration: 0.3,
            });
        };

        // Magnetic effect
        const magnetics = document.querySelectorAll('[data-magnetic]');
        const magneticHandlers = [];
        magnetics.forEach((el) => {
            const move = (e) => {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                const strength = parseFloat(el.getAttribute('data-magnetic') || '0.3');
                gsap.to(el, {
                    x: dx * strength,
                    y: dy * strength,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };
            const leave = () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.4)',
                });
            };
            el.addEventListener('mousemove', move);
            el.addEventListener('mouseleave', leave);
            magneticHandlers.push({ el, move, leave });
        });

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseenter', handleHoverEnter, true);
        document.addEventListener('mouseleave', handleHoverLeave, true);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseenter', handleHoverEnter, true);
            document.removeEventListener('mouseleave', handleHoverLeave, true);
            document.documentElement.classList.remove('custom-cursor-active');
            magneticHandlers.forEach(({ el, move, leave }) => {
                el.removeEventListener('mousemove', move);
                el.removeEventListener('mouseleave', leave);
            });
        };
    }, []);

    return (
        <>
            {/* Inner dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#fff',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    mixBlendMode: 'difference',
                }}
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'width 0.3s, height 0.3s',
                }}
            />
        </>
    );
}
