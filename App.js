import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./pages/dashboard/Dashboard";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";
import {
    ActionSheetProvider,
    useActionSheet,
} from "@expo/react-native-action-sheet";

export default function App() {
    return (
        <PaperProvider theme={DarkTheme}>
            <ActionSheetProvider>
                <Dashboard />
            </ActionSheetProvider>
        </PaperProvider>
    );
}
