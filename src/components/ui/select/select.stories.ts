import type { Meta, StoryObj } from '@storybook/react'

import { Selector } from './select.tsx'

const meta = {
  title: 'Components/Select',
  component: Selector,
  tags: ['autodocs'],
} satisfies Meta<typeof Selector>

export default meta
type Story = StoryObj<typeof meta>

export const SelectorTest: Story = {
  args: {
    items: ['afaf', 'adauoid', 'aldaoi', 'adaaf'],
    disabled: false,
  },
}
