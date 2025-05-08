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
  banner?: string; // Keep as string for received events
}

// Define a separate type for event creation that includes File
export type EventFormData = {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  category: string;
  banner?: File | null;
};

// Define a type for event updates
export type EventUpdateData = {
  title?: string;
  description?: string;
  date?: Date;
  location?: string;
  capacity?: number;
  category?: string;
  banner?: File | null;
};

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  getEvent: (id: string) => Promise<Event>;
  createEvent: (eventData: EventFormData) => Promise<Event>;
  updateEvent: (id: string, eventData: EventUpdateData) => Promise<Event>;
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

  const createEvent = async (eventData: EventFormData): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      // Create FormData if there's a banner file
      const bannerFile = eventData.banner;
      if (bannerFile && bannerFile instanceof File) {
        const formData = new FormData();
        // Add all event data to FormData
        Object.entries(eventData).forEach(([key, value]) => {
          if (key === 'banner' && value instanceof File) {
            formData.append('banner', value);
          } else if (key === 'date' && value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        const response = await axios.post('/api/events', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEvents([...events, response.data]);
        return response.data;
      } else {
        // Regular JSON request if no file
        const { banner, ...restData } = eventData;
        const response = await axios.post('/api/events', restData);
        setEvents([...events, response.data]);
        return response.data;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, eventData: EventUpdateData): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      // Create FormData if there's a banner file
      const bannerFile = eventData.banner;
      if (bannerFile && bannerFile instanceof File) {
        const formData = new FormData();
        // Add all event data to FormData
        Object.entries(eventData).forEach(([key, value]) => {
          if (key === 'banner' && value instanceof File) {
            formData.append('banner', value);
          } else if (key === 'date' && value instanceof Date) {
            formData.append(key, value.toISOString());
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        const response = await axios.put(`/api/events/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEvents(events.map(event => event._id === id ? response.data : event));
        return response.data;
      } else {
        // Regular JSON request if no file
        const { banner, ...restData } = eventData;
        const response = await axios.put(`/api/events/${id}`, restData);
        setEvents(events.map(event => event._id === id ? response.data : event));
        return response.data;
      }
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
