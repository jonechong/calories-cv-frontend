import { StyleSheet, Text, View } from "react-native";

export default function FoodDisplay() {
    return (
        <View style={styles.container}>
            <Text>Food Display</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
