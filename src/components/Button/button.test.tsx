import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './Button'

const defaultProps = {
  // 添加事件处理函数的mock函数，测试时只需要判断该函数是否被调用，使用jest.fn()创建一个mock函数
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test button component', () => {
  it('should rendered the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent(element, new MouseEvent('click', { bubbles: true, cancelable: true}))
    // fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should rendered the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
  })

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType={'link'} href={`https://baidu.com`}>a link</Button>)
    const element = wrapper.getByText('a link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeTruthy()
    expect(element).toHaveClass('btn btn-default')
    fireEvent(element, new MouseEvent('click', { bubbles: true, cancelable: true}))
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})

