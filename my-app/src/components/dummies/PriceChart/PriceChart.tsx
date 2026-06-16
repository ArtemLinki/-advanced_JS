import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Props {
  data: { time: string; value: number }[]
}
const PriceChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="time" tick={{ fontSize: 12 }} minTickGap={5} />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#007bff" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceChart
