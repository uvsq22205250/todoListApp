import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "../App.css"; // Import App.css file

function Calendar() {
    const [events, setEvents] = useState([
        {
            title: "Event 1",
            start: new Date(),
            allDay: true,
        },
        {
            title: "Event 2",
            start: new Date(),
            allDay: true,
        },
    ]);

    const handleSelect = (arg) => {
        const title = prompt("Enter event title:");
        if (title) {
            setEvents((prevEvents) => [
                ...prevEvents,
                { title, start: arg.start, end: arg.end },
            ]);
        }
    };

    const handleEventClick = (arg) => {
        if (window.confirm(`Delete event '${arg.event.title}'?`)) {
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event !== arg.event)
            );
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable={true}
            selectable={true}
            select={handleSelect}
            eventClick={handleEventClick}
        />
    );
}

export default Calendar;
