import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import DashboardButtons from "../../components/Dashboard/DashboardButtons";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useTheme, Surface, Button } from "react-native-paper";
import FoodView from "../../components/FoodDisplay/FoodView/FoodView";
import { useMemo } from "react";

export default function Dashboard({ navigation }) {
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1, // Ensure the container takes the full height
                position: "relative", // Set position to relative
            },
            contentContainer: {
                flex: 1, // Make the content container take the remaining height
                marginHorizontal: marginSize,
                backgroundColor: theme.colors.background,
            },
        });
    }, [theme]);

    //Add margin if screen size is large
    const { width } = useWindowDimensions();
    const breakpoint = 768;
    const marginSize = width > breakpoint ? width * 0.2 : 0; //0.2 corresponds to 20%

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <View style={styles.container}>
            <DashboardHeader
                date={selectedDate}
                onDateChange={handleDateChange}
            />
            <View style={styles.contentContainer}>
                <FoodView date={selectedDate} />
            </View>
            <DashboardButtons />
        </View>
    );
}
