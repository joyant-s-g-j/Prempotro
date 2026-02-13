import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const Input = ({ label, error, required, ...props }: InputProps) => {
  return (
    <div className="group relative">
      <label className="block text-lg font-trio font-semibold text-rose-800/80 mb-1.5 transition-colors group-focus-within:text-rose-600">
        {label} 
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      
      <div className="relative">
        <input 
          className="w-full font-trio px-5 py-3.5 bg-white/70 backdrop-blur-sm border-2 border-transparent focus:border-rose-400 rounded-2xl outline-none shadow-sm transition-all duration-300 placeholder:text-rose-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,157,0.15)] ring-offset-2 hover:bg-white/90"
          {...props}
        />
        {/* Glow effect on focus */}
        <div className="absolute inset-0 rounded-2xl bg-rose-400/20 opacity-0 -z-10 blur-xl transition-opacity duration-300 peer-focus:opacity-100 pointer-events-none" />
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium animate-shake pl-1">
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}

export default Input