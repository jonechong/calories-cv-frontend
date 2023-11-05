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
import { updateFoodLog } from "../../dbFunctions";
import { useNavigation } from "@react-navigation/native";
import FoodHeader from "../../components/food/FoodHeader";

export default function EditFood({ route }) {
    const foodEntry = route.params.foodEntry;
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

    const [imageUri, setImageUri] = useState(foodEntry.image_uri);
    const [foodName, setFoodName] = useState(foodEntry.food_name);
    const [foodDate, setFoodDate] = useState(foodEntry.food_date);
    const [macroData, setMacroData] = useState({
        calories:
            foodEntry.calories !== null ? foodEntry.calories.toString() : "",
        protein: foodEntry.protein !== null ? foodEntry.protein.toString() : "",
        carbs: foodEntry.carbs !== null ? foodEntry.carbs.toString() : "",
        fats: foodEntry.fats !== null ? foodEntry.fats.toString() : "",
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
        // updateDb
        const logId = foodEntry.log_id;
        updateFoodLog(logId, foodData)
            .then(() => {
                console.log("The food log has been updated.");
            })
            .catch((error) => {
                console.error("Error updating the food log:", error);
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
                <FoodHeader title={"Edit Food"} />
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
