'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import SkillsSection from '@/components/SkillsSection';
import Projects from '@/components/Projects';
import Highlights from '@/components/Highlights';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParticleField from '@/components/ParticleField';
import ScrollProgress from '@/components/ScrollProgress';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Marquee from '@/components/Marquee';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Page entrance after preloader
  useEffect(() => {
    if (preloaderDone && mainRef.current) {
      gsap.from(mainRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, [preloaderDone]);

  return (
    <>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <ParticleField />
      <ScrollProgress />

      <main ref={mainRef} className="relative z-10 noise-overlay scan-line">
        {/* Top halo / 3D-like gradient to fill empty space at the very top */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 flex justify-center">
          <div className="w-[520px] h-[520px] rounded-full bg-gradient-to-b from-indigo-500/35 via-purple-500/20 to-transparent blur-[140px] animate-[float-slow_18s_ease-in-out_infinite]" />
        </div>

        <Navbar />
        <Hero />

        <Marquee text="CREATIVE DEVELOPER" repeat={4} direction="left" />
        <div className="section-divider" />

        <About />
        <div className="section-divider" />

        <SkillsSection />

        <Marquee text="SKILLS & EXPERTISE" repeat={4} direction="right" />
        <div className="section-divider" />

        <Highlights />

        <Marquee text="HIGHLIGHTS & PUBLICATIONS" repeat={4} direction="left" />
        <div className="section-divider" />

        <Projects />

        <Marquee text="FEATURED WORK" repeat={5} direction="left" />
        <div className="section-divider" />

        <Contact />
        <Footer />
      </main>
    </>
  );
}
