import React, { FC, useState, ChangeEvent, useEffect, useRef, KeyboardEvent } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import Transition from '../Transition/Transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

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

/**
 * ## AutoComplete组件
 * ### 组件说明
 * #### 引入说明
 * ~~~js
 * // ESModule
 * import { AutoComplete } from 'mxyrc'
 * ~~~
 * #### 简介
 * 常用于根据用户输入内容进行自动提示补全的场景，避免用户输入太多
 * @param props 
 */
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
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(true)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(300, inputValue)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
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
    setHighlightIndex(-1)
  }, [debouncedValue])
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    onSelect && onSelect(item)
    triggerSearch.current = false
  }

  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 38:
        highlight(highlightIndex - 1)
        break;
      case 40:
        highlight(highlightIndex + 1)
        break;
      case 27:
        setSuggestions([])
        break;
      default:
        break;
    }
  }
  
  const generateDropdown = () => {
    return (
      <Transition
        in={suggestions.length > 0}
        timeout={300}
        animation='zoom-in-left'
      >
        <ul className="mxyrc-suggestion-list">
          { 
            suggestions.map((item: DataSourceType, index: number) => {
              const cNames = classNames('suggestion-item', {
                'item-highlighted': index === highlightIndex
              })
              return (
                <li 
                  key={index}
                  className={cNames}
                  onClick={() => { handleSelect(item)}}
                >
                  { renderOption? renderOption(item): item.value }
                </li>
              ) 
            })
          }
        </ul>
      </Transition>
    )
  }
  return (
    <div className="mxyrc-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        {...restProps}
      />
      { loading && <ul><Icon icon={'spinner'} spin /></ul> }
      {/* { suggestions.length > 0 && generateDropdown() } */}
      { generateDropdown() }
    </div>
  )
}

export default AutoComplete
