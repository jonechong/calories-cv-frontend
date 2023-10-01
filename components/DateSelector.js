import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Subheading } from "react-native-paper";

export default function DateSelector({ date, onDateChange }) {
    const [currentDate, setCurrentDate] = useState(date);
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

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

    return (
        <View style={styles.container}>
            <IconButton icon="chevron-left" onPress={decreaseDate}></IconButton>
            <Subheading style={{ color: "black" }}>
                {currentDay}/{currentMonth}/{currentYear}
            </Subheading>
            <IconButton
                icon="chevron-right"
                onPress={increaseDate}
            ></IconButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center", // vertically center items
        justifyContent: "center", // horizontally center items
        paddingHorizontal: 10, // for a little padding on the sides
    },
});
