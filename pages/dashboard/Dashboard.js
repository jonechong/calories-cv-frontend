import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import DashboardButtons from "../../components/Dashboard/DashboardButtons";

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
