import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { view } from "./view";
import { create } from "./create";
import { update } from "./update";

const Stack = createNativeStackNavigator();

export const bebidas_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-bebidas" component={view} />
            <Stack.Screen name="cadastrar-bebidas" component={create} />
            <Stack.Screen name="atualizar-bebidas" component={update} />
        </Stack.Navigator>
    )
}