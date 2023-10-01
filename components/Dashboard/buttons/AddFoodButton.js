import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export default function AddFoodButton() {
    const addFood = () => {
        console.log("Add Food Pressed");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={addFood}
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    variant="labelMedium"
                    style={{ width: "100%", textAlign: "center" }}
                >
                    Add Food
                </Text>
                <Image
                    style={{ width: "100%", aspectRatio: 1 }}
                    source={require("../../../assets/buttons/addFoodButton.svg")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: "20%",
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        // justifyContent: "center",
        alignItems: "center",
    },
});
