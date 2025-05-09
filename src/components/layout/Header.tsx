import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md py-2">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-95 transition-opacity">
              <img
                src="/logo-removebg-preview.png"
                alt="EventMgt Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>
          <nav className="ml-auto">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/" className="font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200 tracking-wide">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200 tracking-wide">
                  Events
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/profile" className="font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200 tracking-wide">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className="font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200 tracking-wide"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="font-medium text-neutral-600 hover:text-primary-600 transition-colors duration-200 tracking-wide">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="px-5 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors duration-200 tracking-wide">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
