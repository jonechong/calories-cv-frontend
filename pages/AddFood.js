import { useState } from "react";
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

export default function AddFood({ FoodData }) {
    const logoImage = require("../assets/logo_greyscale.png");
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
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
            // fontSize: 15,
            // height: 35,
        },
        spacer: {
            width: "20%", // Set width equal to logoContainer width
        },
        title: {
            fontSize: 20, // Adjust the size as necessary
            fontWeight: "bold", // If you want the text to be bold
        },
    });

    const [foodName, setFoodName] = useState("");
    const [date, setDate] = useState(new Date());
    const [foodData, setFoodData] = useState({
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
        setInputValues({ ...inputValues, [name]: value });
    };

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDatePickerVisibility(false);
        setDate(currentDate);
    };

    // spacer is used to push the DateSelector to the left
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust the value as needed for header height
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                            <View style={styles.spacer} />
                        </View>
                    </Appbar.Header>
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
                        // onFocus={showDatePicker}
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
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    {foodInputs.map((input, index) => (
                        <TextInput
                            key={index}
                            label={input.label}
                            value={foodData[input.name]}
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
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
