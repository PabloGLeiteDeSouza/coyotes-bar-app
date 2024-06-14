import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./view";
import { Create } from "./create";
import { Update } from "./update";

const Stack = createNativeStackNavigator();

export const Clientes_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-clientes" options={{ title: "Visualizar Clientes" }} component={View} />
            <Stack.Screen name="cadastrar-clientes" options={{ title: "Cadastrar Clientes" }} component={Create} />
            <Stack.Screen name="atualizar-clientes" options={{ title: "Atualizar Clientes" }} component={Update} />
        </Stack.Navigator>
    )
}