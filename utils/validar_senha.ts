export function validarSenha(senha: string): boolean {
    const temOitoCaracteres = /.{8,}/;
    const temMaiuscula = /[A-Z]/;
    const temMinuscula = /[a-z]/;
    const temNumero = /[0-9]/;
    const temCaractereEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    return temOitoCaracteres.test(senha) && 
           temMaiuscula.test(senha) && 
           temMinuscula.test(senha) && 
           temNumero.test(senha) && 
           temCaractereEspecial.test(senha);
}