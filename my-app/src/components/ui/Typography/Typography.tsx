import styles from './styles.module.scss'

type TypographyVariantT = 'title' | 'text'
type TypographySize = 'large' | 'medium' | 'small'

interface Props {
  variant?: TypographyVariantT
  size?: TypographySize
  children: React.ReactNode
}

const TypographyTitle = ({ size = 'medium', children }: Props) => {
  const className = `${styles.title} ${styles[size]}`
  return <h3 className={className}>{children}</h3>
}

const TypographyText = ({ size = 'medium', children }: Props) => {
  const className = `${styles.text} ${styles[size]}`
  return <p className={className}>{children}</p>
}

const Typography = ({ variant = 'title', ...props }: Props) => {
  switch (variant) {
    case 'title':
      return <TypographyTitle {...props} />
    case 'text':
    default:
      return <TypographyText {...props} />
  }
}

export default Typography
