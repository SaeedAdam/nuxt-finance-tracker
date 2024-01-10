export const useCurrency = (amount: number | undefined, currency: string) => {
  const formattedCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount || 0)

  return {
    formattedCurrency
  }
}
