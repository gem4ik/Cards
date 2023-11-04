import { useNavigate } from 'react-router-dom'

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
import { useGetMeQuery } from '@/services'

type Props = {
  user?: UserProps
  onLogOut: () => void
}

export const DropdownForHeader = (props: Props) => {
  const navigate = useNavigate()
  const { data: getMeData } = useGetMeQuery()

  return (
    <div className={s.user__header}>
      <p>{props.user?.name}</p>
      {/*<img className={s.userPhoto} src={user?.photo ?? ''} alt="photo" />*/}
      <DropdownMenuRadix trigger={<Avatar src={getMeData?.avatar} />}>
        <DropDownItem>
          <div className={st.dropDownItemWrapper}>
            <Avatar src={getMeData?.avatar} />
            <div>
              <Typography variant={'subtitle2'}>{getMeData?.name}</Typography>
              <Typography variant={'caption'}>{getMeData?.email}</Typography>
            </div>
          </div>
        </DropDownItem>
        <DropDownMenuWithIcon
          onClick={() => navigate('/profile')}
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
