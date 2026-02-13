import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

function Textarea({ label, error, required, ...props }: TextareaProps) {
  return (
    <div className="group flex flex-col gap-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5c4d3c]/50 group-focus-within:text-[#8b0000] transition-colors">
          {label}
        </label>
        {required && <span className="text-[#8b0000]/30 text-[10px]">REQUIRED</span>}
      </div>
      
      <div className="relative">
        <textarea 
          className="w-full px-5 py-4 bg-white/40 backdrop-blur-sm border border-[#e2d5c3] focus:border-[#8b0000]/40 rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-300 text-[#2c1810] focus:bg-white focus:shadow-[0_10px_40px_-15px_rgba(139,0,0,0.1)] hover:bg-white/60 resize-none min-h-30"
          {...props}
        />
        {/* Modern Interactive Underline */}
        <div className="absolute inset-x-5 bottom-0 h-0.5 bg-linear-to-r from-transparent via-[#8b0000]/40 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 ease-out" />
      </div>

      {error && (
        <p className="px-1 text-[11px] text-red-500 font-bold uppercase tracking-wider animate-fade-in">
          * {error}
        </p>
      )}
    </div>
  )
}

export default Textarea