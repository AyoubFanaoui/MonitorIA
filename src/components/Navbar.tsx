import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BarChart, Target, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PomodoroTimer from './PomodoroTimer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

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
    <nav className="bg-[#035d61] shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 :px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
          <img src="/images/logohw.png" alt="MentorAI Logo" className="h-10 w-auto" />


          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center w-full ml-10 justify-between">
            {/* Left - Pomodoro */}
            <div className="flex items-center space-x-4">
              <PomodoroTimer initialMinutes={25} size="sm" />
            </div>

            {/* Right - Links + Logout */}
            <div className="flex items-center space-x-6">
              <NavLink 
                to="/dashboard"
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-[#106861] bg-[#aeea00]'
                    : 'text-gray-200 hover:text-white hover:bg-[#106861]'}`
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
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-[#106861] bg-[#aeea00]'
                    : 'text-gray-200 hover:text-white hover:bg-[#106861]'}`
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
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-[#106861] bg-[#aeea00]'
                    : 'text-gray-200 hover:text-white hover:bg-[#106861]'}`
                }
              >
                <div className="flex items-center gap-2">
                  <Compass size={20} />
                  <span>Choose Domain</span>
                </div>
              </NavLink>

              <button 
                onClick={handleLogout} 
                className="px-4 py-2 rounded-lg text-white hover:bg-[#106861] transition-all duration-300 flex items-center gap-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#106861] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#aeea00]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg rounded-b-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Pomodoro first */}
          <div className="px-3 py-2 flex items-center justify-start">
            <PomodoroTimer initialMinutes={25} size="sm" />
          </div>

          {/* Other Links */}
          <NavLink 
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium transition-all duration-300
              ${isActive 
                ? 'text-[#106861] bg-[#aeea00]' 
                : 'text-gray-700 hover:bg-[#106861] hover:text-white'}`
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
                ? 'text-[#106861] bg-[#aeea00]'
                : 'text-gray-700 hover:bg-[#106861] hover:text-white'}`
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
                ? 'text-[#106861] bg-[#aeea00]'
                : 'text-gray-700 hover:bg-[#106861] hover:text-white'}`
            }
          >
            <div className="flex items-center gap-2">
              <Compass size={18} />
              <span>Choose Domain</span>
            </div>
          </NavLink>

          {/* Logout */}
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
