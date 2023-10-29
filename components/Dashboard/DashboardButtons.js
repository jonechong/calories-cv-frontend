import React from "react";
import { StyleSheet, View } from "react-native";
import ImageButton from "./buttons/ImageButton";
import { Surface, Button, useTheme } from "react-native-paper";

export default function DashboardButtons() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "space-evenly",
            backgroundColor: theme.colors.background,
            alignItems: "flex-end",
            paddingBottom: "2.5%",
        },
        button: {
            marginVertical: "0.3%",
            // width: "50%",
        },
    });

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
        <View style={styles.container}>
            <Button
                icon="history"
                mode="contained"
                style={styles.button}
                onPress={buttonFunctions.historyButton}
            >
                History
            </Button>
            <Button
                icon="food"
                mode="contained"
                style={styles.button}
                onPress={buttonFunctions.addFoodButton}
            >
                Add Food
            </Button>
            <Button
                icon="camera"
                mode="contained"
                style={styles.button}
                onPress={buttonFunctions.detectCaloriesButton}
            >
                Detect Calories
            </Button>
        </View>
    );
}
