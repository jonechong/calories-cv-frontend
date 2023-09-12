import { StyleSheet, View } from "react-native";
import {
    Button,
    Caption,
    Headline,
    IconButton,
    Subheading,
    Text,
    Title,
} from "react-native-paper";

export default function DateSelector() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    return (
        <View style={styles.container}>
            <IconButton
                icon="chevron-left"
                onPress={() => {
                    /* logic to decrease the date */
                }}
            ></IconButton>
            <Subheading style={{ color: "black" }}>
                {currentDay}/{currentMonth}/{currentYear}
            </Subheading>
            <IconButton
                icon="chevron-right"
                onPress={() => {
                    /* logic to increase the date */
                }}
            ></IconButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center", // vertically center items
        justifyContent: "center", // horizontally center items
        // justifyContent: "space-between", // space items out evenly
        paddingHorizontal: 10, // for a little padding on the sides
    },
});
