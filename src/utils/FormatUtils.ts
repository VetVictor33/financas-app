import { format, parse } from 'date-fns'

export function formatMoneyFromCentsReturningString(amount: number) {
  const transformedCents = amount / 100
  const formattedValue = transformedCents.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formattedValue
}

export function formatMoneyFromCentsReturningNumber(amount: number) {
  const transformedCents = amount / 100
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
  const [day, month, year] = dateString.split('/');
  return parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());
}

export function formatDate(date: string, pattern: string) {
  const newDate = parseDateFromString(date)
  const formattedDate = format(newDate, pattern)
  return formattedDate
}