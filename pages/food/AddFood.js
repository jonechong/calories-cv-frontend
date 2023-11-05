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
import ImageView from "../../components/food/ImageView";
import FoodActionButtons from "../../components/food/FoodActionButtons";
import FoodFields from "../../components/food/FoodFields";
import { insertDb } from "../../dbFunctions";
import { useNavigation } from "@react-navigation/native";

export default function AddFood({ route }) {
    const navigation = useNavigation();
    const logoImage = require("../../assets/logo_greyscale.png");
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

    const [imageUri, setImageUri] = useState(null);
    const [foodName, setFoodName] = useState("");
    const [foodDate, setFoodDate] = useState(route.params.date);
    const [macroData, setMacroData] = useState({
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
    });
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

    const submit = (foodProps) => {
        const { foodName, foodDate, macroData, imageUri } = foodProps;
        const foodDateObj = new Date(foodProps.foodDate);
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
        // Save entry into db
        insertDb(foodData)
            .then((result) => {
                console.log("Record inserted successfully", result);
            })
            .catch((error) => {
                console.error("Failed to insert record:", error);
            });
        navigation.navigate("Dashboard");
    };

    const cancel = () => {
        console.log("Cancel Pressed");
        navigation.navigate("Dashboard");
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
                    <FoodActionButtons
                        foodProps={foodProps}
                        submitFunction={submit}
                        cancelFunction={cancel}
                    />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
