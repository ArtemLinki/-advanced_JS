import { useNavigate } from '@tanstack/react-router'
import BackIcon from 'assets/icons/back.svg?react'
import BtcIcon from 'assets/icons/btc.png'
import CurrencyCard from 'components/custom/CurrencyCard'
import { GrowthType } from 'components/custom/CurrencyCard/Currency'
import IconButton from 'components/ui/IconButton'
import styles from './styles.module.scss'

const data = {
  currency: '₹',
  percentage: '9.77',
  value: '2,509.75',
  growth: 'positive',
  image: BtcIcon,
  title: 'Bitcoin',
  subtitle: 'BTC',
  prevValues: [
    { value: '2509.75' },
    { value: '2495.74' },
    { value: '2519.75' },
    { value: '1696.75' },
    { value: '2114.75' }
  ]
}

const CurrencyPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate({ to: '/' })
  }

  return (
    <div className={styles.mainRoot}>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <IconButton variant="transparent" icon={<BackIcon />} onClick={handleBack} />
          <div className={styles.addinfo}>
            <img src={data.image} alt="" />
            <div className={styles.textinfo}>
              <p>
                {`${data.title}`}
                <span>{` (${data.subtitle})`}</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>{`${data.currency}${data.value}`}</div>
          <div className={data.growth === 'positive' ? styles.positive : styles.negative}>
            {data.growth === 'positive' ? '+' : '-'}
            {data.percentage}%
          </div>
        </div>
        <CurrencyCard
          percentage={data.percentage}
          currency={data.currency}
          value={data.value}
          growth={data.growth as GrowthType}
          image={data.image}
          title={data.title}
          subtitle={data.subtitle}
          prevValues={data.prevValues}
          className={styles.card}
        />
      </div>
    </div>
  )
}

export default CurrencyPage
