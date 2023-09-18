import { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/header/header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Auth: Story = {
  args: {
    isAuth: true,
    user: {
      name: 'mishka',
      photo: 'https://friconix.com/png/fi-cnsuxl-user-circle.png',
      email: 'example@yandex.ru',
    },
  },
}
export const NotAuth: Story = {
  args: {
    isAuth: false,
  },
}
