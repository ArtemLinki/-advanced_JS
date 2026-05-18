/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icons } from 'constants/icons'
import { Link } from '@tanstack/react-router'
import CurrencyCard from 'components/custom/CurrencyCard'
import MainLayout from 'components/layouts/MainLayout'
import Dropdown from 'components/ui/Dropdown'
import IconButton from 'components/ui/IconButton'
import Input from 'components/ui/Input'
import Loader from 'components/ui/Loader'
import Typography from 'components/ui/Typography'
import Container from 'components/wrappers/Container'
import { useCurrencyContext } from 'contexts/CurrencyContext'
import { useState, Key } from 'react'
import { useCurrencies } from 'hooks/useCurrencies'
import { useSearchCoins } from 'hooks/useSearchCoins'
import styles from './styles.module.scss'

const currencyOptions = [
  'Market - USD',
  'Market - EUR',
  'Market - RUB',
  'Market - INR',
  'Market - TRY'
]

const Main = () => {
  const [query, setQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const { currency, setCurrency, symbol } = useCurrencyContext()
  const {
    currencies,
    isLoading: isCurrenciesLoading,
    error: currenciesError
  } = useCurrencies(currency)

  const {
    filteredCoins: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
    search
  } = useSearchCoins(currency)

  const handleSearch = () => {
    if (query.trim() === '') {
      setIsSearchActive(false)
      return
    }
    search(query)
    setIsSearchActive(true)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value.trim() === '') {
      setIsSearchActive(false)
    }
  }

  const handleCurrencyChange = (selected: string | string[]) => {
    const selectedValue = Array.isArray(selected) ? selected[0] : selected
    const code = selectedValue.split(' - ')[1]?.toLowerCase()
    if (code && ['usd', 'eur', 'rub', 'inr', 'try'].includes(code)) {
      setCurrency(code as any)
    }
  }

  const displayCurrencies = isSearchActive ? searchResults : currencies
  const loading = isSearchActive ? isSearchLoading : isCurrenciesLoading
  const error = isSearchActive ? searchError : currenciesError

  return (
    <MainLayout>
      <Container className={styles.container}>
        <div className={styles.searchBar}>
          <Input
            placeholder="Search Cryptocurrency"
            value={query}
            onChange={onInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch()
            }}
          />
          <IconButton icon={Icons.common.search} onClick={handleSearch} />
        </div>
        <div className={styles.toolbar}>
          <Typography>Coins</Typography>
          <Dropdown
            options={currencyOptions}
            onChange={handleCurrencyChange}
            value={`Market - ${currency.toUpperCase()}`}
          />
        </div>
        {loading ? (
          <Loader size="large" />
        ) : error ? (
          <Typography size="small">Failed to load data</Typography>
        ) : (
          <div className={styles.items}>
            {displayCurrencies.map((item: any, index: Key) => (
              <Link key={index} to="/currency/$id" params={{ id: item.id }} className={styles.link}>
                <CurrencyCard
                  subtitle={item.subtitle || item.symbol?.toUpperCase()}
                  name={item.title || item.name}
                  image={item.image || item.thumb}
                  price={
                    // Если price уже есть — показываем с символом, иначе fallback на current_price
                    item.price
                      ? `${symbol}${item.price}`
                      : item.current_price
                      ? `${symbol}${item.current_price.toLocaleString()}`
                      : 'N/A'
                  }
                  {...item}
                />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </MainLayout>
  )
}

export default Main
