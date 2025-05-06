import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, registerForEvent, unregisterFromEvent, deleteEvent } = useEvents();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const eventData = await getEvent(id);
        setEvent(eventData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!id || !isAuthenticated) return;
    
    try {
      setRegistering(true);
      const updatedEvent = await registerForEvent(id);
      setEvent(updatedEvent);
    } catch (err: any) {
      setError(err.message || 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!id || !isAuthenticated) return;
    
    try {
      setRegistering(true);
      const updatedEvent = await unregisterFromEvent(id);
      setEvent(updatedEvent);
    } catch (err: any) {
      setError(err.message || 'Failed to unregister from event');
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !isAuthenticated) return;
    
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        navigate('/events');
      } catch (err: any) {
        setError(err.message || 'Failed to delete event');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading event...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!event) {
    return <div className="text-center">Event not found</div>;
  }

  const isOrganizer = user && event.organizer && user._id === event.organizer._id;
  const isAttending = user && event.attendees && event.attendees.some((a: any) => a._id === user._id);
  const isFull = event.attendees.length >= event.capacity;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {event.category}
            </span>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{event.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p>{new Date(event.date).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p>{event.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Organizer</h3>
                <p>{event.organizer?.name || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
                <p>{event.attendees.length} / {event.capacity}</p>
              </div>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="flex flex-wrap gap-2 mb-6">
              {isOrganizer || isAdmin ? (
                <>
                  <Link 
                    to={`/events/${event._id}/edit`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit Event
                  </Link>
                  <button 
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete Event
                  </button>
                </>
              ) : (
                <>
                  {isAttending ? (
                    <button 
                      onClick={handleUnregister}
                      disabled={registering}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      {registering ? 'Processing...' : 'Cancel Registration'}
                    </button>
                  ) : (
                    <button 
                      onClick={handleRegister}
                      disabled={registering || isFull}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      {registering ? 'Processing...' : isFull ? 'Event Full' : 'Register'}
                    </button>
                  )}
                </>
              )}
              <Link 
                to="/events"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Back to Events
              </Link>
            </div>
          )}
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Attendees ({event.attendees.length})</h3>
            {event.attendees.length === 0 ? (
              <p className="text-gray-500">No attendees yet</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {event.attendees.map((attendee: any) => (
                  <li key={attendee._id} className="text-gray-700">
                    {attendee.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;