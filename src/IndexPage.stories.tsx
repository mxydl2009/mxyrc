import React from 'react'
import { Meta, Story } from '@storybook/react'

export default {
  title: 'IndexPage'
} as Meta


export const DefaultIndexPage: Story = () => {
  return (
    <div>
      <h2>mxyrc组件库</h2>
      <p>mxyrc是基于React的一套组件库，从零到一去学习如何构建自己的组件库</p>
      <h3>安装试试</h3>
      <code>
        npm install mxyrc -S
      </code>
    </div>
  )
}

DefaultIndexPage.storyName = '首页'