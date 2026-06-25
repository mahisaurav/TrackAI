function Input({ className = "", ...props }) {
  return (
    <input
      className={`
        w-full bg-zinc-950/80 border border-zinc-700/80 rounded-xl px-4 py-3
        text-white placeholder:text-zinc-500 outline-none transition
        focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20
        ${className}
      `}
      {...props}
    />
  );
}

export default Input;
