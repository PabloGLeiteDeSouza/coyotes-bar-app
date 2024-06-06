import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "./View";
import { Create } from "./Create";
import { Update } from "./Update";

const Stack = createNativeStackNavigator();

export const produtos_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-produtos" component={View} />
            <Stack.Screen name="cadastrar-produtos" component={Create} />
            <Stack.Screen name="atualizar-produtos" component={Update} />
        </Stack.Navigator>
    )
}