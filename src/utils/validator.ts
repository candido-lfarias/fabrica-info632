// backend/src/utils/validators.ts

/**
 * Valida se uma string é um CNPJ ou CPF válido em termos de formato.
 * Remove caracteres não numéricos e verifica o comprimento.
 * ⚠️ Nota: Esta é uma validação de formato, não dos dígitos verificadores.
 * Para uma validação completa, uma biblioteca mais robusta seria necessária.
 * @param value A string a ser validada.
 * @returns `true` se for um formato válido, `false` caso contrário.
 */
export function isValidCnpjCpf(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  // Remove todos os caracteres que não são dígitos
  const numericOnly = value.replace(/[^\d]/g, '');

  // Verifica se o comprimento é 11 (CPF) ou 14 (CNPJ)
  if (numericOnly.length !== 11 && numericOnly.length !== 14) {
    return false;
  }

  // Evita sequências de dígitos repetidos (ex: 111.111.111-11)
  const isRepeated = new Set(numericOnly).size === 1;
  if (isRepeated) {
    return false;
  }

  return true;
}