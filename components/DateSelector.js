import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Subheading } from "react-native-paper";

export default function DateSelector() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const decreaseDate = () => {
        const dateCopy = new Date(selectedDate);
        dateCopy.setDate(dateCopy.getDate() - 1);
        setSelectedDate(dateCopy);
    };

    const increaseDate = () => {
        const dateCopy = new Date(selectedDate);
        dateCopy.setDate(dateCopy.getDate() + 1);
        setSelectedDate(dateCopy);
    };

    return (
        <View style={styles.container}>
            <IconButton icon="chevron-left" onPress={increaseDate}></IconButton>
            <Subheading style={{ color: "black" }}>
                {currentDay}/{currentMonth}/{currentYear}
            </Subheading>
            <IconButton
                icon="chevron-right"
                onPress={decreaseDate}
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
        // justifyContent: "space-between", // space items out evenly
        paddingHorizontal: 10, // for a little padding on the sides
    },
});
