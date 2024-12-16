import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import AllEventsModal from '../subcomponents/AllEventsModal';
import DayEventsModal from '../subcomponents/DayEventsModal';

function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const [filterKeyword, setFilterKeyword] = useState('');
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [eventForm, setEventForm] = useState({
        name: '',
        startTime: '',
        endTime: '',
        description: '',
        category: 'Work',
    });

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || {};
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        if (Object.keys(events).length > 0) {
            localStorage.setItem('events', JSON.stringify(events));
        }
    }, [events]);

    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const hasTimeOverlap = (start1, end1, start2, end2) => {
        const start1Mins = timeToMinutes(start1);
        const end1Mins = timeToMinutes(end1);
        const start2Mins = timeToMinutes(start2);
        const end2Mins = timeToMinutes(end2);

        return start1Mins < end2Mins && end1Mins > start2Mins;
    };

    const checkEventOverlap = (dayKey, newStart, newEnd) => {
        const dayEvents = events[dayKey] || [];
        return dayEvents.some(event =>
            hasTimeOverlap(event.startTime, event.endTime, newStart, newEnd)
        );
    };

    const getFilteredEvents = (dayKey) => {
        const dayEvents = events[dayKey] || [];
        if (!filterKeyword) return dayEvents;

        return dayEvents.filter(event =>
            event.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
            event.description.toLowerCase().includes(filterKeyword.toLowerCase())
        );
    };

    const getMonthDays = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const days = [];
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            days.push(null);
        }
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            days.push(i);
        }
        return days;
    };

    const isWeekend = (dayIndex, day) => {
        if (!day) return false;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day) => {
        if (!day) return;
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDay(selectedDate);
        setEventForm({ name: '', startTime: '', endTime: '', description: '', category: 'Work' });
    };

    const handleAddEvent = () => {
        if (!eventForm.name || !eventForm.startTime || !eventForm.endTime) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all required fields",
            });
            return;
        }

        if (!selectedDay) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a day!",
            });
            return;
        }

        const dayKey = formatDateKey(selectedDay);

        if (timeToMinutes(eventForm.startTime) >= timeToMinutes(eventForm.endTime)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "End time must be after start time!",
            });
            return;
        }

        if (checkEventOverlap(dayKey, eventForm.startTime, eventForm.endTime)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This time slot overlaps with an existing event!",
            });
            return;
        }

        setEvents((prev) => {
            const updatedEvents = {
                ...prev,
                [dayKey]: [...(prev[dayKey] || []), { ...eventForm }],
            };
            Swal.fire({
                icon: "success",
                title: "Event Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            return updatedEvents;
        });

        setSelectedDay(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEventForm((prev) => ({ ...prev, [name]: value }));
    };

    const formatDateKey = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDeleteEvent = (dayKey, index) => {
        setEvents((prev) => {
            const updatedEvents = {
                ...prev,
                [dayKey]: prev[dayKey].filter((_, i) => i !== index),
            };
            if (updatedEvents[dayKey].length === 0) {
                delete updatedEvents[dayKey];
            }
            Swal.fire({
                title: "Deleted!",
                text: "Your event has been deleted.",
                icon: "success"
            });
            return updatedEvents;
        });
    };

    const exportEvents = (format) => {
        const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        const monthEvents = Object.entries(events)
            .filter(([key]) => key.startsWith(monthKey))
            .reduce((acc, [key, dayEvents]) => {
                acc[key] = dayEvents;
                return acc;
            }, {});

        if (format === 'json') {
            const blob = new Blob([JSON.stringify(monthEvents, null, 2)], { type: 'application/json' });
            saveAs(blob, `events-${monthKey}.json`);
        } else if (format === 'csv') {
            let csvContent = 'Date,Name,Start Time,End Time,Description,Category\n';
            Object.entries(monthEvents).forEach(([key, dayEvents]) => {
                dayEvents.forEach(event => {
                    csvContent += `${key},${event.name},${event.startTime},${event.endTime},${event.description},${event.category}\n`;
                });
            });
            const blob = new Blob([csvContent], { type: 'text/csv' });
            saveAs(blob, `events-${monthKey}.csv`);
        }
    };

    const daysInMonth = getMonthDays(currentDate);

    const categoryColors = {
        Work: 'text-blue-500',
        Personal: 'text-amber-500',
        Others: 'text-purple-500',
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day &&
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };
    const handleAllEventsToggle = () => {
        setShowAllEvents((prev) => !prev);
    };
    return (
        <div className="my-5 max-w-screen-xl mx-auto px-4 sm:px-8 py-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevMonth}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Previous
                </button>
                <h2 className="text-xl font-bold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Filter events..."
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)}
                    className="w-full p-2 border rounded"
                />

            </div>

            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setShowAllEvents(true)}
                    className="bg-purple-500 text-white px-3 py-1 rounded ml-2"
                >
                    All Events
                </button>
                <div>
                    <button
                        onClick={() => exportEvents('json')}
                        className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
                    >
                        Export JSON
                    </button>
                    <button
                        onClick={() => exportEvents('csv')}
                        className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={day} className={`font-semibold ${index === 0 || index === 6 ? 'text-red-500' : ''}`}>
                        {day}
                    </div>
                ))}

                {daysInMonth.map((day, index) => {
                    const dayKey = day
                        ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                        : null;

                    const isWeekendDay = isWeekend(index, day);
                    const filteredDayEvents = dayKey ? getFilteredEvents(dayKey) : [];

                    return (
                        <div
                            key={index}
                            className={`p-4 border rounded cursor-pointer 
                                ${day ? 'hover:bg-gray-200' : 'bg-transparent'}
                                ${isToday(day) ? 'bg-green-500' : isWeekendDay ? 'bg-red-100' : 'bg-gray-100'}
                                ${isWeekendDay ? 'text-red-500' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                            {filteredDayEvents.length > 0 && (
                                <ul className="mt-2 text-sm">
                                    {filteredDayEvents.map((event, i) => (
                                        <li key={i} className={`truncate ${categoryColors[event.category]}`}>
                                            {event.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedDay && (
                <DayEventsModal
                    selectedDay={selectedDay}
                    events={events}
                    eventForm={eventForm}
                    categoryColors={categoryColors}
                    setSelectedDay={setSelectedDay}
                    handleDeleteEvent={handleDeleteEvent}
                    handleFormChange={handleFormChange}
                    handleAddEvent={handleAddEvent}
                    formatDateKey={formatDateKey}
                    getFilteredEvents={getFilteredEvents}
                />
            )}

            {/* All Events Modal */}
            {showAllEvents && (
                <AllEventsModal
                    events={events}
                    onClose={() => setShowAllEvents(false)}
                    onDeleteEvent={handleDeleteEvent}
                />
            )}
        </div>
    );
}

export default CalendarView;
