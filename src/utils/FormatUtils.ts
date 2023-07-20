export function formatMoneyFromCents(amount: number) {
  const transformedCents = amount / 100
  const formattedValue = transformedCents.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formattedValue
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