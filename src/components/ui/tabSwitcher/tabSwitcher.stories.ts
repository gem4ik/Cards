import {Meta, StoryObj} from "@storybook/react";
import {ToggleGroupDemo} from "@/components/ui/tabSwitcher/tabSwitcher.tsx";

const meta = {
    title: 'Components/ToggleGroupDemo',
    component: ToggleGroupDemo,
    tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Toggle: Story = {
    args: {
     values: ['hyeta','jopa']
    },
}
