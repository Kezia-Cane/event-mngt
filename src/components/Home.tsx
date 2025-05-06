import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to EventMgt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The easiest way to discover, create, and manage events in your area.
          </p>
          <div className="mt-8">
            <Link
              to="/events"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mr-4"
            >
              Browse Events
            </Link>
            <Link
              to="/register"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Discover Events</h3>
            <p className="text-gray-600">
              Find events that match your interests and connect with like-minded people.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Create Events</h3>
            <p className="text-gray-600">
              Easily create and manage your own events with our intuitive tools.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Track Attendance</h3>
            <p className="text-gray-600">
              Keep track of who's attending your events and communicate with them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
