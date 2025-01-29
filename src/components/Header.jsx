/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "./Navbar";
import ProfileButton from "./User/ProfileButton";

function Header({ variant = "default" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSimple = variant === "auth";

  return (
    <header className="bg-gray-800 text-white shadow-xl">
      <div className="p-4 flex md:flex-row gap-4  justify-between flex-col">
        <div className="flex flex-row gap-4">
          {!isSimple && (
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "×" : "☰"}
            </button>
          )}
          <h1 className="text-2xl font-bold">Finance Tracker</h1>
        </div>
        {!isSimple && (
          <div className="flex flex-row gap-2 items-center">
            <ProfileButton />
          </div>
        )}
        {!isSimple && isMenuOpen && (
          <div className="md:hidden border-t-2 border-gray-700">
            <Navbar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          </div>
        )}
      </div>
      {/* {!isSimple && (
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
        )} */}

      {/* Mobile menu
      {!isSimple && isMenuOpen && (
        <div className="md:hidden border-t-2 border-gray-700">
          <Navbar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </div>
      )} */}
    </header>
  );
}

export default Header;
