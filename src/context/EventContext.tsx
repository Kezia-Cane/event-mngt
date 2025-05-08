import axios from 'axios';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define types for our events
export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  category: string;
  organizer: string;
  attendees: string[];
  banner?: string; // Add the banner property as optional
}

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  getEvent: (id: string) => Promise<Event>;
  createEvent: (eventData: Omit<Event, '_id' | 'organizer' | 'attendees'>) => Promise<Event>;
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  registerForEvent: (id: string) => Promise<Event>;
  unregisterFromEvent: (id: string) => Promise<Event>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (id: string): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/events/${id}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, '_id' | 'organizer' | 'attendees'>): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/events', eventData);
      setEvents([...events, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/events/${id}`, eventData);
      setEvents(events.map(event => event._id === id ? response.data : event));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (id: string): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/events/${id}/register`);
      // Update the local events state
      await fetchEvents();
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register for event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unregisterFromEvent = async (id: string): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/events/${id}/unregister`);
      // Update the local events state
      await fetchEvents();
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to unregister from event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider value={{
      events,
      loading,
      error,
      fetchEvents,
      getEvent,
      createEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      unregisterFromEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
