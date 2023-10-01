import { StyleSheet, View, useWindowDimensions } from "react-native";
import DashboardButtons from "../../components/Dashboard/DashboardButtons";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

export default function Dashboard() {
    //Add margin if screen size is large
    const { width } = useWindowDimensions();
    const breakpoint = 768;
    const marginSize = width > breakpoint ? width * 0.2 : 0; //0.2 corresponds to 20%

    return (
        <View style={styles.container}>
            <DashboardHeader />
            <View style={{ marginHorizontal: marginSize }}>
                <FoodDisplay />
                <DashboardButtons />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "#fff",
    },
    spacer: { width: "20%" },
});
