const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'

const headers = {
  'x-cg-demo-api-key': API_KEY
}

export const fetchMarketData = async (coinIds: string[], currency: string = 'usd') => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=${currency}&ids=${coinIds.join(',')}`,
    { headers }
  )
  if (!response.ok) {
    throw new Error('Failed to fetch market data')
  }
  return response.json()
}

export const fetchChartData = async (
  ids: string[],
  currency: string = 'usd'
): Promise<Record<string, { value: string }[]>> => {
  const requests = ids.map(id =>
    fetch(`${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=1`, {
      headers
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch chart data for ${id}`)
        return res.json()
      })
      .then(data => ({
        id,
        values: data.prices.map((entry: [number, number]) => ({
          value: entry[1].toFixed(2)
        }))
      }))
  )

  const results = await Promise.all(requests)
  const mapped: Record<string, { value: string }[]> = {}

  results.forEach(({ id, values }) => {
    mapped[id] = values
  })

  return mapped
}

export const searchCoins = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, {
    headers
  })
  if (!response.ok) {
    throw new Error('Failed to fetch search results')
  }
  const data = await response.json()
  return data.coins
}
