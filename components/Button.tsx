import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', href, className = '', disabled = false, target, rel }) => {
  const baseClasses = "inline-block text-center font-bold rounded-lg transition-all duration-300 ease-in-out text-base py-3 px-8 focus:outline-none focus:ring-4";

  const variantClasses = {
    primary: "bg-[#9B5CFF] text-white shadow-lg shadow-[#9B5CFF]/20 hover:bg-opacity-90 hover:shadow-xl hover:shadow-[#9B5CFF]/30 focus:ring-[#9B5CFF]/50",
    secondary: "border-2 border-[#39E2FF] text-[#39E2FF] bg-transparent hover:bg-[#39E2FF]/10 hover:text-white focus:ring-[#39E2FF]/50",
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;
  
  if (href) {
    if (disabled) {
      return <span className={classes}>{children}</span>;
    }
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;