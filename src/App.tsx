import { Routes, Route } from "react-router";
import { useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home";
import Machine from "./pages/Machine";
import NetworkDataSources from "./pages/NetworkDataSources";
import MainTags from "./pages/MainTags";
import RelatedTags from "./pages/RelatedTags";
import Drivers from "./pages/Drivers";
import Settings from "./pages/Settings";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* TOP BAR – MOBILE ONLY */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-gray-300 flex items-center px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="text-2xl"
        >
          ☰
        </button>

        <span className="ml-4 font-semibold text-gray-700">
          Menu
        </span>
      </header>

      {/* OVERLAY – MOBILE ONLY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* CONTENT */}
        <div className="flex-1 flex flex-col min-h-screen md:ml-64">
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4 pt-20 md:pt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/machine" element={<Machine />} />
              <Route path="/network-data-sources" element={<NetworkDataSources />} />
              <Route path="/main-tags" element={<MainTags />} />
              <Route path="/related-tags" element={<RelatedTags />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}
