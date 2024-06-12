import React, { useEffect, useRef, useState } from "react";
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
  CalendarDaysIcon,
  ScrollView,
  EyeIcon,
  EyeOffIcon,
} from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Formik } from "formik";
import { Alert, GestureResponderEvent } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ResultsSearchCeps, RootStackParamList, validateObjectsRegisterForm } from "../../types";
import * as SplashScreen from "expo-splash-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { api_url } from "../../constants/api_url";

type Dados = {
  [key: string]: {
    isInvalid: boolean,
    isDisabled: boolean,
  }
}

interface IRegistroProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "registro">;
  route: RouteProp<RootStackParamList, "registro">;
}

type FormSubmitReact = (event?: GestureResponderEvent) => void | undefined;

export const Registro: React.FC<IRegistroProps> = ({navigation, route}) => {

  if(!route.params?.authorized){
    navigation.goBack();
  }


  const [senhasVisibility, setSenhasVisibility] = useState<{ senhaIsVisible: boolean, confirma_senhaIsVisible: boolean }>({ senhaIsVisible: false, confirma_senhaIsVisible: false })

  function verificarInvalidos(dados: Dados): boolean {
    for (let prop in dados) {
      if (dados[prop].isInvalid) {
        return false;
      }
    }
    return true;
  }

  function validarSenha(senha: string): boolean {
    const temOitoCaracteres = /.{8,}/;
    const temMaiuscula = /[A-Z]/;
    const temMinuscula = /[a-z]/;
    const temNumero = /[0-9]/;
    const temCaractereEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    return temOitoCaracteres.test(senha) && 
           temMaiuscula.test(senha) && 
           temMinuscula.test(senha) && 
           temNumero.test(senha) && 
           temCaractereEspecial.test(senha);
  }

  const cpfInputRef = useRef(null);

  const [validates, setValidates] = useState<validateObjectsRegisterForm>({
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
    uf: {
      isInvalid: false,
      isDisabled: false,
    },
    username: {
      isInvalid: false,
      isDisabled: false,
    },
    email: {
      isInvalid: false,
      isDisabled: false,
    },
    confirma_email: {
        isInvalid: false,
        isDisabled: false,
    },
    senha: {
      isInvalid: false,
      isDisabled: false,
    },
    confirma_senha: {
        isInvalid: false,
        isDisabled: false,
    },
  });
  const dateMount = (date: Date) => {
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month =
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    return `${day}/${month}/${date.getFullYear()}`;
  };
  const cpf_format = (cpf: string) => {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verifica se o CPF tem o tamanho correto
    if (cpf.length !== 11) {
      return false;
    }

    // Calcula e verifica o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Calcula e verifica o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
      return false;
    }

    // Formata o CPF
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return cpf;
  };
  const cep_format = (cep: string) => {
    // Remove todos os caracteres não numéricos
    cep = cep.replace(/\D/g, "");

    // Verifica se o CEP tem o tamanho correto
    if (cep.length !== 8) {
      return false;
    }

    // Formata o CEP
    cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    return cep;
  };

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [])


  return (
    <ScrollView w="$full">
      <Box w="$full" alignItems="center">
        <Text my="$5" size="2xl">
          Faça o registro abaixo:
        </Text>
        <Formik
          initialValues={{
            nome_completo: "",
            data_de_nascimento: new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate()),
            cpf: "",
            cep: "",
            logradouro: "",
            numero: "",
            complemento: "",
            bairro: "",
            cidade: "",
            uf: "",
            username: "",
            email: "",
            confirma_email: "",
            senha: "",
            confirma_senha: ""
          }}
          onSubmit={async (values) => {
            try{

              const { bairro, cep, cidade, complemento, cpf, data_de_nascimento, logradouro, email, nome_completo, numero, uf, senha, username } = values;
              if(!verificarInvalidos(validates)){
                return Alert.alert("Erro", "Um dos campos ainda é inválido");
              }
  
              const data_pessoa = await fetch(`${api_url}pessoa`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome: nome_completo })
              })

              if (!data_pessoa.ok) {
                return Alert.alert("Erro", "Não foi possivel criar o usuário");
              }

              const pessoa = await data_pessoa.json();
              
              const data_endereco = await fetch(`${api_url}endereco`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  rua: logradouro,
                  numero: Number(numero),
                  bairro: bairro, 
                  cidade: cidade, 
                  UF: uf, 
                  cep: cep, 
                  pessoa_id: pessoa.id 
                })
              })

              if (!data_endereco.ok) {
                return Alert.alert("Erro", "Não foi possivel criar o usuário");
              }
  
              const data_pessoa_fisica = await fetch(`${api_url}pessoa-fisica`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                  cpf,
                  data_de_nascimento,
                  id_pessoa: pessoa.id 
                }),
              });

              
              if (!data_pessoa_fisica.ok) {
                return Alert.alert("Erro", "Não foi possivel criar o usuário");
              }
  
              const data_user = await fetch(`${api_url}user`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: values.username, email: values.email, password: values.senha, id_pessoa: pessoa.id}),
              });
              
              if (!data_user.ok) {
                return Alert.alert("Erro", "Não foi possivel criar o usuário");
              }

              const user = await data_user.json();
  
              if(user){
                Alert.alert("Sucesso", "Cadastro realizado com sucesso");
                navigation.navigate('login', {});
              }
            } catch(e) {
              Alert.alert("Erro", "erro ao realizar o registro");
            }
          }}
          validate={(values) => {}}
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
                    onChangeText={handleChange('nome_completo')}
                    onBlur={() => {
                      if(!values.nome_completo){
                        return setValidates({
                          ...validates,
                          nome_completo: {
                            isInvalid: true,
                            isDisabled: false,
                          },
                        })
                      }
                      return setValidates({
                        ...validates,
                        nome_completo: {
                          isInvalid: false,
                          isDisabled: false,
                        },
                      })
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
                    value={dateMount(values.data_de_nascimento)}
                    placeholder="01/01/1900"
                  />
                  <Button
                    onPress={() => {
                      DateTimePickerAndroid.open({
                        value: values.data_de_nascimento,
                        minimumDate: new Date(1800, 1, 1),
                        maximumDate: new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate()),
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
                    ref={cpfInputRef}
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
                        }
                      })
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
                          uf: {
                            isDisabled: true,
                            isInvalid: false,
                          },
                        })
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
                            await setFieldValue("uf", data.uf);
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
                              uf: {
                                isDisabled: true,
                                isInvalid: false,
                              },
                            })
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
                    onChangeText={handleChange('logradouro')}
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
                    onChangeText={handleChange('numero')}
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
                    onChangeText={handleChange('complemento')}
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
                    onChangeText={handleChange('bairro')}
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
                    onChangeText={handleChange('cidade')}
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
                isInvalid={validates.uf.isInvalid}
                size={"md"}
                isDisabled={validates.uf.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>UF</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    editable={!validates.uf.isDisabled}
                    value={values.uf}
                    placeholder="SP"
                    onChangeText={handleChange('uf')}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Informe sua unidade federativa {'(Sigla do seu estado ex: BA bahia SP são paulo e etc.)'}.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo uf não pode ser vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Usuário */}
              <FormControl
                isInvalid={false}
                size={"md"}
                isDisabled={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Usuário</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.username}
                    placeholder="ex. juju123"
                    onChangeText={handleChange('username')}
                    onBlur={async () => {
                      const result: Array<any> = await fetch(`${api_url}user/all/username/${values.username}`)
                        .then(async (resp) => {
                          if (!resp.ok) {
                            return Alert.alert("Erro", "Não foi possível validar o usuário tente novamente");
                          }
                          return await resp.json(); 
                        });
                      if(result.length > 0){
                        Alert.alert("Erro", "Este usuário já existe");
                        return setValidates({
                          ...validates,
                          username: {
                            isInvalid: true,
                            isDisabled: false,
                          },
                        })
                      }
                      return setValidates({
                        ...validates,
                        username: {
                          isInvalid: false,
                          isDisabled: false,
                        },
                      })
                    }}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Insira o usuário para seu funcionário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O campo usuário não pode ser vázio ou ja ser existente.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Email */}
              <FormControl
                isInvalid={validates.email.isInvalid}
                size={"md"}
                isDisabled={validates.email.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.email}
                    keyboardType="email-address"
                    placeholder="teste@teste.com"
                    onChangeText={handleChange('email')}
                    onBlur={() => {
                      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                      if (!regex.test(values.email)) {
                        return setValidates({
                          ...validates,
                          email: {
                            isInvalid: true,
                            isDisabled: false,
                          }
                        })
                      }
                      return setValidates({
                        ...validates,
                        email: {
                          isInvalid: false,
                          isDisabled: false,
                        }
                      })
                    }}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Insira o email do seu usuário.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    O email não pode ser inválido ou vázio.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Confirma Email */}
              <FormControl
                isInvalid={validates.confirma_email.isInvalid}
                size={"md"}
                isDisabled={validates.confirma_email.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Confirma Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    value={values.confirma_email}
                    placeholder="teste@teste.com"
                    keyboardType="email-address"
                    onChangeText={handleChange('confirma_email')}
                    onBlur={() => {
                      if (!values.confirma_email || values.confirma_email !== values.email) {
                        return setValidates({
                          ...validates,
                          confirma_email: {
                            isInvalid: true,
                            isDisabled: false,
                          },
                        });
                      }
                      return setValidates({
                        ...validates,
                        confirma_email: {
                          isInvalid: false,
                          isDisabled: false,
                        },
                      })
                    }}
                  />
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Esse campo deve ser igual ao campo email.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Campos divergentes.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
                
                {/* Senha */}
              <FormControl
                isInvalid={validates.senha.isInvalid}
                size={"md"}
                isDisabled={validates.senha.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Senha</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type={senhasVisibility.senhaIsVisible ? "text" : "password"}
                    value={values.senha}
                    placeholder="********"
                    onChangeText={handleChange('senha')}
                    onBlur={() => {
                      if(!validarSenha(values.senha)){
                        return setValidates({
                          ...validates,
                          senha: {
                            isInvalid: true,
                            isDisabled: false,
                          },
                        })
                      }
                      return setValidates({
                        ...validates,
                        senha: {
                          isInvalid: false,
                          isDisabled: false,
                        },
                      })
                    }}
                  />
                  <Button
                    onPress={() => setSenhasVisibility({ ...senhasVisibility, senhaIsVisible: senhasVisibility.senhaIsVisible ? false : true,})}
                  >
                    <ButtonIcon as={senhasVisibility.senhaIsVisible ? EyeOffIcon : EyeIcon} />
                  </Button>
                </Input>

                <FormControlHelper>
                    <FormControlHelperText>
                        Informe uma senha com no mínimo 8 caracteres incluíndo, letras maíusculas, mínusculas, números e caracteres especiais.
                    </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                        Senha Inválida não atende as requisitos.
                    </FormControlErrorText>
                </FormControlError>
              </FormControl>

              {/* Confirma senha */}
              <FormControl
                isInvalid={validates.confirma_senha.isInvalid}
                size={"md"}
                isDisabled={validates.confirma_senha.isDisabled}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Confirma Senha</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type={senhasVisibility.confirma_senhaIsVisible ? "text" : "password"}
                    value={values.confirma_senha}
                    placeholder="********"
                    onChangeText={(text) => {
                      setFieldValue('confirma_senha', text)
                      if (text !== values.senha) {
                          return setValidates({
                              ...validates,
                              confirma_senha: {
                                  isDisabled: false,
                                  isInvalid: true
                              }
                          })
                      }
                      return setValidates({
                        ...validates,
                        confirma_senha: {
                            isDisabled: false,
                            isInvalid: false
                        },
                      });
                    }}
                  />
                  <Button
                    onPress={() => setSenhasVisibility({ ...senhasVisibility, confirma_senhaIsVisible: senhasVisibility.confirma_senhaIsVisible ? false : true,})}
                  >
                    <ButtonIcon as={senhasVisibility.confirma_senhaIsVisible ? EyeOffIcon : EyeIcon} />
                  </Button>
                </Input>

                <FormControlHelper>
                  <FormControlHelperText>
                    Senha deve ser iagual a anterior.
                  </FormControlHelperText>
                </FormControlHelper>

                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Senhas divergentes.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>

              <Button mb="$10" onPress={handleSubmit as FormSubmitReact}>
                <ButtonText>Registrar</ButtonText>
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </ScrollView>
  );
};
