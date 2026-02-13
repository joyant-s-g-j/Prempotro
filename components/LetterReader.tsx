import React, { useEffect, useRef, useState } from 'react'

interface LetterReaderProps {
  message: string;
  photos: string[];
  partnerName: string;
  onComplete: () => void;
}

interface MemoryCardProps {
  src: string;
  index: number;
}

const MemoryCard = ({ src, index }: MemoryCardProps) => (
  <div 
    className="my-12 md:my-20 flex justify-center transform transition-all duration-1000 ease-out hover:rotate-0 hover:scale-[1.02]"
    style={{ transform: `rotate(${index % 2 === 0 ? '1.5deg' : '-1.5deg'})` }}
  >
    <div className="relative p-2 md:p-3 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 max-w-sm md:max-w-md w-full">
      <div className="relative aspect-4/3 w-full overflow-hidden filter sepia-[0.1] contrast-[0.95]">
        <img 
          src={src} 
          alt="Memory" 
          className="w-full h-full object-cover transition-transform duration-[5s] hover:scale-110"
        />
      </div>
      {/* Subtle paper texture/overlay effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/paper.png')]" />
    </div>
  </div>
);

const LetterReader = ({ message, photos, partnerName, onComplete }: LetterReaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  // Configuration for consistent spacing and typography
  const theme = {
    font: {
      bangla: "font-bangla",
      handwriting: "font-handwriting",
      inter: "font-inter"
    },
    color: {
      text: "text-[#2c1810]",
      accent: "text-[#8b0000]",
      muted: "text-gray-500"
    },
    spacing: {
      para: "mb-6 md:mb-8",
      section: "mb-12 md:mb-16"
    }
  };

  useEffect(() => {
    const rawParagraphs = message.split('\n').filter(p => p.trim().length > 0);
    setParagraphs(rawParagraphs);
  }, [message]);

  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (Math.abs(scrollHeight - clientHeight - scrollTop) < 50 || scrollHeight <= clientHeight) {
        onComplete();
      }
    };
    
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      setTimeout(checkScroll, 1000);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, [onComplete]);

  const renderNodes = () => {
    const nodes: React.ReactNode[] = [];
    let photoIndex = 0;
    const photoInterval = Math.max(1, Math.floor(paragraphs.length / (photos.length + 1)));
    
    // 1. Introduction
    nodes.push(
      <div key="intro" className={`mb-10 ${theme.font.bangla} text-4xl md:text-5xl font-bold ${theme.color.text} tracking-tight`}>
         প্রিয় {partnerName},
      </div>
    );

    // 2. Paragraphs + Interspersed Photos
    paragraphs.forEach((para, i) => {
      // Memory Interrupt
      if (i > 0 && i % photoInterval === 0 && photoIndex < photos.length) {
         nodes.push(<MemoryCard key={`photo-${photoIndex}`} src={photos[photoIndex]} index={photoIndex} />);
         photoIndex++;
      }

      const isBangla = /[\u0980-\u09FF]/.test(para);
      const fontClass = isBangla 
        ? `${theme.font.bangla} text-2xl md:text-3xl leading-relaxed` 
        : `${theme.font.handwriting} text-3xl md:text-4xl leading-relaxed`;

      nodes.push(
        <div key={`para-${i}`} className={`${theme.spacing.para} ${theme.color.text} ${fontClass} whitespace-pre-wrap`}>
           {para}
        </div>
      );
    });

    // 3. Remaining Photos
    while (photoIndex < photos.length) {
       nodes.push(<MemoryCard key={`photo-extra-${photoIndex}`} src={photos[photoIndex]} index={photoIndex} />);
       photoIndex++;
    }

    // 4. Final Signature
    nodes.push(
      <div key="signature" className="mt-20 mb-10 text-right">
        <p className={`${theme.font.bangla} text-4xl ${theme.color.muted} mb-2`}>ইতি,</p>
        <p className={`${theme.font.bangla} text-4xl md:text-6xl ${theme.color.accent} font-bold drop-shadow-sm`}>
          তোমারই 
        </p>
      </div>
    );

    return nodes;
  };

  const allNodes = renderNodes();
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-y-auto bg-[#fffdf5] z-20 px-6 py-12 md:px-0 scroll-smooth"
      style={{
        backgroundImage: 'linear-gradient(#caccce 1px, transparent 1px)',
        backgroundSize: window.innerWidth < 768 ? '30px 30px' : '60px 60px',
      }}
    >
      <div className="max-w-2xl mx-auto pt-24 pb-48">
        <div className="space-y-4">
           {allNodes.map((node, i) => (
              <div 
                key={i} 
                className="animate-fade-in-up"
                style={{ 
                  animationDelay: `${i * 1.5}s`, 
                  animationFillMode: 'both',
                  transitionProperty: 'opacity, transform'
                }}
              >
                {node}
              </div>
           ))}
        </div>
      </div>
      
      {/* Subtle Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.02)_100%)]" />

      {/* Floating Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 pointer-events-none transition-opacity hover:opacity-100">
         <div className="flex flex-col items-center gap-2">
            <span className={`text-xs uppercase tracking-[0.2em] font-medium text-gray-400 font-sans`}>Scroll to read</span>
            <span className="text-3xl text-gray-300">↓</span>
         </div>
      </div>
    </div>
  )
}

export default LetterReader