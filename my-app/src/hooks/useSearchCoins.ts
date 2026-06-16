/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'
const headers = {
  'x-cg-demo-api-key': API_KEY
}

export const useSearchCoins = () => {
  const [filteredCoins, setFilteredCoins] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    if (!query.trim()) {
      setFilteredCoins([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 1. Поиск монет по имени
      const searchResponse = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, {
        headers
      })
      if (!searchResponse.ok) throw new Error('Failed to fetch search results')
      const searchData = await searchResponse.json()

      const coinIds = searchData.coins.map((coin: any) => coin.id).join(',')

      if (!coinIds) {
        setFilteredCoins([])
        setIsLoading(false)
        return
      }

      // 2. Получение рыночных данных для найденных монет
      const marketResponse = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds}`,
        { headers }
      )
      if (!marketResponse.ok) throw new Error('Failed to fetch market data')
      const marketData = await marketResponse.json()

      // 3. Подготовка данных для UI (можно расширить по аналогии с useCurrencies)
      const combined = marketData.map((coin: any) => ({
        currency: '$',
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
      setError(e.message || 'Error fetching coins')
    } finally {
      setIsLoading(false)
    }
  }

  return { filteredCoins, isLoading, error, search }
}
