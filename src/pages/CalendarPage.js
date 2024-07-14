import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/CalendarPage.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
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

  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, 'h a', culture), // Change time format to 'h a'
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 1200, width: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          className="shadow-lg border border-gray-300 rounded-lg custom-calendar"
          formats={formats}
        />
      </div>
    </div>
  );
};

export default CalendarPage;