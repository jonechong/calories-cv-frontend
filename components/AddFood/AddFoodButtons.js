import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import {
    Text,
    Button,
    Dialog,
    Paragraph,
    Portal,
    useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";

export default function AddFoodButtons({ foodName, foodDate, macroData }) {
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
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
    }, [theme]);

    const [isDialogVisible, setDialogVisible] = useState(false);

    const validateInput = () => {
        if (!foodName.trim()) {
            Alert.alert("Validation Error", "Please enter a food name.");
            return false;
        }

        if (!foodDate) {
            Alert.alert("Validation Error", "Please select a date.");
            return false;
        }

        if (!macroData.calories.trim()) {
            Alert.alert(
                "Validation Error",
                "Please enter the number of calories."
            );
            return false;
        }

        return true;
    };

    const submit = () => {
        const foodData = { foodName, foodDate, ...macroData };
        console.log(foodData);
        console.log("Submit Pressed");

        // Trim the values and check if they are not empty
        if (!foodName.trim() || !foodDate || !macroData.calories.trim()) {
            // Set the state to true to show the dialog
            setDialogVisible(true);
        } else {
            // Proceed with your submit logic
        }
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
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.onSecondary}
                onPress={cancel}
            >
                Cancel
            </Button>
            <Portal>
                <Dialog
                    visible={isDialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                    style={{
                        backgroundColor: theme.colors.surfaceVariant,
                    }}
                >
                    <Dialog.Title>Missing fields</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={{ color: theme.colors.onSurface }}>
                            Please fill out all required fields.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>
                            OK
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}
