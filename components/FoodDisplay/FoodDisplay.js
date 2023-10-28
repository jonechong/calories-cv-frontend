import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateSelector from "../DateSelector";
import FoodView from "./FoodView/FoodView";

export default function FoodDisplay({ date }) {
    return (
        <View style={styles.container}>
            {/* <DateSelector date={selectedDate} onDateChange={onDateChange} /> */}
            <FoodView date={date} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#green",
        alignContent: "center",
        alignItems: "center",
    },
});
