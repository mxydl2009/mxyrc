import Menu, { MenuProps } from './Menu'
import SubMenu, { SubMenuProps } from './SubMenu'
import MenuItem, { MenuItemProps } from './MenuItem'
import { FC } from 'react'

// 新建一个交叉类型，将Item和SubMenu属性挂载为静态属性到Menu上
export type MenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as MenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu