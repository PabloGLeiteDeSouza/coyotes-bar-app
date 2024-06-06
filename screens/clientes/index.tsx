import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./View";
import { Create } from "./Create";
import { Update } from "./Update";

const Stack = createNativeStackNavigator();

export const clientes_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-clientes" component={View} />
            <Stack.Screen name="cadastrar-clientes" component={Create} />
            <Stack.Screen name="atualizar-clientes" component={Update} />
        </Stack.Navigator>
    )
}