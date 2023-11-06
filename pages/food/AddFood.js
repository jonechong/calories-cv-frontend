import { useMemo, useState } from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useTheme } from "react-native-paper";
import ImageView from "../../components/food/ImageView";
import FoodActionButtons from "../../components/food/FoodActionButtons";
import FoodFields from "../../components/food/FoodFields";
import { insertDb } from "../../dbFunctions";
import { useNavigation } from "@react-navigation/native";
import FoodHeader from "../../components/food/FoodHeader";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";

export default function AddFood({ route }) {
    const navigation = useNavigation();
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

    const deleteOldImage = async (imageUri) => {
        if (!imageUri) {
            console.log("No image");
            return;
        }
        try {
            await FileSystem.deleteAsync(imageUri, { idempotent: true });
            console.log(`Deleted old image`);
        } catch (error) {
            console.error(`Error deleting old image: ${error.message}`);
        }
    };

    const submit = (foodProps) => {
        const { foodName, foodDate, macroData, imageUri } = foodProps;
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
        // Save entry into db
        insertDb(foodData)
            .then((result) => {
                console.log("Record inserted successfully");
            })
            .catch((error) => {
                console.error("Failed to insert record:", error);
            });
        navigation.navigate("Dashboard");
    };

    const cancel = () => {
        console.log("Cancel Pressed");
        deleteOldImage(imageUri)
            .then()
            .catch((error) => {
                console.error(error);
            });
        navigation.navigate("Dashboard");
    };

    useEffect(() => {
        if (route.params.foodProps) {
            const incomingFoodProps = route.params.foodProps;
            setImageUri(incomingFoodProps.imageUri);
            setFoodName(incomingFoodProps.foodName);
            const incomingMacroData = {
                calories: incomingFoodProps.calories.toString(),
                protein: incomingFoodProps.protein.toString(),
                carbs: incomingFoodProps.carbs.toString(),
                fats: incomingFoodProps.fats.toString(),
            };
            setMacroData(incomingMacroData);
        }
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <FoodHeader title={"Add Food"} />
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
