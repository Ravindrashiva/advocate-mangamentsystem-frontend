import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";
import Topbar from "../components/Topbar";
import Toast from "../components/Toast";

export default function AppLayout() {
  const [search, setSearch] = useState("");
  return (
    <div className="h-screen w-full flex bg-bgsoft font-sans pl-0 md:pl-0 overflow-hidden">
      <Sidebar />
      <MobileSidebar />
      <main className="flex-1 min-w-0 flex flex-col pt-16 md:pt-0 h-full overflow-hidden">
        <Topbar search={search} setSearch={setSearch} />
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet context={{ search }} />
        </div>
      </main>
      <Toast />
    </div>
  );
}
