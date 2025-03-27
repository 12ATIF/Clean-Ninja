import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated, login, logout } from '../../utils/auth';
import logoSvg from '../assets/logo.svg';

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setIsAuth(auth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      await login();
      setIsAuth(true);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuth(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const linkStyle = "text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium";
  const activeLinkStyle = "text-primary-600 hover:text-primary-700 px-3 py-2 text-sm font-medium";

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center" onClick={closeMenu}>
                <img
                  className="h-8 w-auto"
                  src={logoSvg}
                  alt="Clean Ninja"
                />
                <span className="ml-2 text-lg font-bold text-primary-600">Clean Ninja</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/"
                className={location.pathname === '/' ? activeLinkStyle : linkStyle}
              >
                Beranda
              </Link>
              <Link
                to="/map"
                className={location.pathname === '/map' ? activeLinkStyle : linkStyle}
              >
                Peta
              </Link>
              <Link
                to="/report"
                className={location.pathname === '/report' ? activeLinkStyle : linkStyle}
              >
                Laporkan
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoading ? (
              <div className="animate-pulse h-8 w-20 bg-gray-200 rounded"></div>
            ) : isAuth ? (
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className={`mr-4 ${location.pathname === '/profile' ? activeLinkStyle : linkStyle}`}
                >
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Masuk
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              location.pathname === '/'
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } block px-3 py-2 rounded-md text-base font-medium`}
            onClick={closeMenu}
          >
            Beranda
          </Link>
          <Link
            to="/map"
            className={`${
              location.pathname === '/map'
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } block px-3 py-2 rounded-md text-base font-medium`}
            onClick={closeMenu}
          >
            Peta
          </Link>
          <Link
            to="/report"
            className={`${
              location.pathname === '/report'
                ? 'bg-primary-50 text-primary-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } block px-3 py-2 rounded-md text-base font-medium`}
            onClick={closeMenu}
          >
            Laporkan
          </Link>
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isLoading ? (
            <div className="animate-pulse h-8 w-20 bg-gray-200 rounded mx-3"></div>
          ) : isAuth ? (
            <div>
              <Link
                to="/profile"
                className={`${
                  location.pathname === '/profile'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={closeMenu}
              >
                Profil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="mt-1 block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="px-3">
              <button
                onClick={() => {
                  handleLogin();
                  closeMenu();
                }}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;