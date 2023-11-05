import Dashboard from "./pages/dashboard/Dashboard";
import AddFood from "./pages/food/AddFood";
import { PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";
import {
    ActionSheetProvider,
    useActionSheet,
} from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDb } from "./dbFunctions";
import DbContext from "./context/DbContext";

const Stack = createNativeStackNavigator();

export default function App() {
    const [isDbInitialized, setDbInitialized] = useState(false);

    useEffect(() => {
        createDb().then(() => {
            setDbInitialized(true);
        });
    }, []);

    return (
        <DbContext.Provider value={{ isDbInitialized, setDbInitialized }}>
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
                            <Stack.Screen
                                name="Dashboard"
                                component={Dashboard}
                            />
                            <Stack.Screen name="AddFood" component={AddFood} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ActionSheetProvider>
            </PaperProvider>
        </DbContext.Provider>
    );
}
