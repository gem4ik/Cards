import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from '../../../../../../master/src/components/ui/avatar'
import { Typography } from '../../../../../../master/src/components/ui/typography'

import s from './dropDownMenu.module.scss'
import { DropDownItem, DropdownMenuRadix, DropDownMenuWithIcon } from './dropDownMenu.tsx'

import { Edit2Outline } from '@/components/ui/DropDown/IconDropDownMenu/edit2Outline.tsx'
import { LogOut } from '@/components/ui/DropDown/IconDropDownMenu/logOut.tsx'
import { PersonOutline } from '@/components/ui/DropDown/IconDropDownMenu/personOutline.tsx'
import { PlayCircleOutline } from '@/components/ui/DropDown/IconDropDownMenu/playCircleOutline.tsx'
import { TrashOutline } from '@/components/ui/DropDown/IconDropDownMenu/trashOutline.tsx'

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
          {/* eslint-disable-next-line react/no-children-prop */}
          <DropDownItem className={''} children={<Avatar />} />
          <Typography className={s.white}>{'Ivan'}</Typography>
          <Typography className={s.white}>{'j&johnson@gmail.com'}</Typography>
        </div>
        <DropDownMenuWithIcon icon={<PersonOutline />} onSelect={() => {}} itemText={'Edit'} />
        <DropDownMenuWithIcon icon={<LogOut />} onSelect={() => {}} itemText={'Sign Out'} />
      </>
    ),
  },
}

export const DropdownMenuDefault: Story = {
  args: {
    align: 'start',
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
