import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import DateSelector from "../DateSelector";
import { useMemo } from "react";

export default function DashboardHeader({ date, onDateChange }) {
    const logoImage = require("../../assets/logo/logo_no_title.png");
    const theme = useTheme();

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
            },
            logoContainer: {
                width: "20%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
            },
            logo: {
                aspectRatio: 1,
                height: "80%",
            },
            dateSelector: {
                flex: 1,
            },
            spacer: {
                width: "20%", // Set width equal to logoContainer width
            },
        });
    }, [theme]);

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
