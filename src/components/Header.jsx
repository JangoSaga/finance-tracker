/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar";
import ProfileButton from "./User/ProfileButton";

function Header({ variant = "default" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSimple = variant === "auth";

  return (
    <header className="bg-gray-800 text-white shadow-xl">
      <div className="p-4 flex flex-row gap-4 items-center justify-between">
        {!isSimple && (
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        )}
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
        {!isSimple && (
          <div className="flex flex-row gap-2 items-center">
            <ProfileButton />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {!isSimple && isMenuOpen && (
        <div className="md:hidden border-t-2 border-gray-700">
          <Navbar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </div>
      )}
    </header>
  );
}

export default Header;
