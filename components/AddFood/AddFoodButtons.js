import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function AddFoodButtons() {
    const navigation = useNavigation();
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
    const submit = () => {
        console.log("Submit Pressed");
    };

    const cancel = () => {
        console.log("Cancel Pressed");
        navigation.navigate("Dashboard");
    };
    return (
        <View style={styles.container}>
            {/* Submit Button */}
            <Button mode="contained" style={styles.button} onPress={submit}>
                Submit
            </Button>
            {/* Cancel Button */}
            <Button
                mode="contained"
                style={styles.button}
                buttonColor={theme.colors.error}
                textColor={theme.colors.onError}
                onPress={cancel}
            >
                Cancel
            </Button>
        </View>
    );
}
