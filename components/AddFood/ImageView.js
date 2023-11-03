import React, { useState } from "react";
import {
    View,
    Image,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton, useTheme } from "react-native-paper";

export default function ImageView({ onImageSelected }) {
    const [imageUri, setImageUri] = useState(null);
    const theme = useTheme();
    const styles = StyleSheet.create({
        imageContainer: {
            marginTop: "6%",
            width: "60%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 30,
            borderStyle: "dashed",
            borderColor: theme,
        },
        image: {
            // width: 200, // Set the width as needed
            // height: 200, // Set the height as needed
            marginTop: 20,
        },
    });

    const handleSelectImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true, // Optional, depending on your needs
            // quality: 1, // Optional, 1 is the highest quality
        });

        if (!result.canceled) {
            setImageUri(result.uri);
            if (onImageSelected) {
                onImageSelected(result.assets[0]);
            }
        }
    };

    return (
        <View style={styles.imageContainer}>
            <TouchableWithoutFeedback
                style={{ width: "100%", aspectRatio: 1 }}
                onPress={handleSelectImage}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        icon="image"
                        size={80}
                        style={{ backgroundColor: "transparent" }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}