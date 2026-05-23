/* eslint-disable @typescript-eslint/no-explicit-any */
import { currencySymbols } from 'contexts/CurrencyContext'
import { useState } from 'react'
import { useCoinList } from './useCoinList'

const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'
const headers = { 'x-cg-demo-api-key': API_KEY }

export const useSearchCoins = (currency: string = 'usd') => {
  const { data: coinList, isLoading: isListLoading, error: listError } = useCoinList()
  const [filteredCoins, setFilteredCoins] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!coinList || !query.trim()) {
      setFilteredCoins([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const matched = coinList
      .filter(
        (coin: any) =>
          coin.id.includes(lowerQuery) ||
          coin.name.toLowerCase().includes(lowerQuery) ||
          coin.symbol.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10)

    if (matched.length === 0) {
      setFilteredCoins([])
      return
    }

    const ids = matched.map((c: any) => c.id).join(',')

    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&ids=${ids}`, {
        headers
      })
      if (!res.ok) throw new Error('Market data fetch failed')
      const marketData = await res.json()

      const combined = marketData.map((coin: any) => ({
        currency: currencySymbols[currency as keyof typeof currencySymbols] || '',
        percentage: Math.abs(coin.price_change_percentage_24h).toFixed(2),
        value: coin.current_price.toLocaleString(),
        growth: coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative',
        image: coin.image,
        title: coin.name,
        subtitle: coin.symbol.toUpperCase(),
        id: coin.id
      }))

      setFilteredCoins(combined)
    } catch (e: any) {
      setError(e.message || 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    filteredCoins,
    isLoading: isLoading || isListLoading,
    error: error || listError,
    search
  }
}
