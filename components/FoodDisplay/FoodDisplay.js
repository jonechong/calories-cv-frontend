import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import DateSelector from "../DateSelector";

export default function FoodDisplay() {
    return (
        <View style={styles.container}>
            <DateSelector />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
});
