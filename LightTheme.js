// theme.js
import { DefaultTheme } from "react-native-paper";

const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#6750A4",
        onPrimary: "#FFFFFF",
        primaryContainer: "#EADDFF",
        onPrimaryContainer: "#21005D",
        secondary: "#625B71",
        onSecondary: "#FFFFFF",
        secondaryContainer: "#E8DEF8",
        onSecondaryContainer: "#1D192B",
        tertiary: "#7D5260",
        onTertiary: "#FFFFFF",
        tertiaryContainer: "#FFD8E4",
        onTertiaryContainer: "#31111D",
        error: "#B3261E",
        onError: "#FFFFFF",
        errorContainer: "#F9DEDC",
        onErrorContainer: "#410E0B",
        background: "#FFFBFE",
        onBackground: "#1C1B1F",
        surface: "#FFFBFE",
        onSurface: "#1C1B1F",
        outline: "#79747E",
        surfaceVariant: "#E7E0EC",
        onSurfaceVariant: "#49454F",
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

export default LightTheme;
