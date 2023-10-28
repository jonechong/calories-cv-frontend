// theme.js
import { DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "green",
        onPrimary: "pink",
        secondary: "blue",
        onSecondary: "cyan",
        tertiary: "black",
        onTertiary: "orange",
        background: "black",
        onBackground: "grey",
        surface: "gray",
        onSurface: "black",
        elevation: {
            level0: "transparent",
            level1: "rgb(247, 243, 249)",
            level2: "rgb(243, 237, 246)",
            level3: "rgb(238, 232, 244)",
            level4: "rgb(236, 230, 243)",
            level5: "rgb(233, 227, 241)",
        },
    },
    dark: "true",
    mode: "exact",
};

export default theme;
