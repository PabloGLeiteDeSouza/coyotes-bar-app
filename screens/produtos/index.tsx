import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./view";
import { Create } from "./create";
import { Update } from "./update";

const Stack = createNativeStackNavigator();

export const Produtos_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-produtos" options={{ title: "Visualizar Produtos" }} component={View} />
            <Stack.Screen name="cadastrar-produtos" options={{ title: "Cadastrar Produtos" }} component={Create} />
            <Stack.Screen name="atualizar-produtos" options={{ title: "Atualizar Produtos" }} component={Update} />
        </Stack.Navigator>
    )
}