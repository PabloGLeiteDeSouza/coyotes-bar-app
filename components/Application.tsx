import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { useTheme } from "../providers/theme";
import { NavigationContainer } from "@react-navigation/native";

const Application: React.FC = () => {
    
    const {theme} = useTheme();
    
    return (
        <GluestackUIProvider colorMode={theme} config={config}>
            <NavigationContainer>
                
            </NavigationContainer>
        </GluestackUIProvider>
    )
}