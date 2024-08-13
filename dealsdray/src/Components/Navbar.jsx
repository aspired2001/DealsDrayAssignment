// Navbar.js

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-gray-800 p-4 top-0 sticky">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-white text-xl font-bold">Home</Link>
            <Link to="/employee-list" className="text-white text-xl font-bold ml-4">Employee List</Link>
          </div>
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
