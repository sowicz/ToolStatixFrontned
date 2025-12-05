import { Link } from "react-router";
import type { FC } from "react";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Sidebar: FC<Props> = ({ open, setOpen }) => {
  return (
    <>
      {/* overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
        />
      )}

      {/* fixed sidebar */}
      <nav
        className={`
          fixed top-0 left-0 z-30
          h-screen w-full md:w-64
          bg-white border-r border-gray-300
          p-4 pt-6 transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* mobile header inside sidebar */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-lg font-bold">ToolStatix</h1>
          <button
            className="p-2 border border-gray-300 rounded"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* desktop title */}
        <h1 className="text-2xl font-bold mb-6 hidden md:block">Tool Statix</h1>

        <ul className="space-y-4">
          <li>
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/" onClick={() => setOpen(false)}>Dashboard</Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/machine" onClick={() => setOpen(false)}>Machine</Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/network-data-sources" onClick={() => setOpen(false)}>Network Data Sources</Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/main-tags" onClick={() => setOpen(false)}>Main tags</Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/related-tags" onClick={() => setOpen(false)}>Related tags</Link>
          </li>
          <li>
            <Link className="block p-2 hover:bg-gray-100 rounded" to="/drivers" onClick={() => setOpen(false)}>Drivers</Link>
          </li>
          <li className="p-2 text-gray-500">Settings</li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
