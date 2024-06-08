import React, { useState } from "react";
import {
  Box,
  Text,
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
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { Formik } from "formik";
import { Alert, GestureResponderEvent } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
type FormSubmitReact = (event?: GestureResponderEvent) => void | undefined;

interface ILoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "login">;
  route: RouteProp<RootStackParamList, "login">;
}



export const Login: React.FC<ILoginProps> = ({ navigation, route }) => {

  const api = process.env.EXPO_PUBLIC_API_URL;


  const getPokemonData = (login: string, senha: string) => {
    const endpoint = `${api}/teste`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, senha })
    })
      .then(resposta => resposta.json())
        .then( json => {
          const pokemon = {
            nome: json.name,
            img: json.sprites.other["official-artwork"].front_default,
            peso: json.weight,
          };
          console.log(pokemon);
        })
        .catch(() => {
          Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon');
        });
  }


  const registrar_funcionario = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autorize a criação de um novo funcionário",
    });
    if (auth.success) {
      navigation.navigate("registro", {
        authorized: true,
      });
    }
  };
  return (
    <Box h="$full" w="$full" alignItems="center">
      <Text my="$5" textAlign="center" size="2xl">
        Faça seu login abaixo
      </Text>
      <Box>
        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          onSubmit={ async (values, actions) => {
            fetch('http://10.0.0.136:3000/teste', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ login: values.login, senha: values.password })
            }).then((res) => {
              if (res.ok) {
                console.log(res.json());
              }
            })
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            handleReset,
          }) => (
            <>
              <Box
                gap="$5"
              >
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Login</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      placeholder="Login"
                      onChangeText={handleChange("login")}
                      value={values.login}
                      keyboardType="email-address"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe seu usuário ou email para acessar o app.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Usuário ou email não encontrados.
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
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="password"
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
              </Box>
              <Box>
                <Text
                  onPress={registrar_funcionario}
                  $dark-color="$blue300"
                  $light-color="$blue700"
                  my="$3.5"
                >
                  Cadastrar novo funcioário
                </Text>
              </Box>

              <Button onPress={handleSubmit as FormSubmitReact}>
                <ButtonText>Login</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
