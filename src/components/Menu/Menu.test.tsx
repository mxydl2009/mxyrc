import React from 'react'
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem, { MenuItemProps } from './MenuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelected: jest.fn(),
  className: 'test'
}

const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>item3</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem components', () => {

  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('item3')
    fireEvent.click(thirdItem)
    expect(testProps.onSelected).toHaveBeenCalledWith(2)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelected).not.toHaveBeenCalledWith(1)
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerticalProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})