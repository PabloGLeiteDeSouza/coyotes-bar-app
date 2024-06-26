import {
  AddIcon,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  EditIcon,
  ScrollView,
  Text,
  TrashIcon,
  VStack,
} from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  RootStackParamList,
  TEmpresaApi,
  TEmpresasDeletePayload,
} from "../../types";
import { RouteProp, useIsFocused } from "@react-navigation/native";

interface IEmpresaViewProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "visualizar-empresas"
  >;
  route: RouteProp<RootStackParamList, "visualizar-empresas">;
}

export const View: React.FC<IEmpresaViewProps> = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  async function start() {
    try {
      const res_empresas = await fetch(`${api_url}empresa/with-name`);

      if (!res_empresas.ok) {
        Alert.alert("erro", "Erro ao buscar empreasas");
        return;
      }
      const empresas = await res_empresas.json();
      console.log(empresas);
      return setCompanys(empresas);
    } catch (error) {}
  }

  const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

  const [companys, setCompanys] = useState<Array<TEmpresaApi>>([]);

  useEffect(() => {
    start();
  }, [isFocused]);

  async function deleteCompany(payload: TEmpresasDeletePayload) {
    try {
      const {
        id,
        id_pessoa,
        id_endereco,
        id_pessoa_fisica,
        id_pessoa_juridica,
      } = payload;

      const response = await fetch(`${api_url}empresa/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        Alert.alert("Erro", "Erro ao excluir a empresa");
        return;
      }

      if (id_pessoa_fisica) {
        const response = await fetch(
          `${api_url}pessoa-fisica/${id_pessoa_fisica}`,
          {
            method: "DELETE",
          }
        );
      } else {
        const response = await fetch(
          `${api_url}pessoa-juridica/${id_pessoa_juridica}`,
          {
            method: "DELETE",
          }
        );
      }

      // Atualiza a lista de empresas após a exclusão
      Alert.alert("Sucesso", "Empresa deletada com sucesso!");
      start();
    } catch (error) {
      Alert.alert("Erro", "Erro ao excluir a empresa");
    }
  }

  return (
    <SafeAreaView>
      {companys.length < 1 ? (
        <Box w="$full" h="$full" justifyContent="center" alignItems="center">
          <Box gap="$5">
            <Text size="2xl">Nenhuma empresa encontrada</Text>
            <Button onPress={() => navigation.navigate("cadastrar-empresas")}>
              <ButtonText>Cadastrar empresa</ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box w="$full" alignItems="center">
            <Text size="2xl">Empresas Cadastradas:</Text>
            <Box mt="$5">
              <Button onPress={() => navigation.navigate("cadastrar-empresas")}>
                <ButtonText>Cadastrar mais Empresas</ButtonText>
                <ButtonIcon as={AddIcon} />
              </Button>
            </Box>
            <ScrollView mt="$5">
              {companys.map((empresa, index) => (
                <Box
                  my="$5"
                  borderRadius="$md"
                  py="$3"
                  px="$3"
                  flex={2}
                  $light-bgColor="$blueGray300"
                  $dark-bgColor="$blueGray600"
                  key={empresa.id}
                  flexDirection="row"
                  gap="$5"
                >
                  <Box w="$56" gap="$1">
                    <Text size="lg">
                      {"id_pessoa_fisica" in empresa ? (
                        <Text fontWeight="$bold">NOME COMPLETO:</Text>
                      ) : (
                        <Text fontWeight="$bold">NOME FANTASIA:</Text>
                      )}{" "}
                      {empresa.nome}
                    </Text>
                    <Text size="sm">
                      Tipo:{" "}
                      {"id_pessoa_fisica" in empresa
                        ? "Pessoa Fisica"
                        : "Pessoa Juridica"}
                    </Text>
                    {"data_de_nascimento" in empresa ? (
                      <Text>
                        Data de nascimento:{" "}
                        {new Date(
                          empresa.data_de_nascimento
                        ).toLocaleDateString()}
                      </Text>
                    ) : (
                      ""
                    )}
                    <Text>
                      {"cnpj" in empresa
                        ? "CNPJ: " + empresa.cnpj
                        : "CPF: " + empresa.cpf}
                    </Text>
                    <Text>RAMO: {empresa.ramo}</Text>
                  </Box>
                  <Box gap="$2">
                    <Button
                      onPress={() => {
                        navigation.navigate("atualizar-empresas", { empresa });
                      }}
                    >
                      <ButtonIcon as={EditIcon} />
                    </Button>
                    <Button
                      onPress={() => {
                        Alert.alert(
                          "Excluir Empresa",
                          `Você tem certeza que deseja excluir a empresa ${empresa.nome}?`,
                          [
                            {
                              text: "Cancelar",
                              onPress: () =>
                                Alert.alert(
                                  "Operacao Cancelada",
                                  "Exclusao cancelada!"
                                ),
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteCompany({
                                    id: empresa.id,
                                    id_pessoa: empresa.id_pessoa,
                                    id_pessoa_fisica: "id_pessoa_fisica" in empresa
                                        ? empresa.id_pessoa_fisica
                                        : false,
                                    id_pessoa_juridica: "id_pessoa_juridica" in empresa
                                        ? empresa.id_pessoa_juridica
                                        : false,
                                    id_endereco: empresa.id_endereco,
                                }),
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                      action="negative"
                    >
                      <ButtonIcon as={TrashIcon} />
                    </Button>
                  </Box>
                </Box>
              ))}
            </ScrollView>
          </Box>
        </>
      )}
    </SafeAreaView>
  );
};
