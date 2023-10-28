import { StyleSheet, View, useWindowDimensions } from "react-native";
import DashboardButtons from "../../components/Dashboard/DashboardButtons";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useTheme, Surface } from "react-native-paper";

export default function Dashboard() {
    const theme = useTheme();

    //Add margin if screen size is large
    const { width } = useWindowDimensions();
    const breakpoint = 768;
    const marginSize = width > breakpoint ? width * 0.2 : 0; //0.2 corresponds to 20%

    return (
        <Surface>
            <DashboardHeader />
            <Surface style={{ marginHorizontal: marginSize }}>
                <FoodDisplay />
                <DashboardButtons />
            </Surface>
        </Surface>
    );
}
