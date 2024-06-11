import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Login } from "./auth/login";
import React from "react";
import { Vendas_screens } from "./vendas";
import { Produtos_screens } from "./produtos";
import { Clientes_screens } from "./clientes";
import { Registro } from "./auth/registro";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppScreens: React.FC = () => {
    return (
        <Tab.Navigator initialRouteName="vendas-screens" >
            <Tab.Screen name="vendas-screens" options={{ title: "Vendas", headerShown: false }} component={Vendas_screens} />
            <Tab.Screen name="bebidas-screens" options={{ title: "Bebidas", headerShown: false }} component={Produtos_screens} />
            <Tab.Screen name="clientes-screens" options={{ title: "Clientes", headerShown: false }} component={Clientes_screens} />
        </Tab.Navigator>
    )
}

export const AuthScreens: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="login" >
            <Stack.Screen name="login" options={{ title: "Login" }} component={Login}  />
            <Stack.Screen name="registro" options={{ title: "Registro" }} component={Registro} />
        </Stack.Navigator>
    )
}