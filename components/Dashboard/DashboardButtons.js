import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Surface, Button, useTheme, IconButton } from "react-native-paper";

export default function DashboardButtons() {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    useEffect(() => {
        if (isExpanded) {
            // Fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isExpanded, fadeAnim]);

    const styles = StyleSheet.create({
        container: {
            position: "absolute", // Position the buttons absolutely
            bottom: 0, // Position the buttons at the bottom of the screen
            right: 0, // Align the buttons to the right
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
        },
        button: {
            marginVertical: "0.3%",
            width: "100%",
        },
    });

    const buttonImagesPath = {
        addFoodButton: require("../../assets/buttons/addFoodButton.svg"),
        detectCaloriesButton: require("../../assets/buttons/cameraButton.svg"),
        historyButton: require("../../assets/buttons/historyButton.svg"),
    };

    const buttonFunctions = {
        addFoodButton: () => {
            console.log("Add Food pressed");
        },
        detectCaloriesButton: () => {
            console.log("Detect Calories pressed");
        },
        historyButton: () => {
            console.log("History pressed");
        },
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={{ opacity: fadeAnim, alignItems: "flex-end" }}
            >
                {isExpanded && (
                    <>
                        <Button
                            icon="history"
                            mode="contained"
                            textColor={theme.colors.onTertiary}
                            buttonColor={theme.colors.tertiary}
                            style={styles.button}
                            onPress={buttonFunctions.historyButton}
                        >
                            History
                        </Button>
                        <Button
                            icon="food"
                            mode="contained"
                            textColor={theme.colors.onTertiary}
                            buttonColor={theme.colors.tertiary}
                            style={styles.button}
                            onPress={buttonFunctions.addFoodButton}
                        >
                            Add Food
                        </Button>
                        <Button
                            icon="camera"
                            mode="contained"
                            textColor={theme.colors.onTertiary}
                            buttonColor={theme.colors.tertiary}
                            style={styles.button}
                            onPress={buttonFunctions.detectCaloriesButton}
                        >
                            Detect Calories
                        </Button>
                    </>
                )}
            </Animated.View>

            <IconButton
                icon="menu"
                mode="contained"
                style={{}}
                size={30}
                containerColor={theme.colors.tertiary}
                iconColor={theme.colors.onTertiary}
                onPress={() => setIsExpanded(!isExpanded)}
            />
        </View>
    );
}
