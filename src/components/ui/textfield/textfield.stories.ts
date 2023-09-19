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
    error: 'error!',
    label: 'input',
    placeholder: 'input',
    type: 'password',
  },
}
