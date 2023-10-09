import { Avatar } from '@/components'
import st from '@/components/ui/DropDown/dropDownMenu.module.scss'
import {
  DropDownItem,
  DropdownMenuRadix,
  DropDownMenuWithIcon,
} from '@/components/ui/DropDown/dropDownMenu.tsx'
import { LogOut } from '@/components/ui/DropDown/IconDropDownMenu/logOut.tsx'
import { PersonOutline } from '@/components/ui/DropDown/IconDropDownMenu/personOutline.tsx'
import s from '@/components/ui/header/header.module.css'
import { UserProps } from '@/components/ui/header/header.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  user?: UserProps
  onLogOut: () => void
}

export const DropdownForHeader = (props: Props) => {
  return (
    <div className={s.user__header}>
      <p>{props.user?.name}</p>
      {/*<img className={s.userPhoto} src={user?.photo ?? ''} alt="photo" />*/}
      <DropdownMenuRadix trigger={<Avatar />}>
        <DropDownItem>
          <div className={st.dropDownItemWrapper}>
            <Avatar />
            <div>
              <Typography variant={'subtitle2'}>{'Ivan'}</Typography>
              <Typography variant={'caption'}>{'j&johnson@gmail.com'}</Typography>
            </div>
          </div>
        </DropDownItem>
        <DropDownMenuWithIcon
          onClick={() => props.onLogOut()}
          icon={<PersonOutline />}
          onSelect={() => {}}
          itemText={'Edit'}
        />
        <DropDownMenuWithIcon
          onClick={() => props.onLogOut()}
          icon={<LogOut />}
          itemText={'Sign Out'}
        />
      </DropdownMenuRadix>
    </div>
  )
}
