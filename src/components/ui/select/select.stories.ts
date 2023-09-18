import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Selector: Story = {
  args: {
    options: ['hyeta', 'polnaya hyeta', 'voobwe pizdec'],
  },
}
