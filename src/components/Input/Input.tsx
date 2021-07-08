import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'sm'

// 使用Omit来忽略InputHTMLAttributes<HTMLElement>中的size属性，让我们定义的size属性得以兼容
// 否则，我们定义的size会与InputHTMLAttributes<HTMLElement>的size属性不兼容

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * 用于Input组件的禁用
   */
  disabled?: boolean;
  /**
   * 用于设定组件的大小
   */
  size?: InputSize;
  /**
   * 用于配置带图标的组件,传入icon图标的名称
   */
  icon?: IconProp;
  /**
   * 用于添加组件的前缀
   */
  prepend?: string | ReactElement;
  /**
   * 用于添加组件的后缀
   */
  append?: string | ReactElement;
  /**
   * 自定义onChange事件的回调函数
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * 
 * #### 引入形式
 * ~~~js
 * // ESModule
 * import { Input } from 'mxyrc'
 * ~~~
 * #### 简介
 * Input输入框组件，通过鼠标或键盘输入内容，是最基础的表单域的封装, 支持所有的HTMLInput基本属性
 * @param props 
 */
const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    ...restProps
  } = props;
  
  // 处理受控组件的情况
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    } else {
      return value
    }
  }
  // 处理受控组件的情况，禁止同时传入value和defaultValue两个属性
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(restProps.value)
  }
  const classes = classNames('mxyrc-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  return (
    <div className={classes}>
      { prepend && <div className={'input-group-prepend'}>{ prepend }</div> }
      { icon && <div className={'icon-wrapper'}><Icon icon={icon} title={`title-${icon}`} /></div> }
      <input
        className={'mxyrc-input-inner'}
        disabled={disabled}
        {...restProps}
      />
      { icon ? null: append ? <div className={'input-group-append'}>{ append }</div>: null }
    </div>
  )
}

export default Input