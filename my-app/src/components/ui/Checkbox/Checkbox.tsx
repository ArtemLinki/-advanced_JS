import { Icons } from 'constants/icons'
import { useState } from 'react'
import { cc } from 'utils/combineClasses'
import CustomSVG from '../CustomSVG'
import styles from './styles.module.scss'

interface Props {
  disabled?: boolean
  className?: string
  checked?: boolean
}

const Checkbox = ({ checked, disabled, className }: Props) => {
  const [checkedState, setChecked] = useState(checked)

  const toggleChecked = () => setChecked(!checkedState)

  return (
    <button
      disabled={disabled}
      onClick={toggleChecked}
      className={cc(styles.checkboxRoot, className)}
    >
      {(checkedState || disabled) && <CustomSVG>{Icons.common.check}</CustomSVG>}
    </button>
  )
}

export default Checkbox
