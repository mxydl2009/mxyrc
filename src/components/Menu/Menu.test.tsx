import React from 'react'
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
// 添加图标名称前缀的辅助代码，避免测试时报错
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelected: jest.fn(),
  className: 'test'
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>item3</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>submenu-active</MenuItem>
        <MenuItem disabled>submenu-disabled</MenuItem>
        <MenuItem>submenu-item3</MenuItem>
      </SubMenu>
    </Menu>
  )
}

// 添加样式代码，否则视觉上的断言会不通过，因为我们之前只是断言类名，如果断言视觉效果，需要有CSS代码的辅助，比如断言
// toBeVisible这样的视觉效果
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult, menuElement: HTMLElement, 
    activeElement: HTMLElement, disabledElement: HTMLElement;
    // subMenuElement: HTMLElement

describe('test Menu and MenuItem components', () => {

  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
    // subMenuElement = menuElement.querySelector(':scope > ul') as HTMLElement
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    // 使用:scope伪类选择器来获取到调用querySelectorAll的元素
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('item3')
    fireEvent.click(thirdItem)
    expect(testProps.onSelected).toHaveBeenCalledWith('2')
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelected).not.toHaveBeenCalledWith('1')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when hover on submenu', async () => {
    expect(menuElement).toHaveClass('menu-horizontal')
    expect(wrapper.queryByText('submenu-active')).toBeNull()
    const dropDownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropDownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('submenu-active')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('submenu-active'))
    expect(testProps.onSelected).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropDownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('submenu-active')).not.toBeVisible()
    })
  })
})