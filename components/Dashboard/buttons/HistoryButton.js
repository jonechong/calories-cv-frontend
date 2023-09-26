import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export default function HistoryButton() {
    const viewHistory = () => {
        console.log("viewHistory Pressed");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={viewHistory}
                style={{
                    width: screenWidth / 4,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text variant="labelMedium" style={{ textAlign: "center" }}>
                    History
                </Text>
                <Image
                    style={{ width: "100%", aspectRatio: 1 }}
                    source={require("../../../assets/buttons/historyButton.svg")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        // justifyContent: "center",
        alignItems: "center",
    },
});
