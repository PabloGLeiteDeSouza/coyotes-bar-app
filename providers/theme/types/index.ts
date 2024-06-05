export type Theme = "light" | "black"

export interface IThemeProviderProps {
    children: React.ReactNode;
    storage_key: string;
}