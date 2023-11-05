import { StyleSheet, View } from "react-native";
import {
    Button,
    Dialog,
    Paragraph,
    Portal,
    useTheme,
} from "react-native-paper";
import { useMemo, useState, useEffect } from "react";

export default function FoodActionButtons({
    foodProps,
    submitFunction,
    cancelFunction,
}) {
    const { foodName, foodDate, macroData, imageUri } = foodProps;
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

    useEffect(() => {
        // This function is called when the component unmounts
        return () => {
            db.closeAsync()
                .then(() => {
                    console.log("Database closed successfully");
                })
                .catch((error) => {
                    console.error("Error closing the database", error);
                });
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* Submit Button */}
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                    if (
                        !foodName.trim() ||
                        !foodDate ||
                        !macroData.calories.trim()
                    ) {
                        setDialogVisible(true);
                    } else {
                        submitFunction(foodProps);
                    }
                }}
            >
                Submit
            </Button>
            {/* Cancel Button */}
            <Button
                mode="contained"
                style={styles.button}
                buttonColor={theme.colors.secondary}
                textColor={theme.colors.onSecondary}
                onPress={cancelFunction}
            >
                Cancel
            </Button>
            {/* Alert if missing fields below */}
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
