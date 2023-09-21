import {Meta, StoryObj} from '@storybook/react'

import {Card} from "@/components/ui/card/card.tsx";

const meta = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
    args: {

    }
}

