import React from "react";
import { StyleSheet, View } from "react-native";
import ImageButton from "./buttons/ImageButton";
import { Surface } from "react-native-paper";

export default function DashboardButtons() {
    const buttonImagesPath = {
        addFoodButton: require("../../assets/buttons/addFoodButton.svg"),
        detectCaloriesButton: require("../../assets/buttons/cameraButton.svg"),
        historyButton: require("../../assets/buttons/historyButton.svg"),
    };

    const buttonFunctions = {
        addFoodButton: () => {
            console.log("Add Food pressed");
        },
        detectCaloriesButton: () => {
            console.log("Detect Calories pressed");
        },
        historyButton: () => {
            console.log("History pressed");
        },
    };

    return (
        <Surface style={styles.container}>
            <ImageButton
                buttonText={"Detect Calories"}
                buttonImagePath={buttonImagesPath.detectCaloriesButton}
                buttonFunction={buttonFunctions.detectCaloriesButton}
            />
            <ImageButton
                buttonText={"Add Food"}
                buttonImagePath={buttonImagesPath.addFoodButton}
                buttonFunction={buttonFunctions.addFoodButton}
            />
            <ImageButton
                buttonText={"History"}
                buttonImagePath={buttonImagesPath.historyButton}
                buttonFunction={buttonFunctions.historyButton}
            />
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
    },
});
