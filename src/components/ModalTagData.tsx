import type { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function ModalTagData({ open, onClose, title, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="
          bg-white rounded-lg shadow-lg
          w-full max-w-4xl
          max-h-[90vh]
          flex flex-col
          relative
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          {title && (
            <h2 className="text-xl font-semibold">{title}</h2>
          )}

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
