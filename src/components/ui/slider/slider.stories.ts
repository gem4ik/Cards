import { Meta, StoryObj } from '@storybook/react'

import { RangeSlider } from '@/components/ui/slider/index.ts'

const meta = {
  title: 'Components/Slider',
  component: RangeSlider,
  tags: ['autodocs'],
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Slider: Story = {
  args: {},
}
