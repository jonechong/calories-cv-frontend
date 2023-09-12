import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function DashboardHeader() {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Dashboard" />
            </Appbar.Header>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fff",
    },
});
