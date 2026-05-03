import React from 'react'
import { cc } from 'utils/combineClasses'
import Loader from '../Loader'
import styles from './styles.module.scss'

type VariantType = 'transparent' | 'rounded'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  variant?: VariantType
}

const getVariantClass = (variant?: VariantType) => {
  switch (variant) {
    case 'transparent':
      return styles.transparent
    case 'rounded':
      return styles.rounded
    default:
      return ''
  }
}

const Button = ({ variant, className, loading, disabled, children, ...props }: ButtonProps) => {
  const loaderClass = loading ? styles.loading : ''
  const variantClass = getVariantClass(variant)
  return (
    <button
      disabled={disabled || loading}
      className={cc(styles.buttonRoot, loaderClass, variantClass, className)}
      {...props}
    >
      {loading && <Loader color="second" size="small" />}
      <span>{children}</span>
    </button>
  )
}

export default Button
