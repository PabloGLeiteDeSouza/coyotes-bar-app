import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppScreens, AuthScreens } from '../screens'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export const AppNavigator = () => {

    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [is_auth, set_is_auth] = useState<boolean>(false);
    const [is_verified, set_is_verified] = useState<boolean>(false);

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
                    set_is_auth(false);
                } else {
                    const user_data = await result.json();
                    if (!user_data) {
                        set_is_auth(false);
                    } else {
                        set_is_auth(true);
                    }
                }
            } catch(error){
                console.error(error);
                set_is_auth(false);
            } finally {
                set_is_verified(true);
            }
        }
        start();
    },[])

    useEffect(() => {
        if(is_verified && is_auth){
            SplashScreen.hideAsync();
        }
    },[is_auth, is_verified])

    if(!is_verified){
        return null
    }

    return (
        <Stack.Navigator initialRouteName={"app-screens"} >
            <Stack.Screen name="auth-screens" component={AuthScreens} options={{ headerShown: false }} />
            <Stack.Screen name="app-screens" component={AppScreens} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
