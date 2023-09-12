import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import DateSelector from "../DateSelector";
import FoodList from "./FoodList/FoodList";

export default function FoodDisplay() {
    return (
        <View style={styles.container}>
            <DateSelector />
            <FoodList />
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
