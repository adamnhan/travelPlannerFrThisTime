import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend (for later integration)
    const fetchEvents = async () => {
      // Simulate fetching events from the backend
      const mockEvents = [
        {
          id: 1,
          title: 'Event 1',
          start: new Date('2024-07-15T10:30:00'),
          end: new Date('2024-07-15T12:30:00')
        },
        {
          id: 2,
          title: 'Event 2',
          start: new Date('2024-07-16T14:00:00'),
          end: new Date('2024-07-16T16:00:00')
        }
      ];
      setEvents(mockEvents);
    };
    fetchEvents();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const title = prompt('Enter Event Title:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        start: slotInfo.start,
        end: slotInfo.end
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleSelectEvent = (event) => {
    alert(event.title);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Travel Planner Calendar</h1>
      <div className="flex justify-center">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          className="shadow-lg border border-gray-200 rounded-lg"
        />
      </div>
    </div>
  );
};
export default CalendarPage;