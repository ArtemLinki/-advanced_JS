import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
  disabled?: boolean
}

const Input = ({ disabled, placeholder, className, ...props }: InputProps) => {
  return (
    <input
      disabled={disabled}
      placeholder={placeholder}
      className={cc(styles.inputRoot, className)}
      {...props}
    />
  )
}

export default Input
