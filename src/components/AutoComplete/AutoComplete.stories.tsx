import React from 'react'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete from './AutoComplete'

export default {
  title: 'AutoComplete组件',
  compoennt: AutoComplete
} as Meta


export const DefaultAutoComplete: Story = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 
    'james', 'anthoy', 'green', 'howard', 'kuzma', 'McGee', 'rando'
  ]
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query))
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={(item) => { console.log(item) }}
    />
  )
}

DefaultAutoComplete.storyName = '同步的自动填充组件'