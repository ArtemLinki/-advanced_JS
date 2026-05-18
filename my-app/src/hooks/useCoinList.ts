import { useQuery } from '@tanstack/react-query'

const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'
const headers = { 'x-cg-demo-api-key': API_KEY }

export const useCoinList = () => {
  return useQuery({
    queryKey: ['coinList'],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/coins/list`, { headers })
      if (!res.ok) throw new Error('Failed to fetch coin list')
      return res.json() // { id, symbol, name }[]
    },
    staleTime: 24 * 60 * 60 * 1000
  })
}
