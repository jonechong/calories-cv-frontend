import { StyleSheet, Text, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function DashboardHeader() {
    const theme = useTheme();
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Dashboard" />
            </Appbar.Header>
        </View>
    );
}
