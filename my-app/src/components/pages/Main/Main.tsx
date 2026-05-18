import { Link } from '@tanstack/react-router'
import AdaIcon from 'assets/icons/ada.png'
import BandIcon from 'assets/icons/band.png'
import BtcIcon from 'assets/icons/btc.png'
import DogeIcon from 'assets/icons/doge.png'
import EthIcon from 'assets/icons/eth.png'
import TrxIcon from 'assets/icons/trx.png'
import UsdtIcon from 'assets/icons/usdt.png'
import CurrencyCard from 'components/custom/CurrencyCard'
import { GrowthType } from 'components/custom/CurrencyCard/Currency'
import MainLayout from 'components/layouts/MainLayout'
import Button from 'components/ui/Button'
import Input from 'components/ui/Input'
import { useState } from 'react'
import styles from './styles.module.scss'

const prevValues = [
  { value: '2509.75' },
  { value: '2495.74' },
  { value: '2519.75' },
  { value: '1696.75' },
  { value: '2114.75' }
]

const currencies = [
  {
    currency: '₹',
    percentage: '9.77',
    value: '2,509.75',
    growth: 'positive',
    image: BtcIcon,
    title: 'Bitcoin',
    subtitle: 'BTC',
    prevValues
  },
  {
    currency: '₹',
    percentage: '21.00',
    value: '2,509.75',
    growth: 'negative',
    image: EthIcon,
    title: 'Etherium',
    subtitle: 'ETH',
    prevValues
  },
  {
    currency: '₹',
    percentage: '22.97',
    value: '553.06',
    growth: 'negative',
    image: BandIcon,
    title: 'Band Protocol',
    subtitle: 'BAND',
    prevValues
  },
  {
    currency: '₹',
    percentage: '16.31',
    value: '105.06',
    growth: 'negative',
    image: AdaIcon,
    title: 'Cordano',
    subtitle: 'ADA',
    prevValues
  },
  {
    currency: '₹',
    percentage: '16.58',
    value: '5.29',
    growth: 'negative',
    image: TrxIcon,
    title: 'TRON',
    subtitle: 'TRX',
    prevValues
  },
  {
    currency: '₹',
    percentage: '0.07',
    value: '73.00',
    growth: 'positive',
    image: UsdtIcon,
    title: 'Tether',
    subtitle: 'USDT',
    prevValues
  },
  {
    currency: '₹',
    percentage: '21.00',
    value: '23.39',
    growth: 'positive',
    image: DogeIcon,
    title: 'Dogecoin',
    subtitle: 'DOGE',
    prevValues
  }
]

const Main = () => {
  const [query, setQuery] = useState('')
  const [filtered, setFiltered] = useState(currencies)

  const handleSearch = () => {
    const lower = query.trim().toLowerCase()
    if (!lower) {
      setFiltered(currencies)
      return
    }

    const matched = currencies.filter(item => item.title.toLowerCase().startsWith(lower))

    setFiltered(matched)
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <Input
            placeholder="Search Cryptocurrency"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Button variant="transparent" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div className={styles.items}>
          {filtered.map((item, index) => (
            <Link
              key={index}
              to="/currency/$symbol"
              params={{ symbol: item.subtitle.toLowerCase() }}
              className={styles.link}
            >
              <CurrencyCard {...item} growth={item.growth as GrowthType} />
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default Main
