'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, ExternalLink } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

function LinkedInEmbed({ src }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 glass-card h-full w-full">
      <iframe
        src={src}
        style={{ border: 'none', width: '100%', height: '100%' }}
        allowFullScreen
        title="LinkedIn post"
        loading="lazy"
      />
    </div>
  );
}

function FacebookEmbed({ src }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 glass-card h-full w-full">
      <iframe
        src={src}
        style={{ border: 'none', width: '100%', height: '100%', overflow: 'hidden' }}
        scrolling="no"
        allow="encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="Facebook post"
        loading="lazy"
      />
    </div>
  );
}

export default function Highlights() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.highlight-block', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="highlights" className="py-24 px-6 relative" ref={sectionRef}>
      <div className="absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          <span className="gradient-text">Highlights & Publications</span>
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
          Direct embeds of the content I&apos;m proud of — social posts and peer-reviewed work.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* LinkedIn */}
          <div className="highlight-block flex flex-col gap-3">
            <div className="h-[500px] flex-shrink-0">
              <LinkedInEmbed
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7351867408078295040?collapsed=1"
              />
            </div>
            <p className="text-xs text-gray-500 text-center flex-shrink-0">
              A project I shared on LinkedIn.
            </p>
          </div>

          {/* Facebook */}
          <div className="highlight-block flex flex-col gap-3">
            <div className="h-[500px] flex-shrink-0">
              <FacebookEmbed
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fieeewiensu%2Fposts%2Fpfbid02rqrGzzNRbU96Gg9AXmQ7zt4vmaWY3ziquHqN7ZUPg5wpLAZk9XjNma8qQTaFakPJl&show_text=false&width=350"
              />
            </div>
            <p className="text-xs text-gray-500 text-center flex-shrink-0">
              A workshop that I instructed at IEEE WIE NSU Student Branch WIE AG.
            </p>
          </div>

          {/* Springer publication card */}
          <div className="highlight-block glass-card-strong p-6 rounded-2xl border border-white/10 flex flex-col gap-4 h-full">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.15em] text-gray-400">
                Springer · Publication
              </div>
            </div>

            <div className="relative mt-2 rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] aspect-[4/3]">
              <Image
                src="/assets/raspberrypi.jpg" // replace with a screenshot/figure from your paper
                alt="Emotionally Aware Bangla Speech Systems publication"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mt-3">
              Bangla SER is hindered by small datasets, overfitting, and minimal real-world validation. Using merged data, MFCC-only features, noise-robust training, and an efficient CNN–BiLSTM, we achieve 82% accuracy and real-time Raspberry Pi performance. SER signals then guide an LLM for adaptive responses with incremental learning, forming the first continuously adaptive Bangla SER–LLM system.
            </p>

            <a
              href="https://link.springer.com/article/10.1007/s42979-026-04744-9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-sm text-purple-300 hover:text-purple-100 transition-colors"
            >
              <span>View on Springer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

