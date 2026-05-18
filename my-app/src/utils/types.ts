export interface Coin {
  id: string
  title: string
  subtitle: string
  image: string
  currency: string
  percentage: string
  value: string
  growth: 'positive' | 'negative'
  prevValues?: { value: string }[]
}
