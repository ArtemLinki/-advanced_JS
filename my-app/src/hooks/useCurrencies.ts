/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import { currencySymbols } from 'contexts/CurrencyContext'
import { useMemo } from 'react'
import { Coin } from 'utils/types'
import { fetchMarketData, fetchChartData } from '../api/coingecko'

const coinIds = ['bitcoin', 'ethereum', 'cardano', 'dogecoin', 'tether', 'tron', 'band-protocol']

export const useCurrencies = (currency: string = 'usd') => {
  const {
    data: marketData,
    isLoading: isMarketLoading,
    error: marketError
  } = useQuery({
    queryKey: ['marketData', currency],
    queryFn: () => fetchMarketData(coinIds, currency),
    staleTime: 5 * 60 * 1000
  })

  const {
    data: chartData,
    isLoading: isChartLoading,
    error: chartError
  } = useQuery({
    queryKey: ['chartData', currency],
    queryFn: () => fetchChartData(coinIds, currency),
    staleTime: 5 * 60 * 1000
  })

  const currencies: Coin[] = useMemo(() => {
    if (!marketData || !chartData) return []

    return marketData.map((coin: any) => ({
      id: coin.id,
      currency: currencySymbols[currency as keyof typeof currencySymbols] || '',
      percentage: Math.abs(coin.price_change_percentage_24h).toFixed(2),
      value: coin.current_price.toLocaleString(),
      growth: coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative',
      image: coin.image,
      title: coin.name,
      subtitle: coin.symbol.toUpperCase(),
      prevValues: chartData[coin.id] || []
    }))
  }, [marketData, chartData, currency])

  return {
    currencies,
    isLoading: isMarketLoading || isChartLoading,
    error: marketError || chartError
  }
}
