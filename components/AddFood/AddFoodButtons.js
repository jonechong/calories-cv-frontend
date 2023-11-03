import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
const screenWidth = Dimensions.get("window").width;

export default function AddFoodButtons() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            padding: "2.5%",
            marginBottom: "3%",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "flex-end",
            justifyContent: "space-evenly",
        },
        button: {
            width: "33%",
        },
    });
    const addFood = () => {
        console.log("Add Food Pressed");
    };

    return (
        <View style={styles.container}>
            {/* Submit Button */}
            <Button mode="contained" style={styles.button} onPress={addFood}>
                Submit
            </Button>
            {/* Cancel Button */}
            <Button
                mode="contained"
                style={styles.button}
                buttonColor={theme.colors.error}
                textColor={theme.colors.onError}
                onPress={addFood}
            >
                Cancel
            </Button>
        </View>
    );
}
