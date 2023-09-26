import { StyleSheet, View } from "react-native";
import { useState } from "react";
import DateSelector from "../DateSelector";
import FoodList from "./FoodView/FoodList/FoodList";
import FoodView from "./FoodView/FoodView";

export default function FoodDisplay() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <View style={styles.container}>
            <DateSelector onDateChange={handleDateChange} />
            <FoodView date={selectedDate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        // justifyContent: "center",
        alignItems: "center",
    },
});
