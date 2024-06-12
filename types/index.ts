import { GestureResponderEvent } from "react-native";

export type FormSubmitReact = (event?: GestureResponderEvent) => void | undefined;

export type RootStackParamList = {
    "app-screens"?: {  },
    "auth-screens"?: {  },
    "code-scanner"?: { screen?: string, }
    "cadastrar-produtos"?: { bar_code?: string, code_scanner_result?: boolean },
    "atualizar-produtos"?: { bar_code?: string, code_scanner_result?: boolean },
    "visualizar-produtos"?: { bar_code?: string, code_scanner_result?: boolean },
    "cadastrar-clientes"?: {  },
    "atualizar-clientes"?: { cliente?: ClientesData  },
    "visualizar-clientes"?: {  },
    "cadastrar-vendas"?: {  },
    "atualizar-vendas"?: {  },
    "visualizar-vendas"?: {  },
    "cadastrar-empresas"?: {  },
    "atualizar-empresas"?: { empresa?: TEmpresaApi },
    "visualizar-empresas"?: { updated?: boolean },
    "vendas-screens"?: {},
    "clientes-screens"?: {},
    "produtos-screens"?: {},
    "empresas-screens"?: {},
    "login"?: {  },
    "registro"?: { authorized?: boolean }
}

export type TEmpresaApi = {
    id: number, 
    nome: string, 
    razao_social: string, 
    cnpj: string,
    id_pessoa: number, 
    id_pessoa_juridica: number,
    ramo: string;
} | { 
    id: number, 
    nome: string, 
    cpf: string, 
    data_de_nascimento: Date, 
    id_pessoa: number, 
    id_pessoa_fisica: number,
    ramo: string;
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

export type ValidateObjectClienteRegister = {
    nome_completo: { isInvalid: boolean, isDisabled: boolean },
    data_de_nascimento: { isInvalid: boolean, isDisabled: boolean },
    cpf: { isInvalid: boolean, isDisabled: boolean },
    cep: { isInvalid: boolean, isDisabled: boolean },
    logradouro: { isInvalid: boolean, isDisabled: boolean },
    numero: { isInvalid: boolean, isDisabled: boolean },
    complemento: { isInvalid: boolean, isDisabled: boolean },
    bairro: { isInvalid: boolean, isDisabled: boolean },
    cidade: { isInvalid: boolean, isDisabled: boolean },
    UF: { isInvalid: boolean, isDisabled: boolean },
    limite: { isInvalid: boolean, isDisabled: boolean },
}

export type ValidateData = {
    [key: string]: {
      isInvalid: boolean,
      isDisabled: boolean,
    }
}

export type ClientesData = { 
    nome: string, 
    id_pessoa: number, 
    limite: number, 
    id: number, 
    id_pessoa_fisica: number, 
    cpf: string, 
    data_de_nascimento: Date, 
    enderecos: Array<EnderecosData>, 
}

export type EnderecosData = {
    id: number;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    UF: string;
    cep: string;
    pessoa_id: number;
}