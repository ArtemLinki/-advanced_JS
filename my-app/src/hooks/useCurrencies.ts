// hooks/useCurrencies.ts

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { fetchMarketData, fetchChartData } from '../api/coingecko'

const coinIds = ['bitcoin', 'ethereum', 'cardano', 'dogecoin', 'tether', 'tron', 'band-protocol']

export const useCurrencies = () => {
  const {
    data: marketData,
    isLoading: isMarketLoading,
    error: marketError
  } = useQuery({
    queryKey: ['marketData'],
    queryFn: () => fetchMarketData(coinIds),
    staleTime: 5 * 60 * 1000
  })

  const {
    data: chartData,
    isLoading: isChartLoading,
    error: chartError
  } = useQuery({
    queryKey: ['chartData'],
    queryFn: async () => {
      const data: Record<string, { value: string }[]> = {}
      for (const id of coinIds) {
        // eslint-disable-next-line no-await-in-loop
        data[id] = await fetchChartData(id)
      }
      return data
    },
    staleTime: 5 * 60 * 1000
  })

  const currencies = useMemo(() => {
    if (!marketData || !chartData) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return marketData.map((coin: any) => ({
      id: coin.id,
      currency: '$',
      percentage: Math.abs(coin.price_change_percentage_24h).toFixed(2),
      value: coin.current_price.toLocaleString(),
      growth: coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative',
      image: coin.image,
      title: coin.name,
      subtitle: coin.symbol.toUpperCase(),
      prevValues: chartData[coin.id] || []
    }))
  }, [marketData, chartData])

  return {
    currencies,
    isLoading: isMarketLoading || isChartLoading,
    error: marketError || chartError
  }
}
