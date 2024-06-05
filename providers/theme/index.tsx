import { createContext } from "react";
import { Appearance } from "react-native";
import { Theme } from "./types";

const ThemeContext = createContext({
    theme: Appearance.getColorScheme() as Theme,
    setTheme: (theme: Theme) => {},
    toggleTheme: () => {},
})