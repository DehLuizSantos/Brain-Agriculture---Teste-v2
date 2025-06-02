export function CnpjMaskedTextField(value: string): string {
  if (!value) {
    return ''
  }
  return value
    .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
    .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
}

export function CpfMasketTextField(value: string): string {
  if (!value) {
    return ''
  }
  const cpf = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  return cpf
}

export const MaskedIE = (value: string) => {
  if (!value) {
    return ''
  }

  value = value.replace(/\D+/g, '')
  value = value.replace(/(.{3})(\d)/, '$1.$2')
  value = value.replace(/(.{7})(\d)/, '$1.$2')
  value = value.replace(/(.{11})(\d)/, '$1.$2')
  return value
}

export function removeAllEspetialCaracters(value: string) {
  if (value === '0') return '0'
  else return value?.replace(/[^a-zA-Z0-9]/g, '')
}

export function validateCnpj(value: string) {
  if (!value) return false

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const isString = typeof value === 'string'
  const validTypes = isString || Number.isInteger(value) || Array.isArray(value)

  // Elimina valor em formato inválido
  if (!validTypes) return false

  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Limita ao máximo de 18 caracteres, para CNPJ formatado
    if (value.length > 18) return false

    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(value)
    // Teste Regex para verificar se é uma string formatada válida
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)

    // Se o formato é válido, usa um truque para seguir o fluxo da validação
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (digitsOnly || validFormat) true
    // Se não, retorna inválido
    else return false
  }

  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g)
  const numbers = Array.isArray(match) ? match.map(Number) : []

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  // Cálculo validador
  const calc = (x: number) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12)

  // Valida 1o. dígito verificador
  const digit0 = calc(12)
  if (digit0 !== digits[0]) return false

  // Valida 2o. dígito verificador
  const digit1 = calc(13)
  return digit1 === digits[1]
}

export function validateCpf(strCPF: string) {
  const exp = /\.|-/g
  strCPF = strCPF.toString().replace(exp, '')

  if (!strCPF) {
    return false
  }
  if (
    strCPF.length !== 11 ||
    strCPF === '00000000000' ||
    strCPF === '11111111111' ||
    strCPF === '22222222222' ||
    strCPF === '33333333333' ||
    strCPF === '44444444444' ||
    strCPF === '55555555555' ||
    strCPF === '66666666666' ||
    strCPF === '77777777777' ||
    strCPF === '88888888888' ||
    strCPF === '99999999999'
  )
    return false

  let Soma
  let Resto
  Soma = 0
  if (strCPF === '00000000000') return false

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  Resto = (Soma * 10) % 11

  if (Resto === 10 || Resto === 11) Resto = 0
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false

  Soma = 0
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  Resto = (Soma * 10) % 11

  if (Resto === 10 || Resto === 11) Resto = 0
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false
  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MaskedCelPhone = (number: any) => {
  number = number.replace(/\D/g, '')
  number = number.replace(/(.{1})(\d)/, '($1$2')
  number = number.replace(/(.{2})(\d)/, '$1$2) ')
  if (number.length === 12) {
    number = number.replace(/(.{2})$/, '-$1')
  } else if (number.length === 13) {
    number = number.replace(/(.{4})$/, '-$1')
  } else if (number.length === 14) {
    number = number.replace(/(.{4})$/, '-$1')
  } else if (number.length === 15) {
    number = number.replace(/(.{5})$/, '-$1')
  } else if (number.length > 15) {
    number = number.replace(/(.{6})$/, '-$1')
  }
  return number
}

export const cepMasked = (cep: string) => {
  if (!cep) {
    return ''
  }
  cep = cep.replace(/\D/g, '') // Permite apenas dígitos
  cep = cep.replace(/(\d{5})(\d)/, '$1-$2') // coloca uma - após 5 digitos
  return cep
}
