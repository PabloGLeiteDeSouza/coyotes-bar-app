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

    const {theme} = useTheme();

    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

    const [vendas, setVendas] = useState<Array<any>>([])

    const [isLoad, setIsLoad] = useState<boolean>(true);

    useEffect(() => {
        async function StartView() {
            try {
                const result_vendas = await fetch(`${api_url}venda`);
                if (!result_vendas.ok) {
                    Alert.alert("Erro", "Houve um erro ao buscar os vendas tente novamente");
                    navigation.navigate("app-screens");
                    return console.error(`Erro ao realizar a requisição HTTP code:${result_vendas.status}`);
                }
                const vebdas = await result_vendas.json();
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
                                <ButtonIcon size="sm" ml="$3" as={FontAwesome5} name="plus-circle" >
                                </ButtonIcon>
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