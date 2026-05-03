// api/coingecko.ts
const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'

const headers = {
  'x-cg-demo-api-key': API_KEY
}

export const fetchMarketData = async (coinIds: string[]) => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}`,
    { headers }
  )
  if (!response.ok) {
    throw new Error('Failed to fetch market data')
  }
  return response.json()
}

export const fetchChartData = async (id: string) => {
  const response = await fetch(`${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`, {
    headers
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch chart data for ${id}`)
  }
  const data = await response.json()
  return data.prices.map(([, value]: [number, number]) => ({
    value: value.toFixed(2)
  }))
}

export const searchCoins = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, {
    headers
  })
  if (!response.ok) {
    throw new Error('Failed to fetch search results')
  }
  const data = await response.json()
  return data.coins // массив найденных монет
}
