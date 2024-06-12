import { AddIcon, Box, ButtonText, SafeAreaView, ScrollView } from "@gluestack-ui/themed"
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Button } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../../providers/theme";

interface IVendasViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "visualizar-vendas">;
    route: RouteProp<RootStackParamList, "visualizar-vendas">;
}

export const View: React.FC<IVendasViewProps> = ({navigation}) => {

    SplashScreen.preventAutoHideAsync();


    const {theme} = useTheme();

    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [validations, setValidations] = useState({ clientes: false, produtos: false })

    const [vendas, setVendas] = useState<Array<any>>([])

    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        async function StartView() {
            try {
                const res_vendas = await fetch(`${api_url}venda`);
                const res_clientes = await fetch(`${api_url}cliente`);
                const res_produtos = await fetch(`${api_url}produto`);
                const clientes: Array<any> = await res_clientes.json();
                const produtos: Array<any> = await res_produtos.json();
                if(clientes.length < 1){
                    setValidations({ ...validations, clientes: true });
                }
                if(produtos.length < 1){
                    setValidations({ ...validations, produtos: true });
                }
                if (!res_vendas.ok) {
                    Alert.alert("Erro", "Houve um erro ao buscar os vendas tente novamente");
                    navigation.navigate("app-screens");
                    return console.error(`Erro ao realizar a requisição HTTP code:${res_vendas.status}`);
                }
                const vendas = await res_vendas.json();
                setVendas(vendas);
            } catch (error) {
                console.error(error);
                Alert.alert("Erro", "Houve um erro ao buscar as vendas tente novamente");
                navigation.navigate("app-screens");
            }
        }
        if (isLoad) {
            StartView();
            setIsLoad(false);
        }
    }, [])

    if (isLoad) {
        return null
    }

    return (
        <SafeAreaView>
            {
                vendas.length > 0 ? (
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
                        {
                            validations.clientes ? (
                                <>
                                    <Box
                                        gap="$10"
                                    >
                                        <Text
                                            size="2xl"
                                        >
                                            Nenhum cliente encontrado
                                        </Text>
                                        <Button
                                            onPress={() => {
                                                navigation.navigate("clientes-screens");
                                            }}
                                        >
                                            <ButtonText>
                                                Cadastrar Venda
                                            </ButtonText>
                                            <ButtonIcon size="sm" ml="$3" as={AddIcon} >
                                            </ButtonIcon>
                                        </Button>
                                    </Box>
                                </>
                            ) : validations.produtos ? (
                                <>
                                    <Box
                                        gap="$10"
                                    >
                                        <Text
                                            size="2xl"
                                        >
                                            Nenhum produto encontrado
                                        </Text>
                                        <Button
                                            onPress={() => {
                                                navigation.navigate("produtos-screens");
                                            }}
                                        >
                                            <ButtonText>
                                                Cadastrar Produto
                                            </ButtonText>
                                            <ButtonIcon size="sm" ml="$3" as={AddIcon}>
                                            </ButtonIcon>
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box
                                        gap="$10"
                                    >
                                        <Text
                                            size="2xl"
                                        >
                                            Nenhuma venda encontrada
                                        </Text>
                                        <Button
                                            onPress={() => {
                                                navigation.navigate("cadastrar-vendas");
                                            }}
                                        >
                                            <ButtonText>
                                                Cadastrar Venda
                                            </ButtonText>
                                            <ButtonIcon size="sm" ml="$3" as={AddIcon} >
                                            </ButtonIcon>
                                        </Button>
                                    </Box>
                                </>
                            )
                        }
                        
                    </Box>
                )
            }
            <Box>
                
            </Box>
        </SafeAreaView>
    )
}