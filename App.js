import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./pages/dashboard/Dashboard";
import AddFood from "./pages/AddFood";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";
import {
    ActionSheetProvider,
    useActionSheet,
} from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();

export default function App() {
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

    createDb();

    return (
        <PaperProvider theme={DarkTheme}>
            <ActionSheetProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Dashboard"
                        screenOptions={{
                            headerShown: false, // This line hides the header
                        }}
                    >
                        {/* Define your screens and options here */}
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="AddFood" component={AddFood} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ActionSheetProvider>
        </PaperProvider>
    );
}
