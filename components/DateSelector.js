import { useMemo, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { IconButton, Subheading, useTheme } from "react-native-paper";
import CalendarPicker from "./CalendarPicker";

export default function DateSelector({ date, onDateChange }) {
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
            },
            date: {
                fontSize: 20,
            },
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

    const [currentDate, setCurrentDate] = useState(date);
    const [isCalendarVisible, setCalendarVisibility] = useState(false);

    const handleDateChange = (newDate) => {
        setCurrentDate(newDate);
        onDateChange(newDate);
        setCalendarVisibility(false);
    };

    const decreaseDate = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
        onDateChange(newDate);
    };

    const increaseDate = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 1);
        setCurrentDate(newDate);
        onDateChange(newDate);
    };

    const formattedDate = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    return (
        <View style={styles.container}>
            <IconButton icon="chevron-left" onPress={decreaseDate} />
            <TouchableOpacity onPress={() => setCalendarVisibility(true)}>
                <Subheading style={styles.date}>{formattedDate}</Subheading>
            </TouchableOpacity>
            <IconButton icon="chevron-right" onPress={increaseDate} />

            <CalendarPicker
                currentDate={currentDate}
                onDateChange={handleDateChange}
                themeColors={theme.colors}
                isCalendarVisible={isCalendarVisible}
                setCalendarVisibility={setCalendarVisibility}
            />
        </View>
    );
}
