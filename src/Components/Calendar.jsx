import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect } from "react";
// import "../App.css"; // Import App.css file

function Calendar({ Todo }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const newEvents = Todo.map((todo) => ({
      title: todo.name,
      start: new Date(todo.date),
      allDay: true,
    }));
    setEvents(newEvents);
  }, [Todo]);

  console.log("EVENTS  " + events);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={true}
      selectable={true}
    />
  );
}

export default Calendar;
