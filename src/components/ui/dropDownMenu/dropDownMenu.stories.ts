import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenuRadix } from './'


const meta = {
    title: 'Components/DropdownMenuRadix',
    component: DropdownMenuRadix,
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<typeof DropdownMenuRadix>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {

    },
}