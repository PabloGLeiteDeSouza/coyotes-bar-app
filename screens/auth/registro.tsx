import { Box } from "@gluestack-ui/themed"
import { Formik } from "formik"

export const Registro: React.FC = () => {
    return (
        <Box
            w="$full"
            h="$full"
        >
            <Box>
                <Formik
                    initialValues={{ nome_completo: '', data_de_nascimento: new Date(), cpf: '', cep: '', logradouro: '', numero: '', bairro: '', cidade: '', uf: '', username: '', email: '', senha: '' }}
                    onSubmit={() => {

                    }}
                    validate={(values) => {
                        
                    }}
                >

                </Formik>
            </Box>
        </Box>
    )
}