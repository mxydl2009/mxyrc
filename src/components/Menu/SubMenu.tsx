import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'

export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext)
  const openedMenus = context.defaultOpenedSubMenus as string[]
  const isOpen = (index && context.mode === 'vertical')? openedMenus.includes(index): false
  const [ opened, setOpen ] = useState(isOpen)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index ? context.activeIndex.startsWith(index): false
  })
  const subMenuClasses = classNames('submenu', {
    'menu-opened': opened
  })
  // SubMenu交互：当Menu横向展示时，hover显示下拉；当纵向时，点击显示下拉

  // 使用计时器的方式来避免子组件不断触发MouseEnter和MouseLeave造成的闪烁问题
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      e.preventDefault()
      setOpen(toggle)
    }, 500)    
  }
  const handleVertical = context.mode === 'vertical' ? {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault()
      setOpen(!opened)
    }
  }: {}
  const handleHorizontal = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    },
  } : {}
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const displayName = childElement.type.displayName
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem Component')
      }
    })
    return (
      <ul className={subMenuClasses}>
        { childrenComponent }
      </ul>
    )
  }
  return (
    <li
      key={index}
      className={classes}
      {...handleHorizontal}
    >
      <div className={'submenu-title'} { ...handleVertical }>
        {title}
      </div>
      { renderChildren() }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu