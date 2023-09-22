import type { Meta, StoryObj } from '@storybook/react'

import {select} from './select.tsx'

const meta = {
  title: 'Components/Select',
  component: select,
  tags: ['autodocs'],
} satisfies Meta<typeof select>

export default meta
type Story = StoryObj<typeof meta>


export const Selector: Story = {
  args:{
  items:['afaf','adauoid','aldaoi','adaaf'],
   disabled:false
  }
}

