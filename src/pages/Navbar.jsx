import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { FaBlog, FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("accessToken");
      navigate("/Login", {
        replace: true,
        state: { reset: true },
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full flex flex-wrap items-center justify-between px-4 md:px-6 py-3 md:py-4 text-white transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-black"
      }`}
    >
      <div className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-bold">
        <FaBlog className="text-white" />
        <span className="text-white">THEOARMI</span>
      </div>

      <nav className="flex gap-3 md:gap-6 mt-3 md:mt-0">
        <Link
          to="/"
          className="p-2 text-lg md:text-xl hover:text-blue-700 transition"
        >
          <FaHome />
        </Link>
        <Link
          to="/admin"
          className="p-2 text-lg md:text-xl hover:text-blue-700 transition"
        >
          <GrUserAdmin />
        </Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="p-2 text-lg md:text-xl hover:text-red-600 transition"
          >
            <FiLogOut />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
