import React, { useEffect, useState } from "react";
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
  ButtonIcon,
  EyeOffIcon,
  EyeIcon,
} from "@gluestack-ui/themed";
import { Formik } from "formik";
import { Alert, GestureResponderEvent } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SplashScreen from "expo-splash-screen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormSubmitReact = (event?: GestureResponderEvent) => void | undefined;

interface ILoginProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "login">;
  route: RouteProp<RootStackParamList, "login">;
}


export const Login: React.FC<ILoginProps> = ({ navigation }) => {

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [])

  const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;

  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
  
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
          onSubmit={async (values, actions) => {
            try {
              const { login, password } = values;
              const response = await fetch(`${api_url}auth/login`, { // substitua com a URL correta
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: login, password})
              });

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              // O token JWT deve estar no campo 'access_token' da resposta
              const jwt = data.access_token;
              await AsyncStorage.setItem('token', jwt);
              navigation.navigate("app-screens");
            } catch (error) {
              console.error('There has been a problem with your fetch operation: ', error);
            }
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
                      type={passwordIsVisible ? "text" : "password"}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="password"
                    />
                    <Button
                      onPress={() => { setPasswordIsVisible(!passwordIsVisible) }}
                    >
                      <ButtonIcon as={passwordIsVisible ? EyeOffIcon : EyeIcon} />
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
}
