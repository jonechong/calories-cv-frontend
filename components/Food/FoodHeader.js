import { Appbar, Text, useTheme } from "react-native-paper";
import { useMemo } from "react";

export default function FoodHeader() {
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
            spacer: {
                width: "20%", // Set width equal to logoContainer width
            },
            title: {
                fontSize: 20,
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
                <Text style={styles.title}>Add Food</Text>
                {/*  spacer is used to push the title to the left */}
                <View style={styles.spacer} />
            </View>
        </Appbar.Header>
    );
}
