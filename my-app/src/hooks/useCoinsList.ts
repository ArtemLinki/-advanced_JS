// hooks/useCoinList.ts
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'
const headers = {
  'x-cg-demo-api-key': API_KEY
}

export const useCoinList = () => {
  const {
    data: coinList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['coinList'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/coins/list`, { headers })
      if (!res.ok) throw new Error('Failed to fetch coin list')
      return (await res.json()) as { id: string; symbol: string; name: string }[]
    },
    staleTime: 24 * 60 * 60 * 1000
  })

  const symbolToIdMap = useMemo(() => {
    if (!coinList) return new Map<string, string>()
    const map = new Map<string, string>()
    for (const coin of coinList) {
      map.set(coin.symbol.toLowerCase(), coin.id)
    }
    return map
  }, [coinList])

  return { coinList, symbolToIdMap, isLoading, error }
}
