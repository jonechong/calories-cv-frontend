import React, { useState } from "react";
import { useMemo } from "react";
import { StyleSheet, View, Image } from "react-native";
import { List, useTheme, Card, TouchableRipple } from "react-native-paper";

export default function FoodView({ foodData }) {
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            foodList: { width: "100%" },
            foodView: {
                flexDirection: "column",
                padding: "4%",
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

    //Dummy datas for now
    const dummyImg = require("../assets/icon.png");
    const foodData2 = [
        {
            name: "Food Name",
            date: new Date(),
            calories: 100,
            protein: 10,
            carbs: 10,
            fats: 10,
        },
        {
            name: "Food Name2",
            date: new Date(),
            calories: 200,
            protein: 20,
            carbs: 20,
            fats: 20,
        },
    ];

    const renderFoodItem = (item, index) => {
        const { name, calories, protein, carbs, fats } = item;

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
                    title={`${name}`}
                    description={`Calories: ${calories} kcal\nProtein: ${protein}g\nCarbs: ${carbs}g\nFats: ${fats}g`}
                    descriptionNumberOfLines={4}
                    left={(props) => (
                        <View onLayout={onListItemLayout}>
                            {listItemHeight && (
                                <Image
                                    source={dummyImg}
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
            <View style={styles.foodList}>{foodData2.map(renderFoodItem)}</View>
        </Card>
    );
}
