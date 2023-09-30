import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Modal, ModalProps } from '@/components/ui/modal/modal.tsx'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const ModalWithText = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.open)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Modal open={isOpen} setOpen={setIsOpen} title={args.title}>
        <div>
          <div style={{ padding: '18px 24px' }}>
            <Typography variant={'body1'} style={{ color: '#fff' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 24px 36px',
            }}
          >
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsOpen(false)}>Action</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

const ModalWithoutText = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.open)

  // @ts-ignore
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Modal open={isOpen} setOpen={setIsOpen} title={args.title}></Modal>
    </>
  )
}

export const ModalWithTextExample: Story = {
  args: {
    title: 'Modal title',
    open: false,
    setOpen: () => {},
  },
  render: (args: ModalProps) => <ModalWithText {...args} />,
}

export const ModalWithoutTextExample: Story = {
  args: {
    title: 'Modal title',
    open: false,
    setOpen: () => {},
  },
  render: (args: ModalProps) => <ModalWithoutText {...args} />,
}
