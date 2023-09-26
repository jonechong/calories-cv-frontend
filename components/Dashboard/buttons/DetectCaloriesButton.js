import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export default function DetectCaloriesButton() {
    const detectCalories = () => {
        console.log("Detect Calories Pressed");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={detectCalories}
                style={{
                    width: screenWidth / 4,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text variant="labelMedium" style={{ textAlign: "center" }}>
                    Detect Calories{" "}
                </Text>
                <Image
                    style={{ width: "100%", aspectRatio: 1 }}
                    source={require("../../../assets/buttons/cameraButton.svg")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        alignItems: "center",
    },
});
