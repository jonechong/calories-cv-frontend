import React, { useEffect, useMemo } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet, View, Modal } from "react-native";
import { IconButton } from "react-native-paper";

export default function CalendarPicker({
    currentDate,
    onDateChange,
    themeColors,
    isCalendarVisible,
    setCalendarVisibility,
}) {
    const styles = useMemo(() => {
        return StyleSheet.create({
            modalOverlay: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            },
            calendarContainer: {
                width: "80%",
                overflow: "hidden",
                borderRadius: 20,
            },
        });
    }, []);

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
        const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
        const localDate = new Date(date - offset); // Adjust for local timezone
        const month = `${localDate.getMonth() + 1}`.padStart(2, "0");
        const day = `${localDate.getDate()}`.padStart(2, "0");
        return `${localDate.getFullYear()}-${month}-${day}`;
    };

    useEffect(() => {
        const offset = currentDate.getTimezoneOffset() * 60000;
        const localCurrentDate = new Date(currentDate - offset);
        console.log(localCurrentDate.toISOString());
    }, [currentDate]);

    return (
        <Modal
            visible={isCalendarVisible}
            onRequestClose={() => setCalendarVisibility(false)}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.modalOverlay}>
                <View
                    style={{
                        alignItems: "flex-end",
                        width: "80%",
                    }}
                >
                    <IconButton
                        icon="close"
                        onPress={() => setCalendarVisibility(false)}
                        iconColor={themeColors.onBackground}
                        backgroundColor={themeColors.background}
                    />
                </View>
                <View style={styles.calendarContainer}>
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
                </View>
            </View>
        </Modal>
    );
}
