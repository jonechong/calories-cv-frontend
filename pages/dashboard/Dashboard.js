import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import DashboardButtons from "../../components/Dashboard/DashboardButtons";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useTheme, Surface } from "react-native-paper";
import FoodView from "../../components/FoodDisplay/FoodView/FoodView";

export default function Dashboard() {
    const theme = useTheme();

    //Add margin if screen size is large
    const { width } = useWindowDimensions();
    const breakpoint = 768;
    const marginSize = width > breakpoint ? width * 0.2 : 0; //0.2 corresponds to 20%

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <Surface>
            <DashboardHeader
                date={selectedDate}
                onDateChange={handleDateChange}
            />
            <Surface
                style={{
                    marginHorizontal: marginSize,
                    backgroundColor: theme.colors.background,
                }}
            >
                <FoodView date={selectedDate} />
                <DashboardButtons />
            </Surface>
        </Surface>
    );
}
