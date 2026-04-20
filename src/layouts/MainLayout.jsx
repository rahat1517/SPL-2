import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = String(localStorage.getItem("role") || "")
    .trim()
    .toLowerCase();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role={role} toggleSidebar={toggleSidebar} />

      <Sidebar
        role={role}
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      />

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}