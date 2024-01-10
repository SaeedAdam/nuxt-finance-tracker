import { startOfYear, endOfYear, sub, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns'

export const useSelectedTimePeriod = (period: Ref<string | number | Date>) => {
  const current = computed(
    () => {
      switch (period.value) {
        case 'Yearly':
          return {
            start: startOfYear(new Date()),
            end: endOfYear(new Date())
          }
        case 'Monthly':
          return {
            start: startOfMonth(new Date()),
            end: endOfMonth(new Date())
          }
        case 'Daily':
          return {
            start: startOfDay(new Date()),
            end: endOfDay(new Date())
          }
        default:
          return {
            start: startOfYear(new Date()),
            end: endOfYear(new Date())
          }
      }
    }
  )

  const previous = computed(
    () => {
      switch (period.value) {
        case 'Yearly':
          return {
            start: startOfYear(sub(new Date(), { years: 1 })),
            end: endOfYear(sub(new Date(), { years: 1 }))
          }
        case 'Monthly':
          return {
            start: startOfMonth(sub(new Date(), { months: 1 })),
            end: endOfMonth(sub(new Date(), { months: 1 }))
          }
        case 'Daily':
          return {
            start: startOfDay(sub(new Date(), { days: 1 })),
            end: endOfDay(sub(new Date(), { days: 1 }))
          }
        default:
          return {
            start: startOfYear(sub(new Date(), { years: 1 })),
            end: endOfYear(sub(new Date(), { years: 1 }))
          }
      }
    }
  )

  return {
    current,
    previous
  }
}
