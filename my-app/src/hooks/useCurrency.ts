import { useQueries } from '@tanstack/react-query'

const API_KEY = 'CG-te6ri6tZ1fivzczvJ2UqC4Wb'
const BASE_URL = 'https://api.coingecko.com/api/v3'
const headers = {
  'x-cg-demo-api-key': API_KEY
}

export const useCurrency = (
  id: string | undefined,
  days: string = '1',
  currency: string = 'usd' // <-- добавлено
) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['currency', id, currency], // <-- currency включён
        queryFn: async () => {
          if (!id) throw new Error('No currency id provided')
          const res = await fetch(
            `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true`,
            { headers }
          )
          if (!res.ok) throw new Error('Failed to fetch currency data')
          return res.json()
        },
        enabled: !!id
      },
      {
        queryKey: ['currencyChart', id, days, currency], // <-- currency включён
        queryFn: async () => {
          if (!id) throw new Error('No currency id provided')
          const res = await fetch(
            `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
            { headers }
          )
          if (!res.ok) throw new Error('Failed to fetch chart data')
          const data = await res.json()

          return data.prices.map(([timestamp, value]: [number, number]) => {
            const date = new Date(timestamp)

            let timeLabel: string
            if (days === '1') {
              timeLabel = date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })
            } else if (days === 'max') {
              timeLabel = date.toISOString().slice(0, 7)
            } else {
              timeLabel = date.toLocaleDateString([], {
                day: '2-digit',
                month: 'short'
              })
            }

            return {
              time: timeLabel,
              value: Number(value.toFixed(2))
            }
          })
        },
        enabled: !!id
      }
    ]
  })

  const isLoading = results.some(r => r.isLoading)
  const error = results.find(r => r.error)?.error
  const data = results[0].data
  const chartData = results[1].data

  return { data, chartData, isLoading, error }
}
