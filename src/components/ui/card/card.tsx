import {clsx} from 'clsx'

import s from './card.module.scss'
import {FC} from "react";

export type CardProps = {
    className?: string
}

export const Card: FC<CardProps> = (({className}) => {
    className? className:className=s.default
    const classNames = {
        root: clsx(s.root, className)
    }

    return (
        <div className={classNames.root}>

        </div>
    )
})