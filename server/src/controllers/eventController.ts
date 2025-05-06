import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Event from "../models/Event";

// Get all events
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("organizer", "name email");
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get single event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email")
      .populate("attendees", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, description, date, location, capacity, category } = req.body;
    const userId = req.user._id as unknown as mongoose.Schema.Types.ObjectId;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      category,
      organizer: userId,
      attendees: [],
    });

    res.status(201).json(event);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = req.user._id as unknown as mongoose.Schema.Types.ObjectId;

    // Check if user is the organizer or an admin
    if (
      event.organizer.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedEvent);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = req.user._id as unknown as mongoose.Schema.Types.ObjectId;

    // Check if user is the organizer or an admin
    if (
      event.organizer.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event removed" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Register for an event
export const registerForEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = req.user._id as unknown as mongoose.Schema.Types.ObjectId;

    // Check if event is at capacity
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "Event is at full capacity" });
    }

    // Check if user is already registered
    if (event.attendees.some((id) => id.toString() === userId.toString())) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    // Add user to attendees
    event.attendees.push(userId);
    await event.save();

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Unregister from an event
export const unregisterFromEvent = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const userId = req.user._id as unknown as mongoose.Schema.Types.ObjectId;

    // Check if user is registered
    if (!event.attendees.some((id) => id.toString() === userId.toString())) {
      return res.status(400).json({ message: "Not registered for this event" });
    }

    // Remove user from attendees
    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== userId.toString()
    );

    await event.save();

    res.json(event);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
