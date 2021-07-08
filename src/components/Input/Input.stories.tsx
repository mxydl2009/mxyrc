import React from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './Input'
import Icon from '../Icon/Icon'

export default {
  title: 'Input组件',
  component: Input
} as Meta

export const DefaultInput: Story = () => {
  return (
    <Input onChange={action('change')} />
  )
}
DefaultInput.storyName = '默认的Input组件'

export const DisabledInput: Story = () => {
  return (
    <Input disabled={true} />
  )
}
DisabledInput.storyName = '禁用的Input组件'

export const SizeInput: Story = () => {
  return (
    <>
    <h3>lg尺寸</h3>
    <Input size='lg' />
    <h3>sm尺寸</h3>
    <Input size='sm' />
    </>
  )
}
SizeInput.storyName = '带尺寸的Input组件'

export const IconInput: Story = () => {
  return (
    <Input icon='arrow-down' />
  )
}
IconInput.storyName = '带图标的Input组件'

export const PrependInput: Story = () => {
  return (
    <Input prepend='apple' />
  )
}
PrependInput.storyName = '带前缀的Input组件'

export const AppendInput: Story = () => {
  return (
    <Input append={<Icon icon="arrow-down" />} />
  )
}
AppendInput.storyName = '带后缀的Input组件'
