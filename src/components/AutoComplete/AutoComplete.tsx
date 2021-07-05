import React, { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    console.log()
    setInputValue(value)
    if (value) {
      const result = fetchSuggestions(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }
  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    onSelect && onSelect(item)
  }
  const generateDropdown = () => {
    return (
      <ul>
        { suggestions.map((item: string, index: number) => 
          <li 
            key={index}
            onClick={() => { handleSelect(item)}}
          >
            {item}
          </li> )}
      </ul>
    )
  }
  return (
    <div className="mxyrc-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      { suggestions.length > 0 && generateDropdown() }
    </div>
  )
}

export default AutoComplete
