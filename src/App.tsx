import { Routes, Route } from "react-router";
import { useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
// import Topbar from "./components/Topbar";

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
    <div className="flex">
      {/* Sidebar is fixed; it will sit on the left */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Content wrapper: on md+ we add left margin equal to sidebar width (64) */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* <Topbar title="Dashboard" open={sidebarOpen} setOpen={setSidebarOpen} /> */}

        {/* main area scrolls independently */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
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
  );
}
