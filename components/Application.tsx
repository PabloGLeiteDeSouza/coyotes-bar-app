import { config } from "@gluestack-ui/config";
import { Box, Button, ButtonIcon, ButtonText, GluestackUIProvider, MoonIcon, SunIcon, View } from "@gluestack-ui/themed";
import { useTheme } from "../providers/theme";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { AppNavigator } from "./AppNavigator";




export const Application: React.FC = () => {
    
    const {theme, toggleTheme} = useTheme();
    
    const Theme = {
        dark: theme === "dark",
        colors: {
            background: theme === "dark" ? config.tokens.colors.backgroundDark900 : config.tokens.colors.backgroundLight50,
            border: theme === "dark" ? config.tokens.colors.borderDark500 : config.tokens.colors.borderLight500,
            card: theme === "dark" ? config.tokens.colors.orange600 : config.tokens.colors.orange500,
            notification: theme === "dark" ? config.tokens.colors.orange300 : config.tokens.colors.orange200,
            primary: theme === "dark" ? config.tokens.colors.orange500 : config.tokens.colors.orange400,
            text: theme === "dark" ? config.tokens.colors.textDark500: config.tokens.colors.textLight500,
        }
    } as Theme;


    return (
        <GluestackUIProvider colorMode={theme} config={config}>
            <NavigationContainer theme={Theme} >
                <Box flex={1}>
                    <Box flex={1}>
                        <AppNavigator />
                    </Box>
                    <Button 
                        position="absolute"
                        bottom={10}
                        right={10}
                        onPress={toggleTheme}
                    >
                        <ButtonIcon as={theme === "dark" ? SunIcon : MoonIcon} />
                    </Button>
                </Box>
            </NavigationContainer>
        </GluestackUIProvider>
    )
}