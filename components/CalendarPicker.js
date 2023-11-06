// CalendarPicker.js
import React from "react";
import { Calendar } from "react-native-calendars";

const CalendarPicker = ({ currentDate, onDateChange }) => {
    return (
        <Calendar
            current={currentDate}
            onDayPress={(day) => {
                const newDate = new Date(day.year, day.month - 1, day.day);
                onDateChange(newDate);
            }}
            markedDates={{
                [currentDate.toISOString().split("T")[0]]: {
                    selected: true,
                    selectedColor: "blue",
                },
            }}
        />
    );
};

export default CalendarPicker;
