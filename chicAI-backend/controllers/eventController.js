const Event = require('../models/eventModel');

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new event
const addEvent = async (req, res) => {
  const { title, description, date, reminder } = req.body;

  const newEvent = new Event({
    title,
    description,
    date,
    reminder,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getEvents,
  addEvent,
};
