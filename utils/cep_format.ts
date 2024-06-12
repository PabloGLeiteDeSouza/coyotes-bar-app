export const cep_format = (cep: string) => {
    // Remove todos os caracteres não numéricos
    let CEP = cep.replace(/\D/g, "");

    // Verifica se o CEP tem o tamanho correto
    if (cep.length !== 8) {
      return false;
    }

    // Formata o CEP
    cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
    return cep;
};