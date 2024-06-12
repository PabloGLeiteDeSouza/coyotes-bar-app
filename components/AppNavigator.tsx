import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppScreens, AuthScreens } from '../screens'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();


export const AppNavigator = () => {

    SplashScreen.preventAutoHideAsync();
    
    return (
        <Stack.Navigator initialRouteName={"auth-screens"} >
            <Stack.Screen name="auth-screens" component={AuthScreens} options={{ headerShown: false }} />
            <Stack.Screen name="app-screens" component={AppScreens} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
