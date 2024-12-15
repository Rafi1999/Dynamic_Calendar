import { useState } from "react";

export const timeToMinutes = (timeStr) => {
const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

export const hasTimeOverlap = (start1, end1, start2, end2) => {
    const start1Mins = timeToMinutes(start1);
    const end1Mins = timeToMinutes(end1);
    const start2Mins = timeToMinutes(start2);
    const end2Mins = timeToMinutes(end2);

    return start1Mins < end2Mins && end1Mins > start2Mins;
};


export const getMonthDays = (date) => {
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

export const isWeekend = (dayIndex, day) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    if (!day) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
};
