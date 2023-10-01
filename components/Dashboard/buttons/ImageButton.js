import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function ImageButton({
    buttonFunction,
    buttonImagePath,
    buttonText,
}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={buttonFunction}
                style={{
                    width: "100%",
                    flexDirection: "column",
                }}
            >
                <Text
                    variant="labelMedium"
                    style={{
                        width: "100%",
                        textAlign: "center",
                        textAlignVertical: "center",
                    }}
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
        justifyContent: "flex-end",
        flexDirection: "column",
        backgroundColor: "#fff",
    },
});
