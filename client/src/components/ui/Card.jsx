function Card({ children, className = "", padding = true, as: Tag = "div" }) {
  return (
    <Tag
      className={`
        bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl
        shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]
        ${padding ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ title, action, subtitle }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export default Card;
