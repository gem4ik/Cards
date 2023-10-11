import type { Meta, StoryObj } from '@storybook/react'

import s from './dropDownMenu.module.scss'

import { Edit2Outline } from '@/assets/components/IconDropDownMenu/edit2Outline.tsx'
import { LogOut } from '@/assets/components/IconDropDownMenu/logOut.tsx'
import { PersonOutline } from '@/assets/components/IconDropDownMenu/personOutline.tsx'
import { PlayCircleOutline } from '@/assets/components/IconDropDownMenu/playCircleOutline.tsx'
import { TrashOutline } from '@/assets/components/IconDropDownMenu/trashOutline.tsx'
import { DropDownItem, DropdownMenuRadix, DropDownMenuWithIcon } from '@/components'
import { Avatar } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/DropdownMenuRadix',
  component: DropdownMenuRadix,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenuRadix>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuAvatar: Story = {
  args: {
    align: 'end',
    trigger: <Avatar />,
    children: (
      <>
        <div>
          <DropDownItem className={''}>
            <div className={s.dropDownItemWrapper}>
              <Avatar />
              <div>
                <Typography style={{ color: 'white' }} variant={'subtitle2'}>
                  {'Ivan'}
                </Typography>
                <Typography style={{ color: 'grey' }} variant={'caption'}>
                  {'j&johnson@gmail.com'}
                </Typography>
              </div>
            </div>
          </DropDownItem>
        </div>
        <DropDownMenuWithIcon icon={<PersonOutline />} onSelect={() => {}} itemText={'Edit'} />
        <DropDownMenuWithIcon icon={<LogOut />} onSelect={() => {}} itemText={'Sign Out'} />
      </>
    ),
  },
}

export const DropdownMenuDefault: Story = {
  args: {
    align: 'end',
    trigger: <Avatar />,
    children: (
      <>
        <DropDownMenuWithIcon icon={<PlayCircleOutline />} onSelect={() => {}} itemText={'Learn'} />

        <DropDownMenuWithIcon icon={<Edit2Outline />} onSelect={() => {}} itemText={'Edit'} />

        <DropDownMenuWithIcon icon={<TrashOutline />} onSelect={() => {}} itemText={'Delete'} />
      </>
    ),
  },
}
