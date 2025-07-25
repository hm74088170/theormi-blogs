import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; 
import { FaBlog } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

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
      className={`sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 text-white transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-black"
      }`}
    >
      <div className="flex items-center gap-3 text-2xl font-bold">
        <FaBlog />
        <span>THEOARMI</span>
      </div>

      <nav className="flex gap-4 ">
        <Link
          to="/"
          className="px-4 py-2 text-2xl font-bold"
        >
          <FaHome />
        </Link>
        <Link
          to="/admin"
          className="px-4 py-2 text-2xl font-bold"
        >
          <GrUserAdmin />
        </Link>
        {isLoggedIn && (
          <Link
            onClick={handleLogout}
            className="px-4 py-2 text-2xl font-bold"
          >
            <FiLogOut />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
