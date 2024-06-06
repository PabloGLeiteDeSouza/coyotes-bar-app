
export type RootStackParamList = {
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
    "login"?: {  },
    "registro"?: { authorized: boolean }
}