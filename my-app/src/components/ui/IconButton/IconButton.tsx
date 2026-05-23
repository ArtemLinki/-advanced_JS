import { cc } from 'utils/combineClasses'
import Button, { ButtonProps } from '../Button/Button'
import CustomSVG from '../CustomSVG'
import styles from './styles.module.scss'

interface Props extends ButtonProps {
  icon: React.JSX.Element
}

const IconButton = (props: Props) => {
  return (
    <Button {...props} className={cc(styles.iconButtonRoot, props.className)}>
      <CustomSVG>{props.icon}</CustomSVG>
    </Button>
  )
}

export default IconButton
