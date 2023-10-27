import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./pages/dashboard/Dashboard";
import { DarkTheme, PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import theme from "./theme"; // Import the theme configuration

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <Dashboard />
        </PaperProvider>
    );
}
