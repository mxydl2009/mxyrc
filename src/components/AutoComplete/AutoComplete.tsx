import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import useDebounce from '../../hooks/useDebounce'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 筛选函数，根据输入的数据进行筛选，返回筛选后的数据
   */
  fetchSuggestions: (data: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**
   * 选择某一项后的回调函数
   */
  onSelect?: (item: DataSourceType) => void;
  /**
   * 自定义如何渲染待选的菜单项
   */
  renderOption?: (item: DataSourceType) => React.ReactElement;
}

interface DataSourceObj {
  value: string;
}

// DataSourceType必须是包含value属性的对象，更多的属性由泛型T指定
export type DataSourceType<T = {}> = T & DataSourceObj

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(300, inputValue)
  useEffect(() => {
    if (debouncedValue) {
      const result = fetchSuggestions(debouncedValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
  }, [debouncedValue])
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item)
  }
  const generateDropdown = () => {
    return (
      <ul>
        { suggestions.map((item: DataSourceType, index: number) => 
          <li 
            key={index}
            onClick={() => { handleSelect(item)}}
          >
            { renderOption? renderOption(item): item.value }
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
      { loading && <ul><Icon icon={'spinner'} spin /></ul> }
      { suggestions.length > 0 && generateDropdown() }
    </div>
  )
}

export default AutoComplete
