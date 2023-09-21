import { Meta, StoryObj } from '@storybook/react'

import { Radio } from '@/components/ui/radioButton/radio.tsx'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGrop: Story = {
  args: {
    labels: ['Radio Group 1'],
  },
}
