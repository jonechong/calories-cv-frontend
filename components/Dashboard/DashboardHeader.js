import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import DateSelector from "../DateSelector";

export default function DashboardHeader({ date, onDateChange }) {
    const logoImage = require("../../assets/placeholder_logo.png");
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
        },
        logoContainer: {
            width: "20%", // Set width as per your preference
            height: "100%",
            justifyContent: "center",
            paddingHorizontal: 10,
        },
        logo: {
            aspectRatio: 1,
            height: "100%",
            width: "100%",
        },
        dateSelector: {
            flex: 1,
        },
        spacer: {
            width: "20%", // Set width equal to logoContainer width
        },
    });

    // spacer is used to push the DateSelector to the left
    return (
        <Appbar.Header>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        source={logoImage}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <DateSelector
                    style={styles.dateSelector}
                    date={date}
                    onDateChange={onDateChange}
                />
                <View style={styles.spacer} />
            </View>
        </Appbar.Header>
    );
}
