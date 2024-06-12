import { AddIcon, Box, Button, ButtonIcon, ButtonText, SafeAreaView, Text } from "@gluestack-ui/themed"
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";


interface IProdutosViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "visualizar-produtos">;
    route: RouteProp<RootStackParamList, "visualizar-produtos">;
}

export const View: React.FC<IProdutosViewProps> = ({navigation}) => {

    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [products, setProducts] = useState<Array<any>>([]);

    useEffect(() => {
        async function Start() {
            try {
                const res_produtos = await fetch(`${api_url}produto`);
                if (!res_produtos.ok) {
                    Alert.alert("Erro", "Erro ao carregar os produtos tente novamente!")
                    return;
                }
                const produtos = await res_produtos.json();
                setProducts(produtos);
            } catch (error) {
                console.error(error);
                Alert.alert("Erro", "Erro ao carregar os produtos tente novamente!")
            }
        }
        Start()
    }, [])




    return (
        <SafeAreaView>
            {
                products.length > 0 ? (
                    <>
                    </>
                ) : (
                    <Box
                        w="$full"
                        h="$full"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            gap="$10"
                        >
                            <Text
                                size="2xl"
                            >
                                Nenhum produto encontrado!
                            </Text>
                            <Button
                                onPress={() => navigation.navigate("cadastrar-produtos")}
                            >
                                <ButtonText>
                                    Cadsatrar Produto
                                </ButtonText>
                                <ButtonIcon ml="$5" as={AddIcon} />
                            </Button>
                        </Box>
                    </Box>
                )
            }
        </SafeAreaView>
    )
}