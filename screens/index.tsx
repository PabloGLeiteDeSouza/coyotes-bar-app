import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Login } from "./auth/Login";
import React from "react";
import { vendas_screens } from "./vendas";
import { bebidas_screens } from "./bebidas";
import { clientes_screens } from "./clientes";
import { Registro } from "./auth/Registro";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppScreens: React.FC = () => {
    return (
        <Tab.Navigator initialRouteName="vendas-screens" >
            <Tab.Screen name="vendas-screens" component={vendas_screens} />''
            <Tab.Screen name="bebidas-screens" component={bebidas_screens} />
            <Tab.Screen name="clientes-screens" component={clientes_screens} />
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