import { Icons } from 'constants/icons'
import BitcoinIcon from 'assets/icons/btc.png'
import BitcoinIcon2 from 'assets/icons/btc2.svg'
import CurrencyCard from 'components/custom/CurrencyCard'
import Button from 'components/ui/Button'
import Checkbox from 'components/ui/Checkbox'
import Dropdown from 'components/ui/Dropdown'
import IconButton from 'components/ui/IconButton'
import Input from 'components/ui/Input'
import Loader from 'components/ui/Loader'
import Typography from 'components/ui/Typography'
import Container from 'components/wrappers/Container'
import React from 'react'
import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface ItemProps {
  title: string
  component: React.ReactElement
}

interface BoxProps {
  title: string
  items: ItemProps[]
  className?: string
}


const prevValues = [{value : "1994.31"}, {value: "2005.13"}, {value: "1910.15"}, {value: "1994.51"}]

const Item = ({ title, component }: ItemProps) => {
  return (
    <div className={styles.item}>
      <Typography size="medium">{title}</Typography>
      {component}
    </div>
  )
}

const Box = ({ className, title, items }: BoxProps) => {
  return (
    <div className={styles.box}>
      <Typography size="large">{title}</Typography>

      <div className={cc(className, styles.items)}>
        {items.map((item, i) => (
          <Item {...item} key={i} />
        ))}
      </div>
    </div>
  )
}

const Main = () => {
  const itemsLoader = [
    { title: 'loader:size-l', component: <Loader /> },
    { title: 'loader:size-m', component: <Loader size="medium" /> },
    { title: 'loader:size-s', component: <Loader size="small" /> }
  ]

  const itemsButton = [
    { title: 'button', component: <Button>Cancel</Button> },
    { title: 'button:hover', component: <Button>Cancel</Button> },
    { title: 'button:disabled', component: <Button disabled>Cancel</Button> },
    { title: 'button:loading', component: <Button loading>Cancel</Button> }
  ]

  const itemsCard = [
    {
      title: 'coin-card:hover',
      component: (
        <>
          <CurrencyCard
            title="Bitcoin"
            subtitle="BTC"
            image={BitcoinIcon}
            currency="₹"
            value="2,509.75"
            growth="positive"
            percentage="9.77"
            prevValues={prevValues}
          />
          <CurrencyCard
            title="very long coin name"
            subtitle="BTC"
            image={BitcoinIcon}
            currency="₹"
            value="2,509.75"
            growth="positive"
            percentage="9.77"
            prevValues={prevValues}
          />
          <CurrencyCard
            title="Bitcoin"
            subtitle="BTC"
            image={BitcoinIcon2}
            currency="₹"
            value="2,509.75"
            growth="positive"
            percentage="9.77"
            prevValues={prevValues}
          />
        </>
      )
    },
    {
      title: 'coin-card:hover',
      component: (
        <CurrencyCard
          title="Bitcoin"
          subtitle="BTC"
          image={BitcoinIcon}
          currency="₹"
          value="2,509.75"
          growth="positive"
          percentage="9.77"
          prevValues={prevValues}
        />
      )
    }
  ]

  const itemsInput = [
    { title: 'input', component: <Input placeholder="Search Cryptocurrency" /> },
    { title: 'input:focus', component: <Input placeholder="Search Cryptocurrency" /> },
    { title: 'input:disabled', component: <Input disabled placeholder="Search Cryptocurrency" /> }
  ]

  const itemsDropdown = [
    {
      title: 'MultiDropdown',
      component: (
        <Dropdown
          multiple
          options={[
            'Aave Tokens',
            'Algorand Ecosystem',
            'Analytics',
            'Aptos Ecosystem',
            'Arbitrum Ecosystem',
            'Arbitrum Nova Ecosystem'
          ]}
        />
      )
    },
    {
      title: 'MultiDropdown:focus',
      component: (
        <Dropdown
          multiple
          options={[
            'Aave Tokens',
            'Algorand Ecosystem',
            'Analytics',
            'Aptos Ecosystem',
            'Arbitrum Ecosystem',
            'Arbitrum Nova Ecosystem'
          ]}
        />
      )
    },
    {
      title: 'MultiDropdown:disabled',
      component: (
        <Dropdown
          disabled
          multiple
          options={[
            'Aave Tokens',
            'Algorand Ecosystem',
            'Analytics',
            'Aptos Ecosystem',
            'Arbitrum Ecosystem',
            'Arbitrum Nova Ecosystem'
          ]}
        />
      )
    },
    {
      title: 'MultiDropdown:clicked',
      component: (
        <Dropdown
          multiple
          options={[
            'Aave Tokens',
            'Algorand Ecosystem',
            'Analytics',
            'Aptos Ecosystem',
            'Arbitrum Ecosystem',
            'Arbitrum Nova Ecosystem'
          ]}
        />
      )
    },
    {
      title: 'MultiDropdown:selected',
      component: (
        <Dropdown
          multiple
          options={[
            'Aave Tokens',
            'Algorand Ecosystem',
            'Analytics',
            'Aptos Ecosystem',
            'Arbitrum Ecosystem',
            'Arbitrum Nova Ecosystem'
          ]}
        />
      )
    },
    {
      title: 'MultiDropdown:selected',
      component: (
        <Dropdown
          multiple
          options={[
            'Aave Tokens',
            'Algorand Ecosystem',
            'Analytics',
            'Aptos Ecosystem',
            'Arbitrum Ecosystem',
            'Arbitrum Nova Ecosystem'
          ]}
        />
      )
    }
  ]

  const itemsCheckbox = [
    { title: 'checkbox', component: <Checkbox /> },
    { title: 'checkbox:hover', component: <Checkbox /> },
    { title: 'checkbox:checked', component: <Checkbox checked /> },
    { title: 'checkbox:disabled', component: <Checkbox disabled /> }
  ]

  const itemsIconButton = [
    { title: 'search-button', component: <IconButton icon={Icons.common.search} /> },
    { title: 'search-button:hover', component: <IconButton icon={Icons.common.search} /> },
    {
      title: 'search-button:disabled',
      component: <IconButton disabled icon={Icons.common.search} />
    }
  ]

  return (
    <div>
      <Container className={styles.container}>
        <Box title="Лоадер" items={itemsLoader} />
        <Box title="Кнопка" items={itemsButton} />
        <Box title="Карточка" items={itemsCard} />
        <Box title="Инпут" items={itemsInput} />
        <Box title="МультиДропдаун" className={styles.dropdown} items={itemsDropdown} />
        <Box title="Чекбокс" items={itemsCheckbox} />
        <Box title="Кнопка поиска" items={itemsIconButton} />
      </Container>
    </div>
  )
}

export default Main
