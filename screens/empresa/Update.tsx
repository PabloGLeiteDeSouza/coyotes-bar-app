import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Textarea,
  TextareaInput,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
} from "@gluestack-ui/themed";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormSubmitReact, RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { Box, Button, ScrollView } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { Formik } from "formik";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ButtonIcon } from "@gluestack-ui/themed";
interface IEmpresaUpdateProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "atualizar-empresas"
  >;
  route: RouteProp<RootStackParamList, "atualizar-empresas">;
}
export const Update: React.FC<IEmpresaUpdateProps> = ({
  navigation,
  route,
}) => {
    if (!route.params) {
      navigation.goBack();
      return null 
    } else if (!route.params.empresa) {
      navigation.goBack();
      return null
    }
    const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;
    const company = route.params.empresa;
    const [tipo_de_pessoa, set_tipo_de_pessoa] = useState<1 | 2 >('id_pessoa_fisica' in company ? 1  : 2);


  return (
    <ScrollView w="$full">
      <Box 
        w="$full" 
        mt="$5" 
        alignItems="center"
        gap="$5"
    >
        <Text
            size="2xl"
            textAlign="center"
        >
            Atualizar cadastro da Empresa: {company.nome}
        </Text>
        <Box
            mb="$5"
            gap="$5" 
            w="$80"
        >
          <Formik
            initialValues={{
              id: company.id,
              id_pessoa: company.id_pessoa,
              id_pessoa_fisica:
                "id_pessoa_fisica" in company ? company.id_pessoa_fisica : "",
              id_pessoa_juridica:
                "id_pessoa_juridica" in company
                  ? company.id_pessoa_juridica
                  : "",
              nome: company.nome,
              cpf: "cpf" in company ? company.cpf : "",
              data_de_nascimento:
                "data_de_nascimento" in company
                  ? new Date(company.data_de_nascimento)
                  : new Date(),
              razao_social:
                "razao_social" in company ? company.razao_social : "",
              cnpj: "cnpj" in company ? company.cnpj : "",
              ramo: company.ramo,
            }}
            onSubmit={async (payload) => {
              const payload_pessoa = {
                id: payload.id_pessoa,
                nome: payload.nome,
              };
              const res_pessoa = await fetch(`${api_url}pessoa/${payload_pessoa.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload_pessoa),
              });
              if (!res_pessoa.ok) {
                return;
              }
              const pessoa = await res_pessoa.json();
              const payload_tipo_pessoa =
                tipo_de_pessoa === 1
                  ? {
                        id: payload.id_pessoa_fisica,
                        cpf: payload.cpf,
                        data_de_nascimento: payload.data_de_nascimento,
                        id_pessoa: payload.id_pessoa,
                    }
                  : {
                        id: payload.id_pessoa_juridica,
                        razao_social: payload.razao_social,
                        cnpj: payload.cnpj,
                        id_pessoa: payload.id_pessoa,
                    };
              const payload_empresa = {
                id: payload.id,
                ramo: payload.ramo,
                id_pessoa: payload.id_pessoa,
              };
              const rota =
                tipo_de_pessoa === 1 ? "pessoa-fisica/" + payload.id_pessoa_fisica : "pessoa-juridica/" + payload.id_pessoa_juridica;
              const res_tipo_pessoa = await fetch(`${api_url + rota}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload_tipo_pessoa),
              });
              if (!res_tipo_pessoa.ok) {
                return;
              }
              const pessoa_tipo = await res_tipo_pessoa.json();
              const res_empresa = await fetch(`${api_url}empresa/${payload.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload_empresa),
              });
              if (!res_empresa.ok) {
                return;
              }
              const empresa = await res_empresa.json();
              if (!empresa || !pessoa_tipo) {
                return;
              }
              navigation.navigate("visualizar-empresas", { updated: true});
            }}
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <>
                {/* Tipo de empresa */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Tipo de Empresa</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    initialLabel={ "id_pessoa_fisica" in company ? "Pessoa Fisica" : "Pessoa Juridica" }
                    defaultValue={ "id_pessoa_fisica" in company ? "1" : "2" }
                    onValueChange={(value) =>
                      set_tipo_de_pessoa(Number(value) as 1 | 2)
                    }
                    isInvalid={false}
                    isDisabled={false}
                  >
                    <SelectTrigger size={"lg"} variant={"outline"}>
                      <SelectInput placeholder="Selecione uma pessoa" />
                      <SelectIcon mr={"$3"} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Pessoa Fisica" value="1" />
                        <SelectItem label="Pessoa Juridica" value="2" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Selecione um tipo de pessoa.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Voce precisa selecionar um tipo de pessoa.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Ramo</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      value={values.ramo}
                      placeholder="Ramo"
                      onChangeText={handleChange("ramo")}
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe o ramo de atuacao da empresa.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      O campo e obrigatorio.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {!tipo_de_pessoa ? (
                  <></>
                ) : (
                  <>
                    {/* nome fantasia */}
                    <FormControl
                      isInvalid={false}
                      size={"md"}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          {tipo_de_pessoa === 1
                            ? "Nome Completo"
                            : tipo_de_pessoa === 2
                            ? "Nome Fantasia"
                            : ""}
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.nome}
                          placeholder={
                            tipo_de_pessoa === 1
                              ? "Nome Completo"
                              : tipo_de_pessoa === 2
                              ? "Razão Social"
                              : ""
                          }
                          onChangeText={handleChange("nome")}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Infrome o nome.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </>
                )}

                {!tipo_de_pessoa ? (
                  <></>
                ) : tipo_de_pessoa === 1 ? (
                  <>
                    {/* CPF */}
                    <FormControl
                      isInvalid={false}
                      size={"md"}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Cpf</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.cpf}
                          onChangeText={handleChange("cpf")}
                          placeholder="CPF"
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Must be atleast 6 characters.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>

                    <FormControl
                      isInvalid={false}
                      size={"md"}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Data de nascimento
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          editable={false}
                          value={values.data_de_nascimento.toLocaleDateString()}
                          placeholder="01/01/1900"
                        />
                        <Button
                          onPress={() => {
                            DateTimePickerAndroid.open({
                              value: values.data_de_nascimento,
                              onChange: async (event, selectedDate) => {
                                return await setFieldValue(
                                  "data_de_nascimento",
                                  selectedDate
                                );
                              },
                            });
                          }}
                        >
                          <ButtonIcon as={CalendarDaysIcon} />
                        </Button>
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Must be atleast 6 characters.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <Button onPress={handleSubmit as FormSubmitReact}>
                      <ButtonText>Cadastrar</ButtonText>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Razao social */}
                    <FormControl
                      isInvalid={false}
                      size={"md"}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>
                          Razao Social
                        </FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          value={values.razao_social}
                          placeholder="Razao Social"
                          onChangeText={handleChange(`razao_social`)}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe a razao social.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={false}
                      size={"md"}
                      isDisabled={false}
                      isRequired={true}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>CNPJ</FormControlLabelText>
                      </FormControlLabel>
                      <Input>
                        <InputField
                          type="text"
                          keyboardType="number-pad"
                          value={values.cnpj}
                          placeholder="CNPJ"
                          onChangeText={handleChange('cnpj')}
                        />
                      </Input>

                      <FormControlHelper>
                        <FormControlHelperText>
                          Informe o cnpj da empresa.
                        </FormControlHelperText>
                      </FormControlHelper>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Cnpj Invalido.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <Button onPress={handleSubmit as FormSubmitReact}>
                      <ButtonText>Cadastrar</ButtonText>
                    </Button>
                  </>
                )}
              </>
            )}
          </Formik>
        </Box>
      </Box>
    </ScrollView>
  );
};
