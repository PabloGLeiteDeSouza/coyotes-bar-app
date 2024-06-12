export const cpf_format = (cpf: string) => {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");

    // Verifica se o CPF tem o tamanho correto
    if (cpf.length !== 11) {
      return false;
    }

    // Calcula e verifica o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Calcula e verifica o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    if (remainder < 2) {
      remainder = 0;
    } else {
      remainder = 11 - remainder;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
      return false;
    }

    // Formata o CPF
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return cpf;
};