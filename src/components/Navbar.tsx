import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BarChart, Target, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PomodoroTimer from './PomodoroTimer'; // Ensure this import is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-800 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <img 
              src="/images/logo+name.png"
              alt="MentorAI Logo"
              className="w-12 h-12 object-contain border-3 border-white rounded-md"
            />
            <span className="text-white text-2xl font-bold">MentorAI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/dashboard"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-green-700' 
                  : 'hover:bg-green-600 hover:text-gray-100'}` 
              }
            >
              <div className="flex items-center gap-2">
                <BarChart size={20} />
                <span>Dashboard</span>
              </div>
            </NavLink>

            <NavLink 
              to="/daily-challenge"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-green-700' 
                  : 'hover:bg-green-600 hover:text-gray-100'}` 
              }
            >
              <div className="flex items-center gap-2">
                <Target size={20} />
                <span>Daily Challenge</span>
              </div>
            </NavLink>

            <NavLink 
              to="/choose-domain"
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-green-700' 
                  : 'hover:bg-green-600 hover:text-gray-100'}` 
              }
            >
              <div className="flex items-center gap-2">
                <Compass size={20} />
                <span>Choose Domain</span>
              </div>
            </NavLink>

            {/* Compact Pomodoro Timer */}
            <PomodoroTimer initialMinutes={25} size="sm" />

            <button 
              onClick={handleLogout} 
              className="ml-6 px-4 py-2 rounded-lg text-red-400 hover:bg-red-700 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <NavLink 
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300
              ${isActive 
                ? 'text-green-700 bg-green-100' 
                : 'text-gray-700 hover:bg-green-200 hover:text-green-700'}` 
            }
          >
            <div className="flex items-center gap-2">
              <BarChart size={18} />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink 
            to="/daily-challenge"
            onClick={closeMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300
              ${isActive 
                ? 'text-green-700 bg-green-100' 
                : 'text-gray-700 hover:bg-green-200 hover:text-green-700'}` 
            }
          >
            <div className="flex items-center gap-2">
              <Target size={18} />
              <span>Daily Challenge</span>
            </div>
          </NavLink>

          <NavLink 
            to="/choose-domain"
            onClick={closeMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300
              ${isActive 
                ? 'text-green-700 bg-green-100' 
                : 'text-gray-700 hover:bg-green-200 hover:text-green-700'}` 
            }
          >
            <div className="flex items-center gap-2">
              <Compass size={18} />
              <span>Choose Domain</span>
            </div>
          </NavLink>

          <button 
            onClick={handleLogout} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
