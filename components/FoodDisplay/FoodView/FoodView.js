import { StyleSheet, View } from "react-native";
import FoodList from "./FoodList/FoodList";
import { Card, Surface, useTheme } from "react-native-paper";

export default function FoodView({ date }) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            padding: "2.5%",
            margin: "4%",
            backgroundColor: theme.colors.secondaryContainer,
        },
    });

    return (
        <Card style={styles.container}>
            <FoodList />
            <FoodList />
            <FoodList />
        </Card>
    );
}
