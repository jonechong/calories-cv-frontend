import { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function FoodFields({ foodProps }) {
    const theme = useTheme();
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

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleInputChange = (name, value) => {
        // Check if the input is numeric or empty
        const isIntegerOrEmpty = value === "" || /^-?\d+$/.test(value);
        if (isIntegerOrEmpty) {
            foodProps.setMacroData({ ...foodProps.macroData, [name]: value });
        }
    };

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${
            dateObj.getMonth() + 1
        }/${dateObj.getFullYear()}`;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        foodProps.setFoodDate(date);
        hideDatePicker();
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
                    <TextInput.Icon icon="calendar" onPress={showDatePicker} />
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
