import { useParams, useNavigate } from '@tanstack/react-router'
import BackIcon from 'assets/icons/back.svg?react'
import PriceChart from 'components/dummies/PriceChart'
import Button from 'components/ui/Button'
import IconButton from 'components/ui/IconButton'
import Loader from 'components/ui/Loader'
import { useCurrencyContext, currencySymbols } from 'contexts/CurrencyContext'
import { useState } from 'react'
import { useCurrency } from 'hooks/useCurrency'
import styles from './styles.module.scss'

const CurrencyPage = () => {
  const [timeRange, setTimeRange] = useState('1')
  const { id } = useParams({ from: '/currency/$id' })
  const navigate = useNavigate()

  const { currency } = useCurrencyContext()

  const { data, chartData, isLoading, error } = useCurrency(id, timeRange, currency)

  const handleBack = () => navigate({ to: '/' })

  if (isLoading)
    return (
      <div className={styles.mainRoot}>
        <div className={styles.container}>
          <Loader size="large" />
        </div>
      </div>
    )

  if (error || !data)
    return (
      <div className={styles.mainRoot}>
        <div className={styles.container}>
          <p>Failed to load data</p>
        </div>
      </div>
    )

  const growth = data.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
  const percentage = Math.abs(data.market_data.price_change_percentage_24h).toFixed(2)

  const currencySymbol =
    currencySymbols[currency.toLowerCase() as keyof typeof currencySymbols] || '$'
  const value = data.market_data.current_price[currency.toLowerCase()]?.toLocaleString() || '-'

  const image = data.image.large
  const title = data.name
  const subtitle = data.symbol.toUpperCase()

  return (
    <div className={styles.mainRoot}>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <IconButton variant="transparent" icon={<BackIcon />} onClick={handleBack} />
          <div className={styles.addinfo}>
            <img src={image} alt={title} width={40} height={40} />
            <div className={styles.textinfo}>
              <p>
                {title}
                <span>{` (${subtitle})`}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.value}>{`${currencySymbol}${value}`}</div>
          <div className={growth === 'positive' ? styles.positive : styles.negative}>
            {growth === 'positive' ? '+' : '-'}
            {percentage}%
          </div>
        </div>

        {data && <PriceChart data={chartData} />}

        <div className={styles.rangeButtons}>
          {['1', '7', '30', '90', '180', '365'].map(d => (
            <Button
              key={d}
              variant="rounded"
              className={timeRange === d ? styles.activeButton : ''}
              onClick={() => setTimeRange(d)}
            >
              {
                {
                  1: '1H',
                  7: '24H',
                  30: '1M',
                  90: '3M',
                  180: '6M',
                  365: '1Y'
                }[d]
              }
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrencyPage
