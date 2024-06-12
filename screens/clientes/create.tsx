import { Box, ScrollView } from "@gluestack-ui/themed"
import { Formik } from "formik"

export const Create: React.FC = () => {
    return (
        <ScrollView
            w="$full"
        >
            <Box
                w="$full"
            >
                <Formik
                    initialValues={{
                        nome_completo: '',
                        data_de_nascimento: new Date(),
                        cpf: '',
                        cep: '',
                        logradouro: '',
                        numero: Number(''),
                        complemento: '',
                        bairro: '',
                        cidade: '',
                        UF: '',
                        Limite: Number('100.00'),
                    }}
                    onSubmit={() => {

                    }}
                >

                </Formik>
            </Box>
        </ScrollView>
    )
}