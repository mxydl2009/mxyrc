import React from 'react';
import { Meta, Story } from '@storybook/react';

import Icon from './Icon';

export default {
  title: "Icon组件",
  component: Icon
} as Meta

export const DefaultIcon: Story = () => {
  return <Icon icon="arrow-down" />
}

DefaultIcon.storyName = '默认的Icon'

export const ThemeIcon: Story = () => {
  return <Icon icon="arrow-down" theme="primary" />
}

ThemeIcon.storyName = '包含主题颜色的Icon'
