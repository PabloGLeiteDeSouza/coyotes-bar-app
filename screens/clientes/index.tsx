import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { view } from "./view";
import { create } from "./create";
import { update } from "./update";

const Stack = createNativeStackNavigator();

export const clientes_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-clientes" component={view} />
            <Stack.Screen name="cadastrar-clientes" component={create} />
            <Stack.Screen name="atualizar-clientes" component={update} />
        </Stack.Navigator>
    )
}