const variants = {
  primary:
    "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25",
  secondary:
    "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",
  ghost: "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10",
  danger: "bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/20",
  outline: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800/80",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 rounded-xl",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition
        disabled:opacity-50 disabled:pointer-events-none
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

export default Button;
