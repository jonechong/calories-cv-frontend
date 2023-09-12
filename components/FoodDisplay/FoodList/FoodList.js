import { StyleSheet, View } from "react-native";
import { Button, Text, List } from "react-native-paper";

export default function FoodList() {
    return (
        <View style={styles.container}>
            <List.Item
                title="First Item"
                description="Item description"
                left={(props) => <List.Icon {...props} icon="folder" />}
            />
            <List.Item
                title="First Item"
                description="Item description"
                left={(props) => <List.Icon {...props} icon="folder" />}
            />
            <List.Item
                title="First Item"
                description="Item description"
                left={(props) => <List.Icon {...props} icon="folder" />}
            />
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
