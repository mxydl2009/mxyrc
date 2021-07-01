import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import Menu, { MenuProps } from './Menu';
import MenuItem, { MenuItemProps } from './MenuItem';
import SubMenu, { SubMenuProps } from './SubMenu';

export default {
  title: "Menu组件",
  component: Menu
} as Meta

export const DefaultMenu: Story = () => {
  return (
    <Menu>
      <MenuItem>菜单项1</MenuItem>
      <MenuItem>菜单项2</MenuItem>
      <MenuItem>菜单项3</MenuItem>
    </Menu>
  )
}

DefaultMenu.storyName = '默认的Menu组件，无SubMenu'

export const MenuWithSubMenu: Story = () => {
  return (
    <Menu>
      <MenuItem>菜单项1</MenuItem>
      <MenuItem>菜单项2</MenuItem>
      <SubMenu title="子菜单">
        <MenuItem>子菜单项1</MenuItem>
        <MenuItem>子菜单项2</MenuItem>
        <MenuItem>子菜单项3</MenuItem>
      </SubMenu>
    </Menu>
  )
}

MenuWithSubMenu.storyName = '含有SubMenu的Menu组件'

export const MenuWithSubMenuVertical: Story = () => {
  return (
    <Menu mode="vertical">
      <MenuItem>菜单项1</MenuItem>
      <MenuItem>菜单项2</MenuItem>
      <SubMenu title="子菜单">
        <MenuItem>子菜单项1</MenuItem>
        <MenuItem>子菜单项2</MenuItem>
        <MenuItem>子菜单项3</MenuItem>
      </SubMenu>
    </Menu>
  )
}

MenuWithSubMenuVertical.storyName = '含有SubMenu的纵向Menu组件'


