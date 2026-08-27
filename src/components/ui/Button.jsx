import { forwardRef } from "react";

const variants = {
  primary:
    "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20",

  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",

  ghost:
    "text-white hover:text-blue-400",

  accent:
    "bg-amber-400 hover:bg-amber-300 text-[#0B0B0D] shadow-lg shadow-amber-400/20",
};

const sizes = {
  sm: "px-4 py-2 text-sm",

  md: "px-6 py-3 text-base",

  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-full
          font-medium
          transition-all
          duration-300
          hover:-translate-y-1
          active:scale-95
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;