import React from 'react';
import './EventList.css';


const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {event.date} at {event.reminder}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
