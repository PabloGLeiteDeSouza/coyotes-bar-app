export function formatCnpj(cnpj: string): string {
    // Remove caracteres não numéricos
    const digitsOnly = cnpj.replace(/[^\\d]+/g, '');

    // Formatação: XX.XXX.XXX/YYYY-ZZ
    return `${digitsOnly.substring(0, 2)}.${digitsOnly.substring(2, 5)}.${digitsOnly.substring(5, 8)}/${digitsOnly.substring(8, 12)}-${digitsOnly.substring(12, 14)}`;
}

export function validateCnpj(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const digitsOnly = cnpj.replace(/[^\\d]+/g, '');

    // Verifica se o CNPJ possui 14 dígitos
    if (digitsOnly.length !== 14) {
        return false;
    }

    // Validação do dígito verificador
    const validateDigits = (digits: string, factor: number): boolean => {
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(digits.charAt(i)) * factor;
            factor = factor === 2 ? 9 : factor - 1;
        }
        const remainder = sum % 11;
        const expectedDigit = parseInt(digits.charAt(12));
        return (remainder < 2 && expectedDigit === 0) || (11 - remainder === expectedDigit);
    };

    return validateDigits(digitsOnly.substring(0, 12), 5) && validateDigits(digitsOnly, 6);
}

export default { formatCnpj, validateCnpj };