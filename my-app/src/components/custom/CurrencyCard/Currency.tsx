import Card from 'components/dummies/Card'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

export type GrowthType = 'positive' | 'negative'
export type PrevValueT = { value: string | number }

interface ContentProps {
  currency: string
  value: string
  growth: GrowthType
  percentage: string
}

interface Props extends ContentProps {
  image: string
  title: string
  subtitle: string
  prevValues: PrevValueT[]
  onClick?: React.MouseEventHandler
  className?: string
}

const CardMiniChart = ({ growth, values }: { values: PrevValueT[]; growth: GrowthType }) => (
  <div className={styles.chart}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={values}>
        <Line
          type="linear"
          dataKey="value"
          stroke={growth === 'positive' ? '#21bf73' : '#d90429'}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
)

const CardContent = ({ percentage, currency, value, growth }: ContentProps) => {
  const getSign = (growth: GrowthType) => (growth === 'positive' ? '+' : '-')
  return (
    <div className={styles.cardContent}>
      <h5 className={styles.value}>{`${currency}${value}`}</h5>
      <p className={cc(styles[growth], styles.percentage)}>{`${getSign(growth)}${percentage}%`}</p>
    </div>
  )
}

const CurrencyCard = ({
  percentage,
  currency,
  value,
  growth,
  image,
  title,
  prevValues,
  subtitle,
  onClick,
  className
}: Props) => {
  return (
    <Card
      image={image}
      title={title}
      subtitle={subtitle}
      onClick={onClick}
      className={cc(styles.cardRoot, className)}
      content={
        <div className={styles.contentWrapper}>
          <CardMiniChart values={prevValues} growth={growth} />
          <CardContent percentage={percentage} value={value} currency={currency} growth={growth} />
        </div>
      }
    />
  )
}

export default CurrencyCard
