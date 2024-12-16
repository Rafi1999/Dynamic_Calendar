import React from 'react';
import Swal from 'sweetalert2';

function AllEventsModal({ events, onClose, onDeleteEvent }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 max-h-[80vh] overflow-auto">
                <h3 className="text-lg font-bold mb-4">All Events</h3>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
                >
                    Close
                </button>
                <div className="space-y-4">
                    {Object.keys(events).length > 0 ? (
                        Object.entries(events)
                            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) // Sort events by date
                            .map(([date, dayEvents]) => (
                                <div key={date}>
                                    <h4 className="font-semibold mb-2">
                                        {new Date(date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </h4>
                                    <ul>
                                        {dayEvents.map((event, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center mb-2"
                                            >
                                                <span>
                                                    {event.name} (
                                                    {new Date(`1970-01-01T${event.startTime}`).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }
                                                    )} -{' '}
                                                    {new Date(`1970-01-01T${event.endTime}`).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        }
                                                    )}
                                                    )
                                                    <span className="ml-2 text-sm text-gray-500">{event.category}</span>
                                                </span>
                                                <button
                                                    onClick={() => onDeleteEvent(date, index)}
                                                    className="text-red-500 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                    ) : (
                        <p>No events available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllEventsModal;
