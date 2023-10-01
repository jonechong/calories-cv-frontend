import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

export default function FoodImage() {
    const imagePressed = () => {
        console.log("Image pressed!");
    };

    return (
        <View style={styles.container}>
            <IconButton icon="food" onPress={imagePressed}></IconButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#fff",
    },
});
