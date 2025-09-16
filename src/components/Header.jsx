/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar";
import ProfileButton from "./User/ProfileButton";

function Header({ variant = "default" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSimple = variant === "auth";

  return (
    <header className="bg-gray-800 text-white shadow-xl w-full z-1 fixed">
      <div className="p-4 gap-4 justify-between flex flex-row">
        <div className="flex flex-row gap-4 text-2xl">
          {!isSimple && (
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "×" : "☰"}
            </button>
          )}
          <span className="font-bold flex flex-col justify-center">
            Finance Tracker
          </span>
        </div>
        {!isSimple && (
          <div className="flex flex-row gap-2 items-center">
            <ProfileButton />
          </div>
        )}
      </div>
      {!isSimple && isMenuOpen && (
        <div className="md:hidden border-t-2 border-gray-700">
          <Navbar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </div>
      )}
    </header>
  );
}

export default Header;
