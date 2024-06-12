import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./View";
import { Create } from "./Create";
import { Update } from "./Update";

const Stack = createNativeStackNavigator();

export const Empresas_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-empresas" options={{ title: "Visualizar Empresas" }} component={View} />
            <Stack.Screen name="cadastrar-empresas" options={{ title: "Cadastrar Empresas" }} component={Create} />
            <Stack.Screen name="atualizar-empresas" options={{ title: "Atualizar Empresas" }} component={Update} />
        </Stack.Navigator>
    )
}