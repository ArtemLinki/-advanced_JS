import { ReactNode } from 'react'
import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
  children: ReactNode
}

const Container = ({ className, children }: Props) => {
  return <div className={cc(className, styles.container)}>{children}</div>
}

export default Container
