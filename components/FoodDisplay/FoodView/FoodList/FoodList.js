import { StyleSheet, View } from "react-native";
import { Button, Text, List } from "react-native-paper";
import FoodNutrition from "./FoodNutrition";
import FoodImage from "./FoodImage";

export default function FoodList() {
    return (
        <View style={styles.container}>
            <FoodNutrition />
            <FoodImage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        backgroundColor: "#fff",
    },
});
