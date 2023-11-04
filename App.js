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

const Stack = createNativeStackNavigator();

export default function App() {
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
