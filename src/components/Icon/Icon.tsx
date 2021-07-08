import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  /**
   * 用于指定主题颜色
   */
  theme?: themeProps
}

/**
 * 
 * 
 * ### 引入方式
 * ~~~js
 * // ESModule
 * import { Icon } from 'mxyrc'
 * ~~~
 * 
 * ### 简介
 * Icon组件用于显示图标
 * @param props 
 */
const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon