import { Box, Button, ButtonText, SafeAreaView, ScrollView, Text } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";

interface IClienteViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "visualizar-clientes">;
    route: RouteProp<RootStackParamList, "visualizar-clientes">;
}

SplashScreen.preventAutoHideAsync();

export const View: React.FC<IClienteViewProps> = ({navigation, route}) => {
    
    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [clientes, setClientes] = useState<Array<any>>([])

    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        async function StartView() {
            try {
                const result_clientes = await fetch(`${api_url}cliente`);
                if (!result_clientes.ok) {
                    Alert.alert("Erro", "Houve um erro ao buscar os clientes tente novamente");
                    navigation.navigate("app-screens");
                    return console.error(`Erro ao realizar a requisição HTTP code:${result_clientes.status}`);
                }
                const clientes = await result_clientes.json();
                setClientes(clientes);
            } catch (error) {
                console.error(error);
                Alert.alert("Erro", "Houve um erro ao buscar os clientes tente novamente");
                navigation.navigate("app-screens");
            }
        }
        if (isLoad) {
            StartView();
            setIsLoad(false);
        } else [
            SplashScreen.hideAsync()
        ]
    }, [])

    if (isLoad) {
        return null
    }

    return (
        <SafeAreaView>
            {
                clientes.length > 0 ? (
                    <ScrollView>
                    
                    </ScrollView>
                ) :
                (
                    <Box
                        h="$full"
                        w="$full"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            gap="$10"
                        >
                            <Text
                                size="2xl"
                            >
                                Nenhum cliente encontrado
                            </Text>
                            <Button>
                                <ButtonText>
                                    Cadastrar Cliente
                                </ButtonText>
                            </Button>
                        </Box>
                    </Box>
                )
            }
            <Box>
                
            </Box>
        </SafeAreaView>
    )
}