// theme.js
import { DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "green",
        onPrimary: "white",
        secondary: "blue",
        onSecondary: "cyan",
        tertiary: "red",
        onTertiary: "orange",
        background: "black",
        onBackground: "grey",
        surface: "#808080",
        onSurface: "purple",
    },
};

export default theme;
