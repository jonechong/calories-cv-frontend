// theme.js
import { DefaultTheme } from "react-native-paper";

const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#D0BCFF",
        onPrimary: "#381E72",
        primaryContainer: "#4F378B",
        onPrimaryContainer: "#EADDFF",
        secondary: "#CCC2DC",
        onSecondary: "#332D41",
        secondaryContainer: "#4A4458",
        onSecondaryContainer: "#E8DEF8",
        tertiary: "#EFB8C8",
        onTertiary: "#492532",
        tertiaryContainer: "#633B48",
        onTertiaryContainer: "#FFD8E4",
        error: "#F2B8B5",
        onError: "#601410",
        errorContainer: "#8C1D18",
        onErrorContainer: "#F9DEDC",
        background: "#1C1B1F",
        onBackground: "#E6E1E5",
        surface: "#1C1B1F",
        onSurface: "#E6E1E5",
        outline: "#938F99",
        surfaceVariant: "#49454F",
        onSurfaceVariant: "#CAC4D0",
        elevation: {
            level0: "transparent",
            level1: "rgb(247, 243, 249)",
            level2: "rgb(243, 237, 246)",
            level3: "rgb(238, 232, 244)",
            level4: "rgb(236, 230, 243)",
            level5: "rgb(233, 227, 241)",
        },
    },
    dark: "false",
};

export default DarkTheme;
