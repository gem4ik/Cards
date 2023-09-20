import {ComponentProps} from "react";
import i from '@/assets/components/avatar/noAvatar2.jpg'

import s from './avatar.module.scss'


export type Props = {
    name?: string
    src?: ComponentProps<'img'>['src']
    size?: ComponentProps<'img'>['width']
}
export const Avatar = ({ name, src=i, size = 36 }: Props) => {
    return <img className={s.avatar} src={src} alt={`${name} avatar`} width={size} height={size} />
}
