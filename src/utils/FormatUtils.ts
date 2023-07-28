import { format } from 'date-fns'

export function formatMoneyReturningString(amount: number) {
  const formattedValue = amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formattedValue
}

export function formatMoneyReturningNumber(amount: number) {
  const transformedCents = amount
  return transformedCents
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

export function formatDate(date: string, pattern: string) {
  if (date === 'Data') return date
  const newDate = new Date(date)
  if (!newDate) return date
  const formattedDate = format(newDate, pattern)
  return formattedDate
}