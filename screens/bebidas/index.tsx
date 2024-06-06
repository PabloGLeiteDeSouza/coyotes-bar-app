import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./View";
import { Create } from "./Create";
import { Update } from "./Update";

const Stack = createNativeStackNavigator();

export const bebidas_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-bebidas" component={View} />
            <Stack.Screen name="cadastrar-bebidas" component={Create} />
            <Stack.Screen name="atualizar-bebidas" component={Update} />
        </Stack.Navigator>
    )
}