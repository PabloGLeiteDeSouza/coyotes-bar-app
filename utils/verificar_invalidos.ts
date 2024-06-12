import { ValidateData } from "../types";

export function verificarInvalidos(dados: ValidateData): boolean {
    for (let prop in dados) {
      if (dados[prop].isInvalid) {
        return false;
      }
    }
    return true;
}