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
  ScrollView,
  Box,
  ButtonIcon,
  CalendarDaysIcon,
} from "@gluestack-ui/themed";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Formik } from "formik";
type validates = {
  nome?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  data_de_nascimento?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  cpf?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  cep?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  logradouro?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  numero?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  bairro?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  cidade?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  uf?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  username?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  email?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
  senha?: {
    isInvalid: boolean;
    isDisable: boolean;
  };
};
export const Registro: React.FC = () => {
  const [validates, setValidates] = useState<validates | null>({});
  return (
    <ScrollView w="$full" h="$full">
      <Box w="$full" display="flex" alignItems="center" mb="$8">
        <Box my="$10">
          <Text size="2xl">Faça o registro abaixo:</Text>
        </Box>
        <Box w="$64" gap="$5">
          <Formik
            initialValues={{
              nome_completo: "",
              data_de_nascimento: new Date(),
              cpf: "",
              cep: "",
              logradouro: "",
              numero: "",
              bairro: "",
              cidade: "",
              uf: "",
              username: "",
              email: "",
              senha: "",
            }}
            onSubmit={() => {}}
            validate={(values) => {}}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                {/* Nome Completo */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Nome Completo</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      value={values.nome_completo}
                      placeholder="nome completo"
                      onChangeText={handleChange("nome_completo")}
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

                {/* Data de Nascimento */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>
                      Data de Nascimento
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      editable={false}
                      type="text"
                      value={`${
                        values.data_de_nascimento.getDate() < 10
                          ? "0" + values.data_de_nascimento.getDate()
                          : values.data_de_nascimento.getDate()
                      }/${
                        values.data_de_nascimento.getMonth() < 10
                          ? "0" + (values.data_de_nascimento.getMonth() + 1)
                          : values.data_de_nascimento.getMonth() + 1
                      }/${values.data_de_nascimento.getFullYear()}`}
                    />
                    <Button
                      onPress={() => {
                        DateTimePickerAndroid.open({
                          value: values.data_de_nascimento,
                          onChange: (e, date) => {
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
                      Insira sua data de nascimento.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      A data de nascimento é inválida pois o funcionário deve
                      ter pelo menos 16 anos.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* cpf */}
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
                      type="password"
                      defaultValue="12345"
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

                {/* cep */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Cep</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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

                {/* logradouro */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Logradouro</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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

                {/* bairro */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Bairro</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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

                {/* cidade */}
                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Cidade</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
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

                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Uf</FormControlLabelText>
                  </FormControlLabel>

                  <Select isInvalid={false} isDisabled={false}>
                    <SelectTrigger size={"lg"} variant={"outline"}>
                      <SelectInput placeholder="Select option" />
                      <SelectIcon mr={"$3"} ml={0} as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="UX Research" value="UX Research" />
                        <SelectItem
                          label="Web Development"
                          value="Web Development"
                        />
                        <SelectItem
                          label="Cross Platform Development Process"
                          value="Cross Platform Development Process"
                        />
                        <SelectItem
                          label="UI Designing"
                          value="UI Designing"
                          isDisabled={true}
                        />
                        <SelectItem
                          label="Backend Development"
                          value="Backend Development"
                        />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
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

                {/* username */}

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
                      defaultValue="12345"
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

                {/* Email */}

                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      placeholder="email@email.com"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      Informe seu email.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Email inválido.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Confirme Email */}

                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Confirme email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="text"
                      
                      placeholder="email@email.com"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      A confirmação de email deve ser igual ao email.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Emails divergentes.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Senha */}

                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Senha</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
                      placeholder="password"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      A senha deve ter letras maiusculas e minusculas caracteres epsciais e números.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Senha muito fraca.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                {/* Confirma Senha */}

                <FormControl
                  isInvalid={false}
                  size={"md"}
                  isDisabled={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Confirme a senha</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="password"
                      defaultValue="12345"
                      placeholder="password"
                    />
                  </Input>

                  <FormControlHelper>
                    <FormControlHelperText>
                      A confirmação deve ser igual a senha.
                    </FormControlHelperText>
                  </FormControlHelper>

                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      Senhas divergentes.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>

                <Button onPress={handleSubmit}>
                  <ButtonText>Cadastrar</ButtonText>
                </Button>
              </>
            )}
          </Formik>
        </Box>
      </Box>
    </ScrollView>
  );
};
