import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { IconButton, Subheading } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useMemo } from "react";

export default function DateSelector({ date, onDateChange }) {
    const [currentDate, setCurrentDate] = useState(date);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setCurrentDate(date);
        onDateChange(date);
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
            <TouchableOpacity onPress={showDatePicker}>
                <Subheading>{formattedDate}</Subheading>
            </TouchableOpacity>
            <IconButton icon="chevron-right" onPress={increaseDate} />

            {isDatePickerVisible && (
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={currentDate}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10, // You can adjust padding to suit your styling needs
    },
});
