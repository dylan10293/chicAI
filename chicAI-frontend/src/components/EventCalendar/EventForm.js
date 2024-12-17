import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';


const EventForm = ({ setEvents }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    reminder: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post the new event to the backend
    axios.post('http://localhost:5000/api/events', eventData)
      .then(response => {
        setEvents(prevEvents => [...prevEvents, response.data]);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={eventData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Event Description"
        value={eventData.description}
        onChange={handleChange}
      />
      
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="reminder"
        value={eventData.reminder}
        onChange={handleChange}
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
