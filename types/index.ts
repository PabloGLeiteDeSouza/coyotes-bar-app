
export type RootStackParamList = {
    "app-screens"?: {  },
    "auth-screens"?: {  },
    "code-scanner"?: { screen: string, }
    "cadastrar-produtos"?: { bar_code?: string, code_scanner_result?: boolean },
    "atualizar-produtos"?: { bar_code?: string, code_scanner_result?: boolean },
    "visualizar-produtos"?: { bar_code?: string, code_scanner_result?: boolean },
    "cadastrar-clientes"?: {  },
    "atualizar-clientes"?: {  },
    "visualizar-clientes"?: {  },
    "cadastrar-vendas"?: {  },
    "atualizar-vendas"?: {  },
    "visualizar-vendas"?: {  },
    "vendas-screens"?: {},
    "clientes-screens"?: {},
    "produtos-screens"?: {},
    "login"?: {  },
    "registro"?: { authorized: boolean }
}

export type ResultsSearchCeps = {
    erro: boolean
} | {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: number,
    gia: number,
    ddd: number,
    siafi: number,
}

export type validateObjectsRegisterForm = {
    nome_completo: { isInvalid: boolean, isDisabled: boolean },
    data_de_nascimento: { isInvalid: boolean, isDisabled: boolean },
    cpf: { isInvalid: boolean, isDisabled: boolean },
    cep: { isInvalid: boolean, isDisabled: boolean },
    logradouro: { isInvalid: boolean, isDisabled: boolean },
    numero: { isInvalid: boolean, isDisabled: boolean },
    complemento: { isInvalid: boolean, isDisabled: boolean },
    bairro: { isInvalid: boolean, isDisabled: boolean },
    cidade: { isInvalid: boolean, isDisabled: boolean },
    uf: { isInvalid: boolean, isDisabled: boolean },
    username: { isInvalid: boolean, isDisabled: boolean },
    email: { isInvalid: boolean, isDisabled: boolean },
    confirma_email: { isInvalid: boolean, isDisabled: boolean },
    senha: { isInvalid: boolean, isDisabled: boolean },
    confirma_senha: { isInvalid: boolean, isDisabled: boolean },
      
}