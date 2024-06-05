import { createContext } from "react";
import { Appearance } from "react-native";
import { IThemeProviderProps, Theme } from "./types";

const ThemeContext = createContext({
    theme: Appearance.getColorScheme() as Theme,
    setTheme: (theme: Theme) => { },
    toggleTheme: () => { },
})


export const ThemeProvider: React.FC<IThemeProviderProps> = ({children, storage_key }) => {
    return (
        <ThemeContext.Provider>
            {children}
        </ThemeContext.Provider>
    )
}