import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateSelector from "../DateSelector";
import FoodView from "./FoodView/FoodView";
import { Surface, Card } from "react-native-paper";

export default function FoodDisplay({ date }) {
    return (
        <View style={styles.container}>
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
