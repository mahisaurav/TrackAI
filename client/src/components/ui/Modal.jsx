function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg cursor-default bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
        {children}
        {footer && <div className="flex justify-end gap-3 mt-6">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
