/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect } from 'react'
import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  options: string[]
  multiple?: boolean
  disabled?: boolean
  className?: string
  placeholder?: string
  value?: string | string[]
  onChange?: (value: string | string[]) => void
}

const Dropdown = ({
  options,
  multiple = false,
  disabled,
  className,
  placeholder = 'Choose category',
  value,
  onChange
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  useEffect(() => {
    if (value === undefined) return

    if (multiple) {
      if (Array.isArray(value)) setSelectedOptions(value)
      else setSelectedOptions(value ? [value] : [])
    } else {
      setSelectedOptions(value ? [value as string] : [])
    }
  }, [value, multiple])

  const toggleDropdown = () => {
    if (disabled) return
    setIsOpen(prev => !prev)
  }

  const handleOptionClick = (option: string) => {
    if (disabled) return

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
    if (onChange) {
      onChange(multiple ? newSelected : newSelected[0])
    }
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
        type="button"
        disabled={disabled}
        className={cc(
          styles.selectButton,
          selectedOptions.length ? styles['selectButtonSelected'] : ''
        )}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {renderLabel()}
        <span className={styles.arrow} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          className={styles.dropdownList}
          aria-multiselectable={multiple || undefined}
        >
          {options.map(option => (
            <li
              key={option}
              role="option"
              tabIndex={0}
              aria-selected={isSelected(option)}
              onClick={() => handleOptionClick(option)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleOptionClick(option)
                }
              }}
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
