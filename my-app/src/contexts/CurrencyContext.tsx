import { createContext, useContext, useState, ReactNode } from 'react'

type Currency = 'usd' | 'rub' | 'eur' | 'inr' | 'try'
type CurrencySymbolMap = { [key in Currency]: string }

// eslint-disable-next-line react-refresh/only-export-components
export const currencySymbols: CurrencySymbolMap = {
  usd: '$',
  rub: '₽',
  eur: '€',
  inr: '₹',
  try: '₺'
}

interface CurrencyContextProps {
  currency: Currency
  symbol: string
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined)

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('usd')

  const value = {
    currency,
    symbol: currencySymbols[currency],
    setCurrency
  }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrencyContext must be used inside CurrencyProvider')
  return context
}
