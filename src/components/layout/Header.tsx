import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  // Removed 'user' since it's not being used

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">EventMgt</Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-600">Home</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-blue-600">Events</Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/profile" className="hover:text-blue-600">Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logout()}
                      className="hover:text-blue-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:text-blue-600">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-blue-600">Register</Link>
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
