import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/ui/pagination/pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationTest: Story = {
  args: {
    onPageChange: () => {},
    totalCount: 100,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 10,
    className: '',
  },
}
