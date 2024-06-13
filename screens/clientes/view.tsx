import { AddIcon, Box, Button, ButtonIcon, ButtonText, EditIcon, SafeAreaView, ScrollView, Text, TrashIcon } from "@gluestack-ui/themed"
import { useEffect, useState } from "react"
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClientesData, RootStackParamList } from "../../types";
import { RouteProp, useIsFocused } from "@react-navigation/native";

interface IClienteViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "visualizar-clientes">;
    route: RouteProp<RootStackParamList, "visualizar-clientes">;
}

SplashScreen.preventAutoHideAsync();

export const View: React.FC<IClienteViewProps> = ({navigation, route}) => {

    const isFocused = useIsFocused();
    
    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [clientes, setClientes] = useState<Array<ClientesData>>([])

    const [isLoad, setIsLoad] = useState<boolean>(true);

    async function StartViewClientes() {
        try {
            const result_clientes = await fetch(`${api_url}cliente/with-name`);
            if (!result_clientes.ok) {
                Alert.alert("Erro", "Houve um erro ao buscar os clientes tente novamente");
                navigation.navigate("app-screens");
                return console.error(`Erro ao realizar a requisição HTTP code:${result_clientes.status}`);
            }
            const clientes = await result_clientes.json();
            console.log(clientes);
            setClientes(clientes);
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Houve um erro ao buscar os clientes tente novamente");
            navigation.navigate("app-screens");
        }
    }

    useEffect(() => {
        StartViewClientes();
    }, [isFocused])

    useEffect(() => {
        if (isLoad) {
            StartViewClientes();
            setIsLoad(false);
        } else {
            SplashScreen.hideAsync()
        }
    }, [])

    if (isLoad) {
        return null
    }

    return (
        <SafeAreaView>
            {
                clientes.length > 0 ? (
                    <ScrollView
                        w="$full"
                    >
                        
                        <Box
                            mt="$5"
                            w="$full"
                            gap="$8"
                            alignItems="center"
                        >
                            
                            <Text
                                size="2xl"
                            >
                                Clientes cadastrados:
                            </Text>
                            <Button
                                gap="$5"
                                onPress={() => {
                                    navigation.navigate("cadastrar-clientes");
                                }}
                            >
                                <ButtonText>Cadsatrar cliente</ButtonText>
                                <ButtonIcon as={AddIcon} />
                            </Button>
                            {
                                clientes.map((e, i) => (
                                    <>
                                        <Box
                                            key={i}
                                        >
                                            <Text>{e.nome}</Text>
                                            <Text>{e.cpf}</Text>
                                        </Box>
                                    </>
                                ))
                            }
                        </Box>
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
                            <Button
                                gap="$5"
                                onPress={() => {
                                    navigation.navigate("cadastrar-clientes");
                                }}
                            >
                                <ButtonText>
                                    Cadastrar Clientes
                                </ButtonText>
                                <ButtonIcon as={AddIcon} />
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