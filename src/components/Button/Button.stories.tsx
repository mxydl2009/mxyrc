import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import Button from './Button';

export default {
  title: "Button组件",
  component: Button
} as Meta

export const DefaultButton: Story = () => {
  return <Button
    onClick={action('dianji')}
  >
    默认Button
  </Button>
}

DefaultButton.storyName = '默认的Button'

export const ButtonWithSize: Story = () => {
  return (
    <>
      <Button size="lg">Large</Button>
      <Button size="sm">Small</Button>
    </>
  )
}

ButtonWithSize.storyName = '不同尺寸的Button'

export const ButtonWithType: Story = () => {
  return (
    <>
      <Button btnType="primary">primary</Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="link">link</Button>
    </>
  )
}

ButtonWithType.storyName = '不同类型的Button'


// 使用传统的Stories API来写stories

// 定义story case
// const DefaultButton = () => {
//   return <Button
//     onClick={action('dianji')}
//   >
//     默认Button
//   </Button>
// }

// const ButtonWithSize = () => {
//   return (
//     <>
//       <Button size="lg">Large</Button>
//       <Button size="sm">Small</Button>
//     </>
//   )
// }

// const ButtonWithType = () => {
//   return (
//     <>
//       <Button btnType="primary">primary</Button>
//       <Button btnType="danger">danger</Button>
//       <Button btnType="link">link</Button>
//     </>
//   )
// }

// storiesOf定义store的名称，使用add()添加每一个stories，使用这种方式可以定义中文的story case 名称，比CSF方式更加方便一些；
// storiesOf('Button Component', module)
//   .add('默认的Button', DefaultButton)
//   .add('不同尺寸的Button', ButtonWithSize)
//   .add('不同类型的Button', ButtonWithType)
