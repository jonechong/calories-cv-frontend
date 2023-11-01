import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Surface, Button, useTheme, IconButton } from "react-native-paper";
import DetectCaloriesButton from "./buttons/DetectCaloriesButton";

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
            flexDirection: "column",
            justifyContent: "space-evenly",
            backgroundColor: theme.colors.background,
            alignItems: "flex-end",
            paddingBottom: "2.5%",
        },
        button: {
            marginVertical: "0.3%",
            width: "100%",
        },
    });

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
                            style={styles.button}
                            onPress={buttonFunctions.historyButton}
                        >
                            History
                        </Button>
                        <Button
                            icon="food"
                            mode="contained"
                            style={styles.button}
                            onPress={buttonFunctions.addFoodButton}
                        >
                            Add Food
                        </Button>
                        <DetectCaloriesButton styles={styles}/>
                    </>
                )}
            </Animated.View>

            <IconButton
                icon="menu"
                mode="contained"
                style={{}}
                size={30}
                onPress={() => setIsExpanded(!isExpanded)}
            />
        </View>
    );
}
