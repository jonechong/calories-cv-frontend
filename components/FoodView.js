import React, { useState } from "react";
import { useMemo } from "react";
import { StyleSheet, View, Image } from "react-native";
import { List, useTheme, Card, TouchableRipple } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

export default function FoodView({ date }) {
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            foodList: { width: "100%" },
            foodView: {
                // flexDirection: "column",
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
        });
    }, [theme]);
    const [listItemHeight, setListItemHeight] = React.useState(null);
    const onListItemLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setListItemHeight(height);
    };

    const editItem = (item) => {
        console.log("Edit item:", item);
    };

    const fetchDb = async (date) => {
        return new Promise((resolve, reject) => {
            const db = SQLite.openDatabase("calories-cv.db");
            const dateString = date.toISOString().split("T")[0];
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM logged_food WHERE food_date = date(?);",
                    [dateString],
                    (_, { rows }) => {
                        resolve(rows._array);
                    },
                    (_, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    };

    const [foodData, setFoodData] = useState([]);
    const [altImg, setAltImg] = useState();
    const [imageLoadError, setImageLoadError] = useState(false);

    useEffect(() => {
        setAltImg(require("../assets/no_img_avail.png"));
        fetchDb(date)
            .then((records) => {
                setFoodData(records);
                console.log("Fetched records:", records);
            })
            .catch((error) => {
                console.error("Failed to fetch records:", error);
            });
    }, []);

    const renderFoodItem = (item, index) => {
        const { food_name, calories, protein, carbs, fats, image_uri } = {
            ...item,
            protein: item.protein || "N/A",
            carbs: item.carbs || "N/A",
            fats: item.fats || "N/A",
        };

        const handleImageError = (index) => {
            setImageLoadError((prevError) => ({
                ...prevError,
                [index]: true,
            }));
        };

        const imageSource =
            imageLoadError[index] || !item.image_uri
                ? altImg
                : { uri: item.image_uri };

        return (
            <TouchableRipple
                key={index}
                onPress={() => editItem(item)}
                style={styles.touchable}
                rippleColor={theme.colors.onSurface + "1F"} // Ripple color with low opacity
                borderless={true}
            >
                <List.Item
                    key={index}
                    title={`${food_name}`}
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
    };

    return (
        <Card style={styles.foodView}>
            <View style={styles.foodList}>{foodData.map(renderFoodItem)}</View>
        </Card>
    );
}
