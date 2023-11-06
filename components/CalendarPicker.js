import React from "react";
import { Calendar } from "react-native-calendars";

export default function CalendarPicker({
    currentDate,
    onDateChange,
    themeColors,
}) {
    const CalendarTheme = {
        calendarBackground: themeColors.background,
        textSectionTitleColor: themeColors.onBackground,
        selectedDayTextColor: themeColors.onPrimary,
        dayTextColor: themeColors.onPrimaryContainer,
        textDisabledColor: themeColors.surfaceVariant,
        dotColor: themeColors.primary,
        arrowColor: themeColors.onPrimaryContainer,
        monthTextColor: themeColors.primary,
        todayTextColor: themeColors.tertiary,
    };

    const onDayPress = (day) => {
        const newDate = new Date(day.timestamp);
        onDateChange(newDate);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, "0");
        const day = `${d.getDate()}`.padStart(2, "0");
        return `${d.getFullYear()}-${month}-${day}`;
    };

    return (
        <Calendar
            current={currentDate.toISOString()}
            onDayPress={onDayPress}
            markedDates={{
                [formatDate(currentDate)]: {
                    selected: true,
                    selectedColor: themeColors.primary,
                },
            }}
            style={{ padding: "1%" }}
            theme={CalendarTheme}
        />
    );
}
