import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

export default function DashboardButtons() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => console.log("Add Food Pressed")}
                activeOpacity={0.75}
            >
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../assets/buttons/addFoodButton.svg")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Camera Pressed")}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../assets/buttons/cameraButton.svg")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("History Pressed")}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../assets/buttons/historyButton.svg")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});
