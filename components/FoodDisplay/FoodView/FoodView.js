import { StyleSheet, View } from "react-native";
import FoodList from "./FoodList/FoodList";

export default function FoodView() {
    return (
        <View style={styles.container}>
            <FoodList />
            <FoodList />
            <FoodList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
    },
});
