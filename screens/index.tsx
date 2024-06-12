import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Login } from "./auth/login";
import React, { useEffect } from "react";
import { Vendas_screens } from "./vendas";
import { Produtos_screens } from "./produtos";
import { Clientes_screens } from "./clientes";
import { Registro } from "./auth/registro";
import {FontAwesome5, FontAwesome6, Entypo} from "@expo/vector-icons";
import { Empresas_screens } from "./empresa";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "../types";
import { RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface IAppScreensProps {
    navigation: NativeStackNavigationProp<
      RootStackParamList,
      "app-screens"
    >;
    route: RouteProp<RootStackParamList, "app-screens">;
}


export const AppScreens: React.FC<IAppScreensProps> = () => {

    SplashScreen.preventAutoHideAsync();

    useEffect(() => {
        SplashScreen.hideAsync();
    },[])

    return (
        <Tab.Navigator initialRouteName="vendas-screens" >
            <Tab.Screen name="vendas-screens" options={{ tabBarIcon: ({color, focused, size}) => (<Entypo name="shop" size= {size} color={color} focused={focused} />), title: "Vendas", headerShown: false }} component={Vendas_screens} />
            <Tab.Screen name="produtos-screens" options={{ tabBarIcon: ({color, focused, size}) => (<FontAwesome5 name="wine-bottle" size= {size} color={color} focused={focused} />), title: "Bebidas", headerShown: false }} component={Produtos_screens} />
            <Tab.Screen name="clientes-screens" options={{ tabBarIcon: ({color, focused, size}) => (<FontAwesome6 name="person" size= {size} color={color} focused={focused} />), title: "Clientes", headerShown: false }} component={Clientes_screens} />
            <Tab.Screen name="empresas-screens" options={{ tabBarIcon: ({color, focused, size}) => (<FontAwesome5 name="building" size= {size} color={color} focused={focused} />), title: "Empresas", headerShown: false }} component={Empresas_screens} />
        </Tab.Navigator>
    )
}

interface IAuthScreensProps {
    navigation: NativeStackNavigationProp<
      RootStackParamList,
      "auth-screens"
    >;
    route: RouteProp<RootStackParamList, "auth-screens">;
}

export const AuthScreens: React.FC<IAuthScreensProps> = ({navigation}) => {

    SplashScreen.preventAutoHideAsync();

    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

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
                if (result.ok) {
                    const user_data = await result.json();
                    if(user_data){
                        return navigation.navigate('app-screens');
                    }
                }
                await SplashScreen.hideAsync();
            } catch(error){
                console.error(error);
                await SplashScreen.hideAsync();
            }
        }
        start();
    },[])


    return (
        <Stack.Navigator initialRouteName="login" >
            <Stack.Screen name="login" options={{ title: "Login" }} component={Login}  />
            <Stack.Screen name="registro" options={{ title: "Registro" }} component={Registro} />
        </Stack.Navigator>
    )
}