import React, { useState } from "react";
import { Image, View } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";

import {
    ActionSheetProvider,
    useActionSheet,
} from "@expo/react-native-action-sheet";

const db = SQLite.openDatabase("ImageDatabase.db");

export default function DetectCaloriesButton({ styles, theme }) {
    const [imageUri, setImageUri] = useState(null);
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
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setImageUri(result.uri);
            saveImage(result.assets[0]);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setImageUri(result.uri);
            saveImage(result.assets[0]);
        }
    };

    const saveImage = (imageObject) => {
        const uri = imageObject.uri; // Assuming imageObject is the object containing the URI.

        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, uri TEXT);"
            );
            tx.executeSql(
                "INSERT INTO images (uri) VALUES (?);",
                [uri],
                (_, result) =>
                    console.log("Image saved to the database with URI:", uri),
                (_, error) =>
                    console.error(
                        "Failed to insert image URI into the database",
                        error
                    )
            );
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
