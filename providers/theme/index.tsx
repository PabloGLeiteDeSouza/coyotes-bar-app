import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import { IThemeProviderProps, Theme, ThemeObject } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext<ThemeObject>({
    theme: Appearance.getColorScheme() as Theme,
    setTheme: (theme: Theme) => { },
    toggleTheme: () => { },
})


export const ThemeProvider: React.FC<IThemeProviderProps> = ({children, storage_key }) => {

    const StorageKey = storage_key ? storage_key : "theme";

    const [theme, SetTheme] = useState<Theme>(Appearance.getColorScheme() as Theme);

    Appearance.addChangeListener(async (preferences) => {
        AsyncStorage.setItem(StorageKey, preferences.colorScheme as Theme);
    })

    const setTheme = (theme: Theme) => {
        Appearance.setColorScheme(theme);
        SetTheme(theme);
    }

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <ThemeContext.Provider values={{theme, toggleTheme, setTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);