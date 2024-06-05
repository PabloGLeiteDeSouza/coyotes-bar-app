export type Theme = "light" | "dark"

export interface IThemeProviderProps {
    children: React.ReactNode;
    storage_key: string;
}

export type ThemeObject = {
    theme: Theme,
    setTheme: (theme: Theme) => void,
    toggleTheme: () => void,
}