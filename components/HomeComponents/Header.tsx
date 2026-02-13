import React from 'react'

const Header = () => {
  return (
    <header className="text-center mb-10 md:mb-14">
        <div className="flex items-center justify-center gap-4 md:gap-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#fdfbf7] shadow-xl border border-[#e2d5c3] animate-scale-in">
                <span className="text-4xl md:text-5xl opacity-80">💌</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bangla font-bold text-[#2c1810] leading-tight drop-shadow-sm animate-fade-in-up">
                প্রেমপত্র
            </h1>
        </div>
        
        <p className="text-lg text-[#5c4d3c]/80 max-w-lg mx-auto leading-relaxed font-inter italic animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            "Write a letter that lasts forever..."
            <br />
            Create a timeless, digital reading experience for your beloved.
        </p>
    </header>
  )
}

export default Header