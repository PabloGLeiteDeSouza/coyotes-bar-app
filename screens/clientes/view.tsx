import { Box, SafeAreaView } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen";


SplashScreen.preventAutoHideAsync();

export const View: React.FC = () => {
    
    const [products, setProducts] = useState<Array<any>>([])

    useEffect(() => {
        
    })



    return (
        <SafeAreaView>
            <Box>
                
            </Box>
        </SafeAreaView>
    )
}