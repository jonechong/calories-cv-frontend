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

const DetectCaloriesButton = ({ styles, theme }) => {
    
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

        const options =
            Platform.OS === "android"
                ? ["Take a Photo", "Choose from Gallery", "Cancel"]
                : ["Cancel", "Take a Photo", "Choose from Gallery "];
        const cancelButtonIndex = 0;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
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
            saveImage(result.assets);
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
            saveImage(result.assets);
        }
    };

    const saveImage = (uri) => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists images (id integer primary key not null, uri text);"
            );
            tx.executeSql("insert into images (uri) values (?)", [uri]);
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
};

export default DetectCaloriesButton;
