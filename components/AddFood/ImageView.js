import React, { useState } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";

const ImageViewComponent = ({ onImageSelected }) => {
    const [imageUri, setImageUri] = useState(null);

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
            <IconButton icon="image" onPress={handleSelectImage} />
            {/* {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: "100%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200, // Set the width as needed
        height: 200, // Set the height as needed
        marginTop: 20,
    },
});

export default ImageViewComponent;
