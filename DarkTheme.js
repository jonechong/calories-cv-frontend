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
        surface: "#28272D",
        onSurface: "#E6E1E5",
        outline: "#938F99",
        surfaceVariant: "#49454F",
        onSurfaceVariant: "#CAC4D0",
        // elevation: {
        //     level0: "transparent",
        //     level1: "rgba(28, 27, 31, 0.05)", // slight shadow
        //     level2: "rgba(28, 27, 31, 0.1)", // soft shadow
        //     level3: "rgba(28, 27, 31, 0.15)", // moderate shadow
        //     level4: "rgba(28, 27, 31, 0.2)", // noticeable shadow
        //     level5: "rgba(28, 27, 31, 0.3)", // strong shadow
        // },
    },
    dark: "false",
};

export default DarkTheme;
