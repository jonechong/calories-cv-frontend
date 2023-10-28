import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./pages/dashboard/Dashboard";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";

export default function App() {
    return (
        <PaperProvider theme={DarkTheme}>
            <Dashboard />
        </PaperProvider>
    );
}
