import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'

export interface SubMenuProps {
  index?: number;
  className?: string;
  title: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const [ opened, setOpen ] = useState(false)
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index
  })
  const subMenuClasses = classNames('submenu', {
    'menu-opened': opened
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!opened)
  }
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const displayName = childElement.type.displayName
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: i })
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
    >
      <div className={'submenu-title'} onClick={(e) => { handleClick(e) }}>
        {title}
      </div>
      { renderChildren() }
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu