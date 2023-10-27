import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateSelector from "../DateSelector";
import FoodView from "./FoodView/FoodView";

export default function FoodDisplay() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <View style={styles.container}>
            <DateSelector date={selectedDate} onDateChange={handleDateChange} />
            <FoodView date={selectedDate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        alignItems: "center",
    },
});
