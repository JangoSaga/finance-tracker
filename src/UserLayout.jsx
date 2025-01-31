import { Outlet } from "react-router";
import Header from "./components/Header";

function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat">
      <Header variant="auth" />
      <main className="flex-grow flex items-center justify-center m-4 shadow-xl rounded-xl ">
        <Outlet />
      </main>
      <footer className="text-center py-4 bg-gray-800/80 backdrop-blur-sm text-white">
        © 2025 Finance Tracker. All rights reserved.
      </footer>
    </div>
  );
}

export default UserLayout;
