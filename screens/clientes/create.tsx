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
  Button,
  ButtonText,
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
  ButtonIcon,
} from "@gluestack-ui/themed";

import { Box, ScrollView } from "@gluestack-ui/themed";
import { Formik } from "formik";
import { FormSubmitReact, ResultsSearchCeps, RootStackParamList, ValidateObjectClienteRegister } from "../../types";
import { cpf_format } from "../../utils/cpf_format";
import { CalendarDaysIcon } from "@gluestack-ui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { verificarInvalidos } from "../../utils/verificar_invalidos";
import { Alert } from "react-native";
import { api_url } from "../../constants/api_url";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { cep_format } from "../../utils/cep_format";




interface ICreateClientesProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "cadastrar-clientes">;
    route: RouteProp<RootStackParamList, "cadastrar-clientes">;
}



export const Create: React.FC<ICreateClientesProps> = ({navigation}) => {
  const [validates, setValidates] = useState<ValidateObjectClienteRegister>({
    nome_completo: {
      isInvalid: false,
      isDisabled: false,
    },
    data_de_nascimento: {
      isInvalid: false,
      isDisabled: false,
    },
    cpf: {
      isInvalid: false,
      isDisabled: false,
    },
    cep: {
      isInvalid: false,
      isDisabled: false,
    },
    logradouro: {
      isInvalid: false,
      isDisabled: false,
    },
    numero: {
      isInvalid: false,
      isDisabled: false,
    },
    complemento: {
      isInvalid: false,
      isDisabled: false,
    },
    bairro: {
      isInvalid: false,
      isDisabled: false,
    },
    cidade: {
      isInvalid: false,
      isDisabled: false,
    },
    UF: {
      isInvalid: false,
      isDisabled: false,
    },
    limite: {
      isInvalid: false,
      isDisabled: false,
    },
  });

  return (
    <ScrollView w="$full">
      <Box
        my="$5"
        w="$full" 
        alignItems="center"
        gap="$5"
        >
        <Text size="2xl">Informe os dados do cliente abaixo:</Text>
        <Formik
          initialValues={{
            nome_completo: "",
            data_de_nascimento: new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate()),
            cpf: "",
            cep: "",
            logradouro: "",
            numero: Number(""),
            complemento: "",
            bairro: "",
            cidade: "",
            UF: "",
            limite: Number("100.00"),
          }}
            onSubmit={async (payload) => {
                try{
                    const {nome_completo, cpf, data_de_nascimento, logradouro, numero, complemento, cidade, cep, bairro, limite, UF } = payload;
                    
                    if(!verificarInvalidos(validates)){
                        return Alert.alert("Erro", "Um ou mais dos campos ainda é ou são inválido(s)");
                    }
                    const data_pessoa = await fetch(`${api_url}pessoa`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nome: nome_completo })
                    })
                    console.log('Complemento: ', complemento);
                    if (!data_pessoa.ok) {
                        return Alert.alert("Erro", "Não foi possivel criar o cliente");
                    }
                    const pessoa = await data_pessoa.json();
              
                    const data_endereco = await fetch(`${api_url}endereco`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            rua: logradouro,
                            numero,
                            complemento,
                            bairro, 
                            cidade, 
                            UF,
                            cep, 
                        })
                    })

                    if (!data_endereco.ok) {
                        return Alert.alert("Erro", "Não foi possivel criar o cliente");
                    }

                    const endereco = await data_endereco.json();

                    const data_pessoa_fisica = await fetch(`${api_url}pessoa-fisica`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                          cpf,
                          data_de_nascimento,
                          id_pessoa: pessoa.id,
                          id_endereco: endereco.id,
                        }),
                    });
        
                      
                    if (!data_pessoa_fisica.ok) {
                        return Alert.alert("Erro", "Não foi possivel criar o cliente");
                    }

                    const data_cliente = await fetch(`${api_url}cliente`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                          limite,
                          id_pessoa: pessoa.id 
                        }),
                    });

                    if (!data_cliente.ok) {
                        return Alert.alert("Erro", "Não foi possivel criar o cliente");
                    }

                    const cliente = await data_cliente.json();

                    if(cliente){
                        Alert.alert("Sucesso", "Cliente criado com sucesso!");
                        return navigation.navigate("visualizar-clientes");
                    }
                }catch(error){
                    console.error(error);
                    return Alert.alert("Erro", "Não foi possivel criar o cliente");
                }

            }}
        >
          {({
            setFieldValue,
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Box w="$72" gap="$8">
              {/* Nome Completo */}
              <FormControl
                isInvalid={validates.nome_completo.isInvalid}
                isDisabled={false}
                isRequired={validates.nome_completo.isDisabled}
                size={"md"}
              >
                <FormControlLabel>
                  <FormControlLabelText>Nome Completo</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    placeholder="Nome completo"
                    onChangeText={handleChange("nome_completo")}
                    onBlur={() => {
                      if (!values.nome_completo) {
                        return setValidates({
                          ...validates,
                          nome_completo: {
                            isInvalid: true,
                            isDisabled: false,
                          },
                        });
                      }
                      return setValidates({
                        ...validates,
                        nome_completo: {
                          isInvalid: false,
                          isDisabled: false,
                        },
                      });
                    }}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o nome do seu funcionário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo nome completo não pode ser vazio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Data de Nascimento */}
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
                    editable={false}
                    type="text"
                    value={values.data_de_nascimento.toLocaleDateString()}
                    placeholder="01/01/1900"
                  />
                  <Button
                    onPress={() => {
                      DateTimePickerAndroid.open({
                        value: values.data_de_nascimento,
                        minimumDate: new Date(1800, 1, 1),
                        maximumDate: new Date(
                          new Date().getFullYear() - 15,
                          new Date().getMonth(),
                          new Date().getDate()
                        ),
                        onChange: (event, date) => {
                          setFieldValue("data_de_nascimento", date);
                        },
                      });
                    }}
                  >
                    <ButtonIcon as={CalendarDaysIcon} />
                  </Button>
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe a data de nascimento do seu funcionário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O usuário deve ter no mínimo 16 anos.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* CPF */}
              <FormControl
                isInvalid={validates.cpf.isInvalid}
                size={"md"}
                isDisabled={validates.cpf.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>CPF</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    keyboardType="number-pad"
                    type="text"
                    value={values.cpf}
                    placeholder="123.23.123-12"
                    onChangeText={(text) => {
                      return setFieldValue("cpf", text);
                    }}
                    onBlur={() => {
                      const cpf = cpf_format(values.cpf);
                      if (!cpf) {
                        return setValidates({
                          ...validates,
                          cpf: {
                            isDisabled: false,
                            isInvalid: true,
                          },
                        });
                      }
                      setValidates({
                        ...validates,
                        cpf: {
                          isDisabled: false,
                          isInvalid: false,
                        },
                      });
                      return setFieldValue("cpf", cpf);
                    }}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o cpf do seu funcionário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Cpf inválido ou vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* CEP */}
              <FormControl
                isInvalid={validates.cep.isInvalid}
                size={"md"}
                isDisabled={validates.cep.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>CEP</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.cep}
                    keyboardType="number-pad"
                    placeholder="12.123-123"
                    onChangeText={handleChange("cep")}
                    onBlur={async () => {
                      setValidates({
                        ...validates,
                        logradouro: {
                          isDisabled: true,
                          isInvalid: false,
                        },
                        complemento: {
                          isDisabled: true,
                          isInvalid: false,
                        },
                        bairro: {
                          isDisabled: true,
                          isInvalid: false,
                        },
                        cidade: {
                          isDisabled: true,
                          isInvalid: false,
                        },
                        UF: {
                          isDisabled: true,
                          isInvalid: false,
                        },
                      });
                      const cep_validate = cep_format(values.cep);
                      if (!cep_validate) {
                        return setValidates({
                          ...validates,
                          cep: {
                            isDisabled: false,
                            isInvalid: true,
                          },
                        });
                      }
                      const result = await fetch(
                        `https://viacep.com.br/ws/${cep_validate
                          .replace("-", "")
                          .replace(".", "")}/json`
                      );
                      if (!result.ok) {
                        return setValidates({
                          ...validates,
                          cep: {
                            isDisabled: false,
                            isInvalid: true,
                          },
                        });
                      }
                      const data: ResultsSearchCeps = await result.json();
                      if ("erro" in data) {
                        if (data.erro) {
                          setValidates({
                            ...validates,
                            cep: {
                              isDisabled: false,
                              isInvalid: true,
                            },
                          });
                        }
                      } else {
                        if (validates.cep.isInvalid) {
                          setValidates({
                            ...validates,
                            cep: {
                              isDisabled: false,
                              isInvalid: false,
                            },
                          });
                        }
                        await setFieldValue("cep", cep_validate);
                        await setFieldValue("logradouro", data.logradouro);
                        await setFieldValue("complemento", data.complemento);
                        await setFieldValue("bairro", data.bairro);
                        await setFieldValue("cidade", data.localidade);
                        await setFieldValue("UF", data.uf);
                        setValidates({
                          ...validates,
                          cep: {
                            isDisabled: false,
                            isInvalid: false,
                          },
                          logradouro: {
                            isDisabled: true,
                            isInvalid: false,
                          },
                          complemento: {
                            isDisabled: false,
                            isInvalid: false,
                          },
                          bairro: {
                            isDisabled: true,
                            isInvalid: false,
                          },
                          cidade: {
                            isDisabled: true,
                            isInvalid: false,
                          },
                          UF: {
                            isDisabled: true,
                            isInvalid: false,
                          },
                        });
                      }
                    }}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o cep onde seu funcionário mora.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Você precisa informar um cep válido.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Logradouro */}
              <FormControl
                isInvalid={validates.logradouro.isInvalid}
                size={"md"}
                isDisabled={validates.logradouro.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Logradouro</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    editable={!validates.logradouro.isDisabled}
                    type="text"
                    placeholder="Avenida Joaquim Pompeu de Toledo"
                    value={values.logradouro}
                    onChangeText={handleChange("logradouro")}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o logradouro da residência do seu funcionário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo não pode estar vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Número */}
              <FormControl
                isInvalid={validates.numero.isInvalid}
                size={"md"}
                isDisabled={validates.numero.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Número</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    editable={!validates.numero.isDisabled}
                    type="text"
                    keyboardType="number-pad"
                    placeholder="1234"
                    onChangeText={(text) => setFieldValue('numero', Number(text))}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o número da residência do funcionário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo número não pode ser vazio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Complemento */}
              <FormControl
                isInvalid={validates.complemento.isInvalid}
                size={"md"}
                isDisabled={validates.complemento.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Complemento</FormControlLabelText>
                </FormControlLabel>
                <Textarea>
                  <TextareaInput
                    type="text"
                    value={values.complemento}
                    placeholder="Até 501"
                    onChangeText={handleChange("complemento")}
                  />
                </Textarea>

                <FormControlHelper>
                  <FormControlHelperText>
                    Insira o complemento do endereço.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo complemento não pode ser vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Bairro */}
              <FormControl
                isInvalid={validates.bairro.isInvalid}
                size={"md"}
                isDisabled={validates.bairro.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Bairro</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    editable={!validates.bairro.isDisabled}
                    type="text"
                    value={values.bairro}
                    placeholder="Jardim das Flores"
                    onChangeText={handleChange("bairro")}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o seu bairro.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo bairro não pode ser vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Cidade */}
              <FormControl
                isInvalid={validates.cidade.isInvalid}
                size={"md"}
                isDisabled={validates.cidade.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Cidade</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    editable={!validates.cidade.isDisabled}
                    type="text"
                    value={values.cidade}
                    placeholder="Araçatuba"
                    onChangeText={handleChange("cidade")}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe a cidade do seu funcioário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo cidade não pode ser vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* UF */}
              <FormControl
                isInvalid={validates.UF.isInvalid}
                size={"md"}
                isDisabled={validates.UF.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>UF</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    editable={!validates.UF.isDisabled}
                    value={values.UF}
                    placeholder="SP"
                    onChangeText={handleChange("UF")}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe sua unidade federativa{" "}
                    {"(Sigla do seu estado ex: BA bahia SP são paulo e etc.)"}.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo uf não pode ser vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl
                isInvalid={validates.limite.isInvalid}
                size={"md"}
                isDisabled={validates.limite.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Limite</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    keyboardType="number-pad"
                    value={values.limite.toString()}
                    placeholder="100.00"
                    onChangeText={(text) => setFieldValue('limite', parseFloat(text))}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe o limite de dívida do cliente.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo limite não pode ser vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
                <Button onPress={handleSubmit as FormSubmitReact}>
                    <ButtonText>Cadastrar</ButtonText>
                </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </ScrollView>
  );
};
