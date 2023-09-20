import { Meta, StoryObj } from '@storybook/react'

import { Textfield } from '@/components/ui/textfield/textfield.tsx'

const meta = {
  title: 'Components/Textfield',
  component: Textfield,
  tags: ['autodocs'],
} satisfies Meta<typeof Textfield>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    placeholder: 'input',
    label: 'Input',
    type: 'search',
  },
}
