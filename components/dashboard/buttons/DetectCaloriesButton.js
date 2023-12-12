import React, { useState } from "react";
import { Image, View } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import {
    ActionSheetProvider,
    useActionSheet,
} from "@expo/react-native-action-sheet";

const backendUrl = "http://192.168.1.38:8000";

export default function DetectCaloriesButton({ styles, theme }) {
    const navigation = useNavigation();
    const { showActionSheetWithOptions } = useActionSheet();

    const showImagePicker = async () => {
        const { status: cameraRollStatus } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } =
            await ImagePicker.requestCameraPermissionsAsync();

        if (cameraRollStatus !== "granted" || cameraStatus !== "granted") {
            alert("Permissions to access camera and camera roll are required!");
            return;
        }

        const options = ["Take a Photo", "Choose from Gallery", "Cancel"];
        const cancelButtonIndex = options.indexOf("Cancel");
        const destructiveButtonIndex = cancelButtonIndex;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            (buttonIndex) => {
                if (buttonIndex === options.indexOf("Choose from Gallery")) {
                    pickImage();
                } else if (buttonIndex === options.indexOf("Take a Photo")) {
                    takePhoto();
                }
            }
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            saveImage(result.assets[0]);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            saveImage(result.assets[0]);
        }
    };

    const detectFoodProps = async (imageObject) => {
        try {
            // Extract the file extension from the image URI
            const fileExtension = imageObject.uri
                .split(".")
                .pop()
                .toLowerCase();

            // Determine the MIME type based on the file extension
            let mimeType = "image/jpeg"; // Default to JPEG
            if (fileExtension === "png") {
                mimeType = "image/png";
            } else if (fileExtension === "jpg" || fileExtension === "jpeg") {
                mimeType = "image/jpeg";
            } else if (fileExtension === "bmp") {
                mimeType = "image/bmp";
            } else if (fileExtension === "gif") {
                mimeType = "image/gif";
            }

            // Prepare the form data
            let formData = new FormData();
            formData.append("file", {
                uri: imageObject.uri,
                type: mimeType,
                name: `image.${fileExtension}`,
            });

            // Make the fetch request to the FastAPI server
            let response = await fetch(backendUrl + "/predict", {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let responseJson = await response.json();

            if (!response.ok) {
                throw new Error(responseJson.error || "API call failed");
            }

            return {
                ...responseJson,
                foodName: responseJson.prediction,
                imageUri: imageObject.uri,
            };
        } catch (error) {
            console.error("Error in detectFoodProps:", error);
            throw error;
        }
    };

    const saveImage = async (imageObject) => {
        console.log("Saved image URI:", imageObject.uri);
        try {
            const foodProps = await detectFoodProps(imageObject);
            // Replace underscores with spaces and capitalize each word
            const formattedFoodName = foodProps.prediction
                .replace(/_/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const modifiedFoodProps = {
                ...foodProps,
                calories: 1,
                protein: 2,
                fats: 3,
                carbs: 4,
                foodName: formattedFoodName,
                imageUri: foodProps.imageUri,
            };

            console.log("Modified Food props:", modifiedFoodProps);

            navigation.navigate("AddFood", {
                foodProps: modifiedFoodProps,
                date: new Date(
                    new Date().getTime() -
                        new Date().getTimezoneOffset() * 60000
                ).toISOString(),
            });
        } catch (error) {
            console.error("Error in saveImage:", error);
        }
    };

    return (
        <Button
            icon="camera"
            mode="contained"
            style={styles.button}
            textColor={theme.colors.onTertiary}
            buttonColor={theme.colors.tertiary}
            onPress={showImagePicker}
        >
            Detect Calories
        </Button>
    );
}
