'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
    "Hello",      // English
    "Bonjour",    // French
    "Hola",       // Spanish
    "Ciao",       // Italian
    "こんにちは",  // Japanese
    "안녕하세요",   // Korean
    "你好",       // Chinese
    "Olá",        // Portuguese
    "Привет",     // Russian
    "Salam",      // Arabic
    "नमस्ते"       // Hindi
];

export default function HelloAnimation({ onComplete }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Determine the duration for each word based on total animation time
        // We want the whole sequence to take about 2-3 seconds
        const intervalTime = 250;

        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev === greetings.length - 1) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Wait a bit after the last word
                    return prev;
                }
                return prev + 1;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }} // Apple-like system font
                >
                    {greetings[index]}
                </motion.span>
            </AnimatePresence>

            {/* Subtle indicator dot */}
            <motion.div
                className="absolute bottom-10 w-2 h-2 bg-white rounded-full"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            />
        </motion.div>
    );
}
