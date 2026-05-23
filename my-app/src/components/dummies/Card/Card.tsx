import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  image: string
  title: string
  subtitle: string
  content?: React.ReactNode
  onClick?: React.MouseEventHandler
  className?: string
}

const Card = ({ image, title, subtitle, content, onClick, className }: Props) => {
  return (
    <button onClick={onClick} className={cc(styles.cardRoot, className)}>
      <div className={cc(styles.main)}>
        <div className={cc(styles.item, styles.img)}>
          <img src={image} alt="" />
        </div>
        <div className={styles.item}>
          <h4>{title}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className={styles.item}>{content}</div>
    </button>
  )
}

export default Card
