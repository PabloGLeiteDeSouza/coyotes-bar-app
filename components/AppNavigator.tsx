import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppScreens, AuthScreens } from '../screens'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export const AppNavigator = () => {

    const [start_screen, set_start_screen] = useState<"auth-screens" | "app-screens">("auth-screens");


    useEffect(() => {
        async function start() {
            await SplashScreen.hideAsync();
        }
        start();
    },[])

    return (
        <Stack.Navigator initialRouteName={start_screen} >
            <Stack.Screen name="auth-screens" component={AuthScreens} options={{ headerShown:false }} />
            <Stack.Screen name="app-screens" component={AppScreens} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}