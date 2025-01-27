import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Navbar setIsMenuOpen={() => {}} />
        <main className="p-6 flex-grow overflow-y-auto h-[calc(100vh-theme(spacing.20))] shadow-xl">
          <Outlet />
        </main>
      </div>
      <footer className="text-center py-4 bg-gray-800 text-white">
        © 2025 Finance Tracker. All rights reserved.
      </footer>
    </div>
  );
}

export default AppLayout;
