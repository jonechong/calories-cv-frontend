import React, { useState, useCallback, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
    List,
    useTheme,
    Card,
    TouchableRipple,
    Title,
    Portal,
    Dialog,
    Paragraph,
    Button,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/core";
import { fetchDb, deleteFoodLog } from "../../dbFunctions";
import DbContext from "../../context/DbContext";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

export default function FoodView({ date }) {
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = StyleSheet.create({
        foodList: { width: "100%" },
        foodView: {
            padding: "1%",
            margin: "4%",
            backgroundColor: theme.colors.secondaryContainer,
        },
        touchable: {
            width: "100%",
            paddingHorizontal: "4%",
            borderRadius: 10,
            overflow: "hidden",
        },
        image: {
            height: 50, // set a fixed height for images
            aspectRatio: 1,
            borderRadius: 10,
        },
    });

    //////////////////////////////////////////////////////////////////////////////
    // For deletion confirmation dialog
    const [dialogVisible, setDialogVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const confirmDeletion = (item) => {
        setItemToDelete(item);
        setDialogVisible(true);
    };

    const deleteOldImage = async (imageUri) => {
        try {
            await FileSystem.deleteAsync(imageUri, { idempotent: true });
            console.log(`Deleted old image`);
        } catch (error) {
            console.error(`Error deleting old image: ${error.message}`);
        }
    };

    const deleteItem = () => {
        deleteFoodLog(itemToDelete.log_id)
            .then(() => {
                const originalImageUri = itemToDelete.image_uri;
                if (originalImageUri) {
                    // Only delete the old image if there is an old image
                    return deleteOldImage(originalImageUri);
                }
            })
            .then(() => {
                // After successful deletion, refetch the food data to update the list
                return fetchDb(date);
            })
            .then((records) => {
                // Update state with new data, this will cause a re-render of the component
                setFoodData(records);
            })
            .catch((error) => {
                console.error(
                    "Error deleting the food log or deleting old image:",
                    error
                );
            })
            .finally(() => {
                // Close the dialog after all operations
                setDialogVisible(false);
            });
    };

    // Render function for the confirmation dialog
    const renderConfirmationDialog = () => (
        <Portal>
            <Dialog
                visible={dialogVisible}
                onDismiss={() => setDialogVisible(false)}
                style={{
                    backgroundColor: theme.colors.surfaceVariant,
                }}
            >
                <Dialog.Title>Confirm Deletion</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={{ color: theme.colors.onSurface }}>
                        Are you sure you want to delete this item?
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setDialogVisible(false)}>
                        Cancel
                    </Button>
                    <Button onPress={deleteItem}>Delete</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );

    //////////////////////////////////////////////////////////////////////////////

    const altImg = require("../../assets/no_img_avail.png");
    const [foodData, setFoodData] = useState([]);
    const [imageLoadError, setImageLoadError] = useState({});
    const [listItemHeight, setListItemHeight] = React.useState(null);
    const onListItemLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setListItemHeight(height);
    };

    const editItem = (item) => {
        navigation.navigate("EditFood", {
            date: date.toISOString(),
            foodEntry: item,
        });
    };

    const { isDbInitialized } = useContext(DbContext);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            if (!isDbInitialized) {
                return;
            }

            fetchDb(date)
                .then((records) => {
                    if (isActive) {
                        setFoodData(records);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            return () => {
                isActive = false;
            };
        }, [date, fetchDb, isDbInitialized])
    );

    const handleImageError = useCallback((index) => {
        setImageLoadError((prevError) => ({
            ...prevError,
            [index]: true,
        }));
    }, []);

    const renderEmptyData = () => (
        <Card
            style={{
                backgroundColor: theme.colors.secondaryContainer,
                padding: "2%",
                alignItems: "center",
            }}
        >
            <Title style={{ color: theme.colors.onSecondaryContainer }}>
                No food logged for this day
            </Title>
        </Card>
    );

    const renderFoodItem = useCallback(
        (item, index) => {
            const { food_name, calories, protein, carbs, fats, image_uri } = {
                ...item,
                protein: item.protein || "N/A",
                carbs: item.carbs || "N/A",
                fats: item.fats || "N/A",
            };
            const imageSource =
                imageLoadError[index] || !image_uri
                    ? altImg
                    : { uri: image_uri };

            return (
                <TouchableRipple
                    key={index.toString()}
                    onPress={() => editItem(item)}
                    onLongPress={() => confirmDeletion(item)}
                    style={styles.touchable}
                    rippleColor={`${theme.colors.onSurface}1F`} // Ripple color with low opacity
                    borderless={true}
                >
                    <List.Item
                        title={food_name}
                        description={`Calories: ${calories} kcal\nProtein: ${protein} g\nCarbs: ${carbs} g\nFats: ${fats} g`}
                        descriptionNumberOfLines={4}
                        left={() => (
                            <View onLayout={onListItemLayout}>
                                {listItemHeight && (
                                    <Image
                                        source={imageSource}
                                        onError={() => handleImageError(index)}
                                        style={{
                                            height: listItemHeight,
                                            aspectRatio: 1,
                                            borderRadius: 10,
                                        }}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        )}
                    />
                </TouchableRipple>
            );
        },
        [imageLoadError, altImg, editItem, theme.colors]
    );

    return (
        <Card style={styles.foodView}>
            <View style={styles.foodList}>
                {foodData.length > 0
                    ? foodData.map(renderFoodItem)
                    : renderEmptyData()}
            </View>

            {renderConfirmationDialog()}
        </Card>
    );
}
