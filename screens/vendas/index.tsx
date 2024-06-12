import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./View";
import { Create } from "./Create";
import { Update } from "./Update";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export const Vendas_screens: React.FC = () => {
    SplashScreen.preventAutoHideAsync();

    /* useEffect(() => {
        SplashScreen.hideAsync();
    }, [])
 */

    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-vendas" options={{ title: "Visualizar Vendas" }} component={View} />
            <Stack.Screen name="cadastrar-vendas" options={{ title: "Cadastrar Vendas",}} component={Create} />
            <Stack.Screen name="atualizar-vendas" options={{ title: "Atualizar Vendas",}} component={Update} />
        </Stack.Navigator>
    )
}