import React, { useEffect, useState } from "react";
import {
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
import { Box, FormControl, ScrollView, Text } from "@gluestack-ui/themed";
export const Create: React.FC = () => {

  const api_url = process.env.EXPO_PUBLIC_API_URL_BACKEND_APPLICATION;



  const [quantidade_de_produtos, set_quantidade_de_produtos] =
    useState<number>(1);
  const [clientes, setClientes] = useState<Array<any>>([]);


    useEffect(() => {
      async function Start() {
        const clientes_result = await fetch(`${api_url}clientes/with-name`);

        const clientes: Array<{ name: string, id: number }> = await clientes_result.json();
        setClientes(clientes)
      }
      Start();
    })



  return (
    <ScrollView>
      <Box mt="$5" w="$full" alignItems="center">
        <Text size="2xl">Informe os dados da venda:</Text>
      </Box>
      <Box mt="$5" w="$full" alignItems="center">
        <Box w="$72">
             
            {/* Cliente */}
            <FormControl
              isInvalid={false}
              size={"md"}
              isDisabled={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText>Cliente</FormControlLabelText>
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
                    { clientes.length > 0 ?
                      clientes.map((cliente) => (
                        <SelectItem label={cliente.name} key={cliente.id} value={cliente.id}/>
                      )) :
                      (
                        <SelectItem label="Nenhum cliente encontrado" value="0"/>
                      )
                    }
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
              
            <Box
                mt="$5"
                gap="$5"
            >
                {Array.from({
                    length: quantidade_de_produtos,
                }).map((_, index) => (
                    <>
                    {/* Produto */}
                    <FormControl
                        isInvalid={false}
                        size={"md"}
                        isDisabled={false}
                        isRequired={true}
                    >
                        <FormControlLabel>
                        <FormControlLabelText>Produto {index+1}</FormControlLabelText>
                        </FormControlLabel>
                            <Select
                                isInvalid={true}
                                isDisabled={false}
                            >
                            <SelectTrigger size={"lg"} variant={"outline"}>
                                <SelectInput placeholder="Select option" />
                                <SelectIcon
                                mr={"$3"}
                                ml={0}
                                as={ChevronDownIcon}
                                />
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
                    </>
                ))}
            </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};
