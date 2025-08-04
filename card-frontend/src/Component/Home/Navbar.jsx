import React from 'react';
import { NavLink } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

function Navbar() {
  return (
    <>
      <nav className="bg-blue-50 shadow-md border-b border-gray-300 px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 ml-10">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-800">CARD</span>
        </div>

        {/* Center: Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-blue-600 font-semibold  transition duration-200 hover:text-blue-900 ${
                  isActive ? 'border-b-4 border-blue-600 pb-1 hover:border-blue-900' : ''
                }`
              }
            >
              Network
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/qr"
              className={({ isActive }) =>
                `text-blue-600 font-semibold  transition duration-200 hover:text-blue-900 ${
                  isActive ? 'border-b-4 border-blue-600 pb-1 hover:border-blue-900' : ''
                }`
              }
            >
              QR
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/home/profile"
              className={({ isActive }) =>
                `text-blue-600 font-semibold  transition duration-200 hover:text-blue-900 ${
                  isActive ? 'border-b-4 border-blue-600 pb-1 hover:border-blue-900' : ''
                }`
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Right: Sign Out Button */}
        <div>
          <NavLink
            to="/"
            className="bg-blue-600 text-white font-semibold px-4 py-1.5 rounded hover:bg-blue-700 transition duration-200 mr-10"
          >
            Sign Out
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
