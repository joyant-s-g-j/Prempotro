import React from 'react'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderWidth?: number;
}

const GlassCard = ({ children, className = "", ...props }: GlassCardProps) => {
  return (
    <div 
      className={`
        bg-white/70 
        backdrop-blur-2xl 
        border 
        border-white/50 
        rounded-4xl 
        shadow-[0_20px_60px_-15px_rgba(255,45,117,0.15)] 
        transition-all 
        duration-500
        hover:shadow-[0_30px_80px_-20px_rgba(255,45,117,0.15)]
        hover:border-white/70
        relative
        overflow-hidden
        ${className}
      `}
      {...props}
    >
      {/* Subtle Texture/Mesh */}
      <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default GlassCard