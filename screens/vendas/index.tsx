import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./View";
import { Create } from "./Create";
import { Update } from "./Update";

const Stack = createNativeStackNavigator();

export const vendas_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-vendas" component={View} />
            <Stack.Screen name="cadastrar-vendas" component={Create} />
            <Stack.Screen name="atualizar-vendas" component={Update} />
        </Stack.Navigator>
    )
}