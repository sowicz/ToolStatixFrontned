import type { FC } from "react";

interface Props {
  title?: string;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Topbar: FC<Props> = ({ title = "Dashboard", open, setOpen }) => {
  return (
    <header className="h-14 w-full border-b border-gray-300 bg-white flex items-center justify-between px-4 md:pl-8">
      <div className="flex items-center gap-3">
        {/* on desktop we keep some left padding because content is shifted by md:ml-64 */}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {/* hamburger only on mobile */}
      <button
        className="md:hidden p-2 border border-gray-300 rounded"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </header>
  );
};

export default Topbar;
