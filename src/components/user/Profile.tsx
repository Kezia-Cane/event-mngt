import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';

const Profile = () => {
  const { user } = useAuth();
  const { events, fetchEvents } = useEvents();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchEvents();
      setLoading(false);
    };

    loadData();
  }, [fetchEvents]);

  if (loading || !user) {
    return <div className="flex justify-center items-center h-64">Loading profile...</div>;
  }

  // Filter events organized by the user
  const organizedEvents = events.filter(event =>
    event.organizer &&
    typeof event.organizer === 'object' &&
    '_id' in event.organizer &&
    event.organizer._id === user._id
  );

  // Filter events the user is attending
  const attendingEvents = events.filter(event =>
    event.attendees &&
    event.attendees.some(attendee =>
      typeof attendee === 'object' &&
      '_id' in attendee &&
      attendee._id === user._id
    )
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-600">Role</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-600">Member Since</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Events</h2>
          <Link
            to="/events/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Create Event
          </Link>
        </div>

        {organizedEvents.length === 0 ? (
          <p className="text-gray-500">You haven't organized any events yet.</p>
        ) : (
          <div className="space-y-4">
            {organizedEvents.map(event => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="block bg-gray-50 p-4 rounded hover:bg-gray-100"
              >
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4 overflow-hidden">
                    {event.banner ? (
                      <img
                        src={`http://localhost:5000${event.banner}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {event.attendees.length} / {event.capacity} attendees
                    </p>
                  </div>

                  <div className="text-blue-600">
                    <span className="text-sm">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Events I'm Attending</h2>

        {attendingEvents.length === 0 ? (
          <p className="text-gray-500">You're not attending any events yet.</p>
        ) : (
          <div className="space-y-4">
            {attendingEvents.map(event => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="block bg-gray-50 p-4 rounded hover:bg-gray-100"
              >
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4 overflow-hidden">
                    {event.banner ? (
                      <img
                        src={`http://localhost:5000${event.banner}`}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-gray-600">
                      Organized by {typeof event.organizer === 'object' && 'name' in event.organizer
                        ? event.organizer.name
                        : 'Unknown'}
                    </p>
                  </div>

                  <div className="text-blue-600">
                    <span className="text-sm">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
