import { Icons } from 'constants/icons'
import { cc } from 'utils/combineClasses'
import CustomSVG from '../CustomSVG'
import styles from './styles.module.scss'

interface Props {
  className?: string
  iconClassName?: string
  size?: 'large' | 'medium' | 'small'
}

const Loader = ({ className, iconClassName, size = 'large' }: Props) => {
  const sizeClass = {
    large: styles.sizeL,
    medium: styles.sizeM,
    small: styles.sizeS
  }[size]

  return (
    <div className={cc(styles.loaderRoot, sizeClass, className)}>
      <CustomSVG className={cc(styles.loaderIcon, iconClassName)}>{Icons.common.loader}</CustomSVG>
    </div>
  )
}

export default Loader
