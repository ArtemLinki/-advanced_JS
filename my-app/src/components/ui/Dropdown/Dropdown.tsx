/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react'
import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  options: string[]
  multiple?: boolean
  disabled?: boolean
  className?: string
  placeholder?: string
  onChange?: (selected: string[]) => void
}

const Dropdown = ({
  options,
  multiple = true,
  disabled,
  className,
  placeholder = 'Choose category',
  onChange
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const toggleDropdown = () => setIsOpen(prev => !prev)

  const handleOptionClick = (option: string) => {
    let newSelected: string[] = []

    if (multiple) {
      newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter(o => o !== option)
        : [...selectedOptions, option]
    } else {
      newSelected = [option]
      setIsOpen(false)
    }

    setSelectedOptions(newSelected)
    onChange?.(newSelected)
  }

  const isSelected = (option: string) => selectedOptions.includes(option)

  const renderLabel = () => {
    if (selectedOptions.length === 0) return placeholder
    const label = selectedOptions.join(', ')
    return label.length > 30 ? `${label.slice(0, 30)}...` : label
  }

  return (
    <div className={cc(styles.multiDropdownRoot, className)}>
      <button
        disabled={disabled}
        className={cc(
          styles.selectButton,
          selectedOptions.length ? styles['selectButtonSelected'] : ''
        )}
        onClick={toggleDropdown}
      >
        {renderLabel()}
        <span className={styles.arrow} />
      </button>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={cc(styles.dropdownItem, isSelected(option) && styles.selected)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
