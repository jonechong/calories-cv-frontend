import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import CalendarPicker from "../CalendarPicker";

export default function FoodFields({ foodProps }) {
    const theme = useTheme();
    const [isCalendarVisible, setCalendarVisibility] = useState(false);
    const styles = useMemo(() => {
        return StyleSheet.create({
            input: {
                margin: "1%",
            },
            container: { width: "95%" },
        });
    }, [theme]);

    const macroInputs = [
        {
            name: "calories",
            label: (
                <>
                    Calories (kcal)
                    <Text
                        style={{
                            color: "orange",
                        }}
                    >
                        *
                    </Text>
                </>
            ),
            keyboardType: "numeric",
        },
        { name: "protein", label: "Protein (g)", keyboardType: "numeric" },
        { name: "carbs", label: "Carbs (g)", keyboardType: "numeric" },
        { name: "fats", label: "Fats (g)", keyboardType: "numeric" },
    ];

    const handleInputChange = (name, value) => {
        // Check if the input is numeric or empty
        const isIntegerOrEmpty = value === "" || /^-?\d+$/.test(value);
        if (isIntegerOrEmpty) {
            foodProps.setMacroData({ ...foodProps.macroData, [name]: value });
        }
    };

    const handleDateChange = (newDate) => {
        foodProps.setFoodDate(newDate);
        setCalendarVisibility(false);
    };

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${
            dateObj.getMonth() + 1
        }/${dateObj.getFullYear()}`;
    };
    const showCalendar = () => {
        setCalendarVisibility(true);
    };

    return (
        <View style={styles.container}>
            <TextInput
                label={
                    <>
                        Food name
                        <Text
                            style={{
                                color: "orange",
                            }}
                        >
                            *
                        </Text>
                    </>
                }
                value={foodProps.foodName}
                onChangeText={(text) => foodProps.setFoodName(text)}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label={
                    <>
                        Date (DD/MM/YYYY)
                        <Text
                            style={{
                                color: "orange",
                            }}
                        >
                            *
                        </Text>
                    </>
                }
                value={formatDate(foodProps.foodDate)}
                editable={false}
                right={
                    <TextInput.Icon icon="calendar" onPress={showCalendar} />
                }
                mode="outlined"
                style={styles.input}
            />

            <CalendarPicker
                currentDate={new Date(foodProps.foodDate)}
                onDateChange={handleDateChange}
                themeColors={theme.colors}
                isCalendarVisible={isCalendarVisible}
                setCalendarVisibility={setCalendarVisibility}
            />

            {macroInputs.map((input, index) => (
                <TextInput
                    key={index}
                    label={input.label}
                    value={foodProps.macroData[input.name]}
                    onChangeText={(text) => handleInputChange(input.name, text)}
                    keyboardType={input.keyboardType}
                    mode="outlined"
                    style={styles.input}
                />
            ))}
        </View>
    );
}
