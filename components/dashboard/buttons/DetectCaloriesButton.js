import React, { useState } from "react";
import { Image, View } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import {
    ActionSheetProvider,
    useActionSheet,
} from "@expo/react-native-action-sheet";

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
        //This is where you call your backend service to detect your food properties
        //Dummy data since backend is not implemented yet
        const dummyFoodProps = {
            foodName: "Dummy food name",
            calories: 1,
            protein: 2,
            fats: 3,
            carbs: 4,
            imageUri: imageObject.uri,
        };
        return dummyFoodProps;
    };

    const saveImage = (imageObject) => {
        console.log("Saved image URI:", imageObject.uri);
        // Dummy backend data
        detectFoodProps(imageObject)
            .then((foodProps) => {
                navigation.navigate("AddFood", {
                    foodProps: foodProps,
                    date: new Date().toISOString(),
                });
            })
            .catch((error) => {
                console.log(error);
            });
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
