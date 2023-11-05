import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import DashboardButtons from "../../components/dashboard/DashboardButtons";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { useTheme, Card, Button } from "react-native-paper";
import { useMemo } from "react";
import FoodView from "../../components/dashboard/FoodView";
import * as SQLite from "expo-sqlite";

export default function Dashboard() {
    const theme = useTheme();
    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1, // Ensure the container takes the full height
                position: "relative", // Set position to relative
            },
            contentContainer: {
                flex: 1, // Make the content container take the remaining height
                marginHorizontal: marginSize,
                backgroundColor: theme.colors.background,
            },
            foodView: {
                flexDirection: "column",
                paddingHorizontal: "4%",
                margin: "4%",
                backgroundColor: theme.colors.secondaryContainer,
            },
        });
    }, [theme]);

    //Add margin if screen size is large
    const { width } = useWindowDimensions();
    const breakpoint = 768;
    const marginSize = width > breakpoint ? width * 0.2 : 0; //0.2 corresponds to 20%
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const createDb = () => {
        // Open a database connection. If the database does not exist, it will be created.
        const db = SQLite.openDatabase("calories-cv.db");

        db.transaction((tx) => {
            // Execute the SQL statement to create a table
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS logged_food (
              log_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
              food_name TEXT NOT NULL,
              food_date DATE NOT NULL,
              calories INTEGER NOT NULL,
              protein INTEGER,
              fats INTEGER,
              carbs INTEGER,
              image_uri TEXT
            );`,
                [],
                () => {
                    console.log("Table created successfully");
                },
                (_, error) => {
                    console.log("Failed to create table", error);
                }
            );
        });
    };

    const clearDb = () => {
        const db = SQLite.openDatabase("calories-cv.db");

        db.transaction((tx) => {
            // This will delete all entries in the logged_food table
            tx.executeSql(
                "DELETE FROM logged_food;",
                [],
                (_, result) => {
                    console.log("All records deleted", result);
                },
                (_, error) => {
                    console.log("Failed to delete records", error);
                }
            );
        });
    };

    const deleteDb = () => {
        const db = SQLite.openDatabase("calories-cv.db");

        db.transaction((tx) => {
            // This will delete all entries in the logged_food table
            tx.executeSql(
                "DROP TABLE logged_food;",
                [],
                (_, result) => {
                    console.log("Table deleted", result);
                },
                (_, error) => {
                    console.log("Failed to delete table", error);
                }
            );
        });
    };

    const queryDb = () => {
        const fetchAllRecords = async () => {
            return new Promise((resolve, reject) => {
                const db = SQLite.openDatabase("calories-cv.db");

                db.transaction((tx) => {
                    tx.executeSql(
                        "SELECT * FROM logged_food;",
                        [],
                        (_, { rows }) => {
                            resolve(rows._array); // Assuming you want to resolve the array of records
                        },
                        (_, error) => {
                            reject(error); // In case of an error, reject the promise
                            return false; // To stop the propagation of the error
                        }
                    );
                });
            });
        };

        // Usage:
        fetchAllRecords()
            .then((records) => {
                console.log("Fetched records:", records);
            })
            .catch((error) => {
                console.error("Failed to fetch records:", error);
            });
    };

    const insertDb = () => {
        const insertDb = async (
            foodName,
            foodDate,
            calories,
            protein,
            fats,
            carbs,
            imageUri
        ) => {
            return new Promise((resolve, reject) => {
                const db = SQLite.openDatabase("calories-cv.db");

                db.transaction((tx) => {
                    tx.executeSql(
                        `INSERT INTO logged_food (food_name, food_date, calories, protein, fats, carbs, image_uri)
                  VALUES (?, ?, ?, ?, ?, ?, ?);`,
                        [
                            foodName,
                            foodDate,
                            calories,
                            protein,
                            fats,
                            carbs,
                            imageUri,
                        ],
                        (_, result) => {
                            resolve(result); // If insert is successful, resolve the promise
                        },
                        (_, error) => {
                            reject(error); // If there's an error, reject the promise
                            return false; // To stop the propagation of the error
                        }
                    );
                });
            });
        };

        const foodData = {
            foodName: "Apple",
            foodDate: "2023-11-04",
            calories: 95,
            protein: 0,
            fats: 0,
            carbs: 25,
            imageUri:
                "https://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blend.png",
        };

        insertDb(
            foodData.foodName,
            foodData.foodDate,
            foodData.calories,
            foodData.protein,
            foodData.fats,
            foodData.carbs,
            foodData.imageUri
        )
            .then((result) => {
                console.log("Record inserted successfully", result);
            })
            .catch((error) => {
                console.error("Failed to insert record:", error);
            });
    };

    return (
        <View style={styles.container}>
            <DashboardHeader
                date={selectedDate}
                onDateChange={handleDateChange}
            />
            <View style={styles.contentContainer}>
                <FoodView date={selectedDate} />
            </View>
            <DashboardButtons date={selectedDate} />
            {/* <Button mode="contained" onPress={createDb}>
                Database cr8
            </Button>
            <Button mode="contained" onPress={clearDb}>
                Database clear
            </Button>
            <Button mode="contained" onPress={deleteDb}>
                Database delete
            </Button>
            <Button mode="contained" onPress={queryDb}>
                Database query
            </Button>
            <Button mode="contained" onPress={insertDb}>
                Database insert
            </Button> */}
        </View>
    );
}
