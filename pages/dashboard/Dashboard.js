import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import FoodDisplay from "./FoodDisplay";
import DashboardButtons from "./DashboardButtons";

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Dashboard" />
            </Appbar.Header>
            <FoodDisplay />
            <DashboardButtons />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
