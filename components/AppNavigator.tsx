import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppScreens, AuthScreens } from '../screens'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export const AppNavigator = () => {

    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [start_screen, set_start_screen] = useState<"auth-screens" | "app-screens">("auth-screens");
    const [is_loading, set_is_loading] = useState<boolean>(true);


    useEffect(() => {
        async function start() {
            try {
                const jwt = await AsyncStorage.getItem('token');
                const result = await fetch(`${api_url}profile`, {
                    headers: {
                    'Authorization': `Bearer ${jwt}`
                    },
                    method: 'GET'
                })
                if (!result.ok) {
                    return set_start_screen("auth-screens");
                }
                const user_data = await result.json();
                if (!user_data) {
                    set_start_screen("auth-screens");
                }
                return set_start_screen("app-screens");
            } catch(error){
                console.error(error);
                return set_start_screen("auth-screens");
            }
            
        }
        if(is_loading){
            start();
            set_is_loading(false);
        } else {
            SplashScreen.hideAsync()
        }
    },[is_loading])

    if(is_loading){
        return null
    }
    return (
        <Stack.Navigator>
            {   start_screen === "auth-screens" ? (<Stack.Screen name="auth-screens" component={AuthScreens} options={{ headerShown:false }} />) :
                (<Stack.Screen name="app-screens" component={AppScreens} options={{ headerShown: false }} />)
            }
        </Stack.Navigator>
    )
}