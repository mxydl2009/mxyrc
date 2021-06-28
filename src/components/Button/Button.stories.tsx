import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import {} from '@storybook/addon-docs'

import Button from './Button';

// 使用传统的Stories API来写stories

// 定义story case
const DefaultButton = () => {
  return <Button
    onClick={action('dianji')}
  >
    默认Button
  </Button>
}

const ButtonWithSize = () => {
  return (
    <>
      <Button size="lg">Large</Button>
      <Button size="sm">Small</Button>
    </>
  )
}

const ButtonWithType = () => {
  return (
    <>
      <Button btnType="primary">primary</Button>
      <Button btnType="danger">danger</Button>
      <Button btnType="link">link</Button>
    </>
  )
}
// storiesOf定义store的名称，使用add()添加每一个stories，使用这种方式可以定义中文的story case 名称，比CSF方式更加方便一些；
storiesOf('Button Component', module)
  .add('默认的Button', DefaultButton)
  .add('不同尺寸的Button', ButtonWithSize)
  .add('不同类型的Button', ButtonWithType)
