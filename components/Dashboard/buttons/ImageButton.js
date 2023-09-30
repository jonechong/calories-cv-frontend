import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";

export default function ImageButton({
    buttonFunction,
    buttonImagePath,
    buttonText,
}) {
    // console.log(buttonImagePath);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={buttonFunction}
                style={{
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    variant="labelMedium"
                    style={{ width: "100%", textAlign: "center" }}
                >
                    {buttonText}
                </Text>
                <Image
                    style={{ width: "100%", aspectRatio: 1 }}
                    source={buttonImagePath}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "20%",
        flexDirection: "column",
        backgroundColor: "#fff",
        alignContent: "center",
        alignItems: "center",
    },
});
