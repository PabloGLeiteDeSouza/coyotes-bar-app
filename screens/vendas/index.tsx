import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { view } from "./view";
import { create } from "./create";
import { update } from "./update";

const Stack = createNativeStackNavigator();

export const vendas_screens: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="visualizar-vendas" component={view} />
            <Stack.Screen name="cadastrar-vendas" component={create} />
            <Stack.Screen name="atualizar-vendas" component={update} />
        </Stack.Navigator>
    )
}