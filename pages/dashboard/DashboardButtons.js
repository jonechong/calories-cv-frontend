import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function DashboardButtons() {
    return (
        <View style={styles.container}>
            <Button>Detect Calories</Button>
            <Button>Add Food</Button>
            <Button>History</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
});
