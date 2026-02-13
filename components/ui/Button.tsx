import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

const Button = ({
    children, 
    isLoading, 
    variant = "primary", 
    fullWidth = false,
    className = "",
    disabled,
    ...props 
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-lg font-semibold rounded-full transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    primary: "text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-[length:200%_auto] hover:bg-[position:right_center] shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-0.5",
    secondary: "bg-white text-rose-600 hover:bg-rose-50 shadow-md hover:shadow-lg border border-rose-100",
    outline: "bg-transparent border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60",
  };

  const widthStyles = fullWidth ? "w-full" : "";


  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyles} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {/* Shine effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
      )}
      
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button