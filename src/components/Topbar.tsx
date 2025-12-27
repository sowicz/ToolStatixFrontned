import type { FC } from "react";

interface Props {
  onMenuClick: () => void;
}

const TopBar: FC<Props> = ({ onMenuClick }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-gray-300 flex items-center px-4">
      <button onClick={onMenuClick} aria-label="Open menu">
        ☰
      </button>

      <span className="ml-4 font-semibold text-gray-700">
        TOOLSTATIX
      </span>
    </header>
  );
};

export default TopBar;
