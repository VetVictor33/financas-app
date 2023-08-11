import { format } from 'date-fns'

export function formatMoneyReturningCurrencyString(amount: number) {
  const formattedValue = (amount / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formattedValue
}

export function formatMoneyFromCents(amount: number) {
  const transformedCents = amount / 100
  return transformedCents
}

export function formatMoneyInput(amount: string, oldValue: string) {
  const [sign, value] = amount.split('R$ ')
  if (!value) return oldValue
  const formattedValue = value.replace(',', '.')
  if (isNaN(+formattedValue)) return oldValue
  const formattedAmount = amount.replace('.', ',')
  if (formattedAmount.indexOf(',') === -1) {
    return `${formattedAmount},00`
  }
  return formattedAmount
}

export function formatMoneyToCents(amount: string) {
  const [sign, value] = amount.split('R$ ')
  const formattedValue = value.replace(',', '.')
  const cents = +formattedValue * 100
  return cents
}

export function formatToNormalizedAndLowercase(input: string) {
  const normalizedString = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const normalizedLowercase = normalizedString.toLowerCase();
  return normalizedLowercase
}

export function paginateArray(originalArray: Array<any>, itemsPerPage: number, currentPage: number) {
  const totalItems = originalArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = originalArray.slice(startIndex, endIndex);

  return { paginatedItems, totalPages };
}

export function parseDateFromString(dateString: string) {
  return new Date(dateString);
}

export function formatDate(date: string, pattern?: string) {
  const parts = date.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  if (pattern) return month
  const transformedDate = `${day}/${month}/${year}`;
  return date.indexOf('-') !== -1 ? transformedDate : date;
}