import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-white py-8 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Owner & Description */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Arjit Mishra</h2>
          <p className="text-sm text-gray-400">Blogging Website</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#contact" className="hover:text-gray-300">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:text-pink-500 transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-xl hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-xl hover:text-sky-400 transition" />
          </a>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Arjit Mishra. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
