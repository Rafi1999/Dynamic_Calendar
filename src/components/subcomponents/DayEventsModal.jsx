import React from 'react';

const DayEventsModal = ({
    selectedDay,
    events,
    eventForm,
    categoryColors,
    setSelectedDay,
    handleDeleteEvent,
    handleFormChange,
    handleAddEvent,
    formatDateKey,
    getFilteredEvents,
}) => {
    if (!selectedDay) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">
                    Events for {selectedDay.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>

                <ul className="mb-4">
                    {getFilteredEvents(formatDateKey(selectedDay)).map((event, index) => (
                        <li key={index} className="flex justify-between items-center mb-2">
                            <span className={`text-sm ${categoryColors[event.category]}`}>
                                {event.name} (
                                {new Date(`1970-01-01T${event.startTime}`).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })} -{' '}
                                {new Date(`1970-01-01T${event.endTime}`).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })})
                            </span>
                            <button
                                onClick={() => handleDeleteEvent(formatDateKey(selectedDay), index)}
                                className="text-red-500 text-sm"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                <label className="block font-semibold mb-1">Event Name</label>
                <input
                    type="text"
                    name="name"
                    value={eventForm.name}
                    placeholder="Event Name"
                    onChange={handleFormChange}
                    className="w-full mb-4 p-2 border rounded"
                />
                <label className="block font-semibold mb-1">Start Time</label>
                <input
                    type="time"
                    name="startTime"
                    value={eventForm.startTime}
                    onChange={handleFormChange}
                    className="w-full mb-4 p-2 border rounded"
                />
                <label className="block font-semibold mb-1">End Time</label>
                <input
                    type="time"
                    name="endTime"
                    value={eventForm.endTime}
                    onChange={handleFormChange}
                    className="w-full mb-4 p-2 border rounded"
                />
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleFormChange}
                    className="w-full mb-4 p-2 border rounded"
                />
                <label className="block font-semibold mb-1">Category</label>
                <select
                    name="category"
                    value={eventForm.category}
                    onChange={handleFormChange}
                    className="w-full mb-4 p-2 border rounded"
                >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Others">Others</option>
                </select>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setSelectedDay(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddEvent}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DayEventsModal;
