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
import { useEffect } from "react";
import { useMemo } from "react";

export default function ImageView({ onImageSelected }) {
    const [imageUri, setImageUri] = useState(null);
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            imageContainer: {
                marginTop: "6%",
                width: "60%",
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 30,
                borderStyle: "dashed",
                borderColor: theme.colors.primary,
            },
            image: {
                width: "99.5%",
                aspectRatio: 1,
                borderRadius: 30,
            },
            touchableArea: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
        });
    }, [theme]);

    const handleSelectImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Enable editing
            aspect: [1, 1], // Force a 1:1 aspect ratio for cropping
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            if (onImageSelected) {
                onImageSelected(result.assets[0]);
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleSelectImage}>
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <View style={styles.touchableArea}>
                        <IconButton
                            icon="image-plus"
                            iconColor={theme.colors.primary}
                            size={120}
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: 0,
                            }}
                        />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}
