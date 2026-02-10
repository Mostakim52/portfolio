'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}';

export default function TextScramble({ text, Tag = 'span', className = '', triggerOnScroll = true }) {
    const elRef = useRef(null);
    const [displayed, setDisplayed] = useState('');
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = elRef.current;
        if (!el || hasAnimated.current) return;

        const scramble = () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;

            const finalText = text;
            const length = finalText.length;
            let frame = 0;
            const totalFrames = length * 2 + 10;
            const resolveOrder = [];

            // Create random resolve order
            for (let i = 0; i < length; i++) resolveOrder.push(i);
            for (let i = resolveOrder.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [resolveOrder[i], resolveOrder[j]] = [resolveOrder[j], resolveOrder[i]];
            }

            const resolved = new Array(length).fill(false);

            const tick = () => {
                frame++;
                const resolveProgress = frame / totalFrames;
                const numResolved = Math.floor(resolveProgress * length);

                // Mark characters as resolved
                for (let i = 0; i < numResolved && i < resolveOrder.length; i++) {
                    resolved[resolveOrder[i]] = true;
                }

                // Build display string
                let result = '';
                for (let i = 0; i < length; i++) {
                    if (finalText[i] === ' ') {
                        result += ' ';
                    } else if (resolved[i]) {
                        result += finalText[i];
                    } else {
                        result += chars[Math.floor(Math.random() * chars.length)];
                    }
                }

                setDisplayed(result);

                if (frame < totalFrames) {
                    requestAnimationFrame(tick);
                } else {
                    setDisplayed(finalText);
                }
            };

            // Start with random chars
            let initial = '';
            for (let i = 0; i < length; i++) {
                if (finalText[i] === ' ') initial += ' ';
                else initial += chars[Math.floor(Math.random() * chars.length)];
            }
            setDisplayed(initial);
            requestAnimationFrame(tick);
        };

        if (triggerOnScroll) {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: scramble,
            });
        } else {
            const timeout = setTimeout(scramble, 500);
            return () => clearTimeout(timeout);
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [text, triggerOnScroll]);

    return (
        <Tag ref={elRef} className={`${className} font-mono`}>
            {displayed || text}
        </Tag>
    );
}
