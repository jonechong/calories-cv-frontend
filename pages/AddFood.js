import { useMemo, useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Appbar, Text, TextInput, useTheme } from "react-native-paper";
import ImageView from "../components/Food/ImageView";
import AddFoodButtons from "../components/Food/FoodButtons";
import FoodFields from "../components/Food/FoodFields";

export default function AddFood({ route }) {
    const logoImage = require("../assets/logo_greyscale.png");
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.secondaryContainer,
            },
            scrollContainer: {
                flexGrow: 1,
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.secondaryContainer,
            },
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
            input: {
                width: "95%",
                margin: "1%",
            },
            spacer: {
                width: "20%", // Set width equal to logoContainer width
            },
            title: {
                fontSize: 20,
            },
        });
    }, [theme]);

    const [foodName, setFoodName] = useState("");
    const [foodDate, setFoodDate] = useState(route.params.date);
    const [macroData, setMacroData] = useState({
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
    });
    const [imageUri, setImageUri] = useState(null);

    const foodProps = {
        foodName,
        setFoodName,
        foodDate,
        setFoodDate,
        macroData,
        setMacroData,
        imageUri,
        setImageUri,
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
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
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <FoodFields foodProps={foodProps} />
                    <ImageView imageUri={imageUri} setImageUri={setImageUri} />

                    <AddFoodButtons foodProps={foodProps} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
