import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';

// Define the Event interface if not already imported
interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  category: string;
  organizer: string;
  attendees: string[];
}

const EventList = () => {
  const { events, loading, error, fetchEvents } = useEvents();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading events...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        {isAuthenticated && (
          <Link
            to="/events/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </Link>
        )}
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: Event) => (
            <div key={event._id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {event.attendees.length} / {event.capacity} attendees
                  </span>
                  <Link
                    to={`/events/${event._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
