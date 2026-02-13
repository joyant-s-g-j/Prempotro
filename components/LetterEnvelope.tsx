"use client"

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

interface LetterEnvelopeProps {
  recipientName: string;
  onClick: () => void;
}

const LetterEnvelope = ({ recipientName, onClick }: LetterEnvelopeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const theme = {
    colors: {
      bg: "bg-[#1a1a1a]",
      envelope: "bg-[#f0e6d2]",
      envelopeDark: "bg-[#e2d5c3]",
      seal: "bg-red-800",
      text: "text-[#f0e6d2]",
      muted: "text-[#f0e6d2]/60"
    },
    fonts: {
      bangla: "font-bangla",
      inter: "font-inter",
      body: "font-inter"
    }
  };

  useEffect(() => {
    if (envelopeRef.current) {
      gsap.to(envelopeRef.current, {
        y: -15,
        rotation: 2,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }, []);

  const handleOpen = () => {
    if (containerRef.current && envelopeRef.current) {
      const tl = gsap.timeline({ onComplete: onClick });

      tl.to(envelopeRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "back.out(1.5)"
      })
      .to(envelopeRef.current, {
        scale: 25,
        opacity: 0,
        rotate: 5,
        duration: 1.5,
        ease: "power2.in",
        delay: 0.1
      });
    }
  };
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${theme.colors.bg} ${theme.colors.text} p-6 cursor-pointer overflow-hidden`}
      onClick={handleOpen}
    >
      <div 
        ref={envelopeRef}
        className={`relative w-72 h-44 md:w-96 md:h-60 ${theme.colors.envelope} rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex items-center justify-center transform transition-transform`}
      >
        <div className={`absolute inset-0 overflow-hidden rounded-xl ${theme.colors.envelopeDark} border border-[#d4c5b0]`}>
          {/* Fold design */}
          <div className="absolute top-0 left-0 border-l-144 md:border-l-192 border-l-transparent border-t-90 md:border-t-120 border-t-[#dccbb1] border-r-144 md:border-r-192 border-r-transparent w-0 h-0 filter brightness-95"></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${theme.colors.seal} flex items-center justify-center shadow-2xl border border-red-900/40 ring-4 ring-red-800/10`}>
              <span className="text-2xl opacity-90">💌</span>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-full text-center px-4">
            <p className={`${theme.fonts.inter} text-[#5c4d3c] text-lg md:text-xl font-medium italic tracking-wide truncate`}>
              {recipientName}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center space-y-4 animate-fade-in-up">
        <h2 className={`text-2xl md:text-4xl ${theme.fonts.bangla} font-medium tracking-wide leading-tight`}>
          তোমার নামে একটি প্রেমপত্র এসেছে
        </h2>
        <div className="flex flex-col items-center gap-2">
          <p className={`text-xs md:text-sm ${theme.colors.muted} font-medium uppercase tracking-[0.4em]`}>
            Tap to Open Ceremony
          </p>
          <div className="w-1 h-12 bg-linear-to-b from-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}

export default LetterEnvelope