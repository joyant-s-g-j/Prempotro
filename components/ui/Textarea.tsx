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
        <label className="block text-lg font-trio font-semibold text-rose-800/80 mb-1.5 transition-colors group-focus-within:text-rose-600">
        {label} 
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      </div>
      
      <div className="relative">
        <textarea 
          className="w-full font-trio px-5 py-3.5 bg-white/70 backdrop-blur-sm border-2 border-transparent focus:border-rose-400 rounded-2xl outline-none shadow-sm transition-all duration-300 placeholder:text-rose-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,157,0.15)] ring-offset-2 hover:bg-white/90"
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