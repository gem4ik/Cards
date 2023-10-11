import { LogOut, PersonOutline } from '@/assets'
import {
  Avatar,
  DropDownItem,
  DropdownMenuRadix,
  DropDownMenuWithIcon,
  UserProps,
  Typography,
} from '@/components'
import st from '@/components/ui/DropDown/dropDownMenu.module.scss'
import s from '@/components/ui/header/header.module.css'

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
