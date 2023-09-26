import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import DetectCaloriesButton from "./buttons/DetectCaloriesButton";
import AddFoodButton from "./buttons/AddFoodButton";
import HistoryButton from "./buttons/HistoryButton";

export default function DashboardButtons() {
    return (
        <View style={styles.container}>
            <DetectCaloriesButton />
            <AddFoodButton />
            <HistoryButton />
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
