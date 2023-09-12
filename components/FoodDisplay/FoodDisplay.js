import { StyleSheet, View } from "react-native";
import DateSelector from "../DateSelector";
import FoodList from "./FoodView/FoodList/FoodList";
import FoodView from "./FoodView/FoodView";

export default function FoodDisplay() {
    return (
        <View style={styles.container}>
            <DateSelector />
            <FoodView />
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
