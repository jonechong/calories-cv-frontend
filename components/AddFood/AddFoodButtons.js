import { StyleSheet, View } from "react-native";
import {
    Button,
    Dialog,
    Paragraph,
    Portal,
    useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

export default function AddFoodButtons({
    foodName,
    foodDate,
    macroData,
    imageUri,
}) {
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

    const db = SQLite.openDatabase("calories-cv.db");

    const insertDb = async ({
        foodName,
        foodDate,
        calories,
        protein,
        fats,
        carbs,
        imageUri,
    }) => {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `INSERT INTO logged_food (food_name, food_date, calories, protein, fats, carbs, image_uri)
                  VALUES (?, ?, ?, ?, ?, ?, ?);`,
                    [
                        foodName,
                        foodDate,
                        calories,
                        protein,
                        fats,
                        carbs,
                        imageUri,
                    ],
                    (_, result) => {
                        resolve(result);
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    };

    const submit = () => {
        const foodDateObj = new Date(foodDate);
        const formattedFoodDate = foodDateObj.toISOString().split("T")[0];
        const foodData = {
            foodName,
            foodDate: formattedFoodDate,
            calories: macroData.calories.trim()
                ? parseInt(macroData.calories)
                : null,
            protein: macroData.protein.trim()
                ? parseInt(macroData.protein)
                : null,
            carbs: macroData.carbs.trim() ? parseInt(macroData.carbs) : null,
            fats: macroData.fats.trim() ? parseInt(macroData.fats) : null,
            imageUri,
        };

        // Data validation
        if (!foodName.trim() || !foodDate || !macroData.calories.trim()) {
            setDialogVisible(true);
        } else {
            // Save entry into db
            insertDb(foodData)
                .then((result) => {
                    console.log("Record inserted successfully", result);
                })
                .catch((error) => {
                    console.error("Failed to insert record:", error);
                });
            navigation.navigate("Dashboard");
        }
    };

    const cancel = () => {
        console.log("Cancel Pressed");
        navigation.navigate("Dashboard");
    };

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
