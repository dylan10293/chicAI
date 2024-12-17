const mongoose = require("mongoose");

// Define the schema for events
const eventSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, trim: true }, // Unique user ID
    eventName: { type: String, required: true, trim: true }, // Event name
    eventType: { type: String, enum: ["formal", "informal"], required: true }, // Event type (e.g., formal/informal)
    eventDate: { type: Date, required: true }, // Event date
    location: { type: String, trim: true }, // Event location
    weather: { type: String, trim: true }, // Weather condition
    tags: { type: [String], default: [] }, // Tags associated with the event
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt'
);

// Create and export the Event model
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
