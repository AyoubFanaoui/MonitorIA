import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BarChart, Target, Compass, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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
    <nav className="bg-[#035d61] shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="/images/logohw.png" alt="MentorAI Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${isActive 
                  ? 'text-[#106861] bg-[#aeea00]' 
                  : 'text-gray-200 hover:text-white hover:bg-[#106861]'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <BarChart size={18} />
                <span>Dashboard</span>
              </div>
            </NavLink>

            <NavLink 
              to="/daily-challenge" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${isActive 
                  ? 'text-[#106861] bg-[#aeea00]'
                  : 'text-gray-200 hover:text-white hover:bg-[#106861]'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <Target size={18} />
                <span>Daily Challenge</span>
              </div>
            </NavLink>

            <NavLink 
              to="/choose-domain" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                ${isActive 
                  ? 'text-[#106861] bg-[#aeea00]'
                  : 'text-gray-200 hover:text-white hover:bg-[#106861]'
                }`
              }
            >
              <div className="flex items-center gap-2">
                <Compass size={18} />
                <span>Choose Domain</span>
              </div>
            </NavLink>

            <button 
              onClick={handleLogout} 
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#106861] transition-colors duration-200 flex items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#106861] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#aeea00]"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <NavLink 
            to="/dashboard" 
            onClick={closeMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 
              ${isActive 
                ? 'text-[#106861] bg-[#aeea00]'
                : 'text-[#035d61] hover:text-[#aeea00]'
              }`
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
              `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 
              ${isActive 
                ? 'text-[#106861] bg-[#aeea00]'
                : 'text-[#035d61] hover:text-[#aeea00]'
              }`
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
              `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 
              ${isActive 
                ? 'text-[#106861] bg-[#aeea00]'
                : 'text-[#035d61] hover:text-[#aeea00]'
              }`
            }
          >
            <div className="flex items-center gap-2">
              <Compass size={18} />
              <span>Choose Domain</span>
            </div>
          </NavLink>

          <button 
            onClick={handleLogout} 
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#035d61] hover:bg-[#aeea00] hover:text-white transition-colors duration-200 flex items-center gap-2"
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
