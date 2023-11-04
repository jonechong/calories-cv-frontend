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
import DateTimePicker from "@react-native-community/datetimepicker";
import ImageView from "../components/AddFood/ImageView";
import AddFoodButtons from "../components/AddFood/AddFoodButtons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddFood({ navigation, FoodData }) {
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
    const [date, setDate] = useState(new Date());
    const [macroData, setMacroData] = useState({
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
    });
    const foodInputs = [
        { name: "calories", label: "Calories (kcal)", keyboardType: "numeric" },
        { name: "protein", label: "Protein (g)", keyboardType: "numeric" },
        { name: "carbs", label: "Carbs (g)", keyboardType: "numeric" },
        { name: "fats", label: "Fats (g)", keyboardType: "numeric" },
    ];

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleInputChange = (name, value) => {
        // Check if the input is numeric or empty
        const isNumericOrEmpty = value === "" || /^\d*\.?\d*$/.test(value);
        if (isNumericOrEmpty) {
            setMacroData({ ...macroData, [name]: value });
        }
    };

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
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
                        {/*  spacer is used to push the DateSelector to the left */}
                        <View style={styles.spacer} />
                    </View>
                </Appbar.Header>
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <TextInput
                        label="Food name"
                        value={foodName}
                        onChangeText={(text) => setFoodName(text)}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Date (DD/MM/YYYY)"
                        value={formatDate(date)}
                        editable={false}
                        right={
                            <TextInput.Icon
                                icon="calendar" // This is a placeholder, replace with your icon name
                                onPress={showDatePicker}
                            />
                        }
                        mode="outlined"
                        style={styles.input}
                    />
                    {isDatePickerVisible && (
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    )}
                    {foodInputs.map((input, index) => (
                        <TextInput
                            key={index}
                            label={input.label}
                            value={macroData[input.name]}
                            onChangeText={(text) =>
                                handleInputChange(input.name, text)
                            }
                            keyboardType={input.keyboardType}
                            mode="outlined"
                            style={styles.input}
                        />
                    ))}
                    <ImageView />
                    <AddFoodButtons />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
