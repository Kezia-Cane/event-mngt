import { FaBriefcase, FaCalendarAlt, FaGraduationCap, FaHeartbeat, FaLaptopCode, FaMapMarkerAlt, FaMusic, FaPaintBrush, FaRunning, FaUsers, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover & Create Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200">
              The easiest way to find, organize, and manage events that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="bg-white text-primary-600 hover:bg-neutral-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Events
              </Link>
              <Link
                to="/register"
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Events By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Music', icon: <FaMusic className="text-blue-600 text-xl" /> },
              { name: 'Business', icon: <FaBriefcase className="text-blue-600 text-xl" /> },
              { name: 'Food & Drink', icon: <FaUtensils className="text-blue-600 text-xl" /> },
              { name: 'Sports', icon: <FaRunning className="text-blue-600 text-xl" /> },
              { name: 'Arts', icon: <FaPaintBrush className="text-blue-600 text-xl" /> },
              { name: 'Technology', icon: <FaLaptopCode className="text-blue-600 text-xl" /> },
              { name: 'Health', icon: <FaHeartbeat className="text-blue-600 text-xl" /> },
              { name: 'Education', icon: <FaGraduationCap className="text-blue-600 text-xl" /> }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/events?category=${category.name.toLowerCase()}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Discover Events</h3>
              <p className="text-gray-600">
                Browse through our curated list of events or search for specific interests to find the perfect event for you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Register & Attend</h3>
              <p className="text-gray-600">
                Secure your spot by registering for events you're interested in, and get all the details you need to attend.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Create Your Own</h3>
              <p className="text-gray-600">
                Have an idea for an event? Create and manage your own events with our easy-to-use tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Link to="/events" className="text-blue-600 hover:text-blue-800 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Tech Conference 2023",
                date: "Oct 15, 2023",
                location: "San Francisco",
                description: "Join us for the biggest tech conference of the year with speakers from leading tech companies.",
                attendees: 150,
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                id: 2,
                title: "Music Festival 2023",
                date: "Nov 5, 2023",
                location: "Los Angeles",
                description: "Experience three days of amazing performances from top artists across multiple stages.",
                attendees: 500,
                image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              },
              {
                id: 3,
                title: "Food & Wine Expo",
                date: "Dec 10, 2023",
                location: "New York",
                description: "Taste exceptional cuisine and fine wines from renowned chefs and vineyards around the world.",
                attendees: 300,
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
            ].map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 m-2 rounded">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaUsers className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{event.attendees} attendees</span>
                    </div>
                    <Link
                      to={`/events/${event.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={(e) => {
                        // Prevent default if the event doesn't exist yet
                        if (!event.id) {
                          e.preventDefault();
                          alert("This is a demo event");
                        }
                      }}
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Event Organizer",
                quote: "This platform has made organizing events so much easier. The tools are intuitive and the attendee management is seamless."
              },
              {
                name: "Michael Chen",
                role: "Regular Attendee",
                quote: "I've discovered so many interesting events in my area that I wouldn't have known about otherwise. The registration process is super simple!"
              },
              {
                name: "Emily Rodriguez",
                role: "Community Manager",
                quote: "We use this platform for all our community events. It's helped us grow our attendance by over 200% in just six months."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already creating and discovering amazing events every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-neutral-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create Account
            </Link>
            <Link
              to="/events"
              className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
