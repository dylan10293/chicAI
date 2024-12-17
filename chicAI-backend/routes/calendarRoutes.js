const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");

// POST: Add a new event
router.post("/add", async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, location } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error adding event", error });
  }
});

// GET: Retrieve all events
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
});

// DELETE: Remove an event by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

module.exports = router;
