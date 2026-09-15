const CURRENCY_OPTIONS: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'BRL'
}

export default function formatToBRL(value: number) {
  const intl = new Intl.NumberFormat('pt-BR', CURRENCY_OPTIONS);
  return intl.format(value);
}