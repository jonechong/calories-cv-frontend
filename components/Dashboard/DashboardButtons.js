import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import DetectCaloriesButton from "./buttons/DetectCaloriesButton";
import AddFoodButton from "./buttons/AddFoodButton";
import HistoryButton from "./buttons/HistoryButton";
import ImageButton from "./buttons/ImageButton";

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
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
    },
});
