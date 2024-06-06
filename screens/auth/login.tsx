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
import { GestureResponderEvent } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";


type FormSubmitReact = (event?: GestureResponderEvent) => void | undefined;
export const Login: React.FC = ({navigation, route}) => {
  const [isFormInvalid, setIsFormInvalid] = useState<boolean>(false);


  const registrar_funcionario = async () => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autorize a criação de um novo funcionário",
    });
    if(auth.success){
      navigation.navigate("registro", { authorized: true });
    }
  }


  return (
    <Box h="$full" w="$full" alignItems="center" >
        
        <Text 
            my="$5"
            textAlign="center"
            size="2xl"
        >Faça seu login abaixo</Text>
      <Box>
        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          onSubmit={(values, actions) => {
            if (!"deu ruim") {
              setIsFormInvalid(true);
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
              <Box>
                <Text 
                  onPress={registrar_funcionario} 
                  $dark-color="$blue300" 
                  $light-color="$blue700" 
                  my="$4.5" 

                >
                  Cadastrar novo funcioário
                </Text>
              </Box>

              <Button 
                onPress={handleSubmit as FormSubmitReact}
              >
                <ButtonText>Login</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
