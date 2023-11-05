import React, { useState, useCallback } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
    List,
    useTheme,
    Card,
    TouchableRipple,
    Title,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/core";
import { fetchDb } from "../../dbFunctions";

export default function FoodView({ date }) {
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
    const altImg = require("../../assets/no_img_avail.png");
    const [foodData, setFoodData] = useState([]);
    const [imageLoadError, setImageLoadError] = useState({});
    const [listItemHeight, setListItemHeight] = React.useState(null);
    const onListItemLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setListItemHeight(height);
    };

    const editItem = (item) => {
        console.log("Edit item:", item);
    };

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            fetchDb(date)
                .then((records) => {
                    if (isActive) {
                        console.log(records);
                        setFoodData(records);
                    }
                })
                .catch(console.error);

            return () => {
                isActive = false;
            };
        }, [date, fetchDb])
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
        </Card>
    );
}
