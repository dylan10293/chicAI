import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventCalendar.css';
import EventForm from './EventForm';
import EventList from './EventList';

function EventCalendar() {
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data); // Assume the response contains an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-calendar-container">
      <div className="event-calendar-header">
        <h2>Event Calendar</h2>
      </div>

      <EventForm setEvents={setEvents} />

      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event-card" key={event._id}>
              <h3 className="event-title">{event.eventName}</h3>
              <p className="event-type">
                <strong>Type:</strong> {event.eventType}
              </p>
              <p className="event-date">
                <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className="event-location">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="event-weather">
                <strong>Weather:</strong> {event.weather || 'Not Available'}
              </p>
            </div>
          ))
        ) : (
          <p className="no-events">No events available</p>
        )}
      </div>
    </div>
  );
}

export default EventCalendar;
