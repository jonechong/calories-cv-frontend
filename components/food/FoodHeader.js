import { Appbar, Text, useTheme } from "react-native-paper";
import { useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function FoodHeader({ title }) {
    const logoImage = require("../../assets/logo_greyscale.png");
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            header: {
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
            titleContainer: {
                justifyContent: "center",
                height: "100%",
            },
            spacer: {
                width: "20%", // Set width equal to logoContainer width
            },
            title: {
                paddingBottom: 5,
                fontSize: 20,
                textAlignVertical: "center", // Center the title vertically
            },
        });
    }, [theme]);
    return (
        <Appbar.Header>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={logoImage}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {/*  spacer is used to push the title to the left */}
                <View style={styles.spacer} />
            </View>
        </Appbar.Header>
    );
}
