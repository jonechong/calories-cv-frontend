import { StyleSheet, View } from "react-native";
import DashboardButtons from "../../components/Dashboard/DashboardButtons";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <DashboardHeader />
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
