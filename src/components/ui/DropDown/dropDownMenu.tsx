import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementRef,
  forwardRef,
  ReactNode,
  useState,
} from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = {
  align?: 'start' | 'center' | 'end'
  trigger: ReactNode
  children: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Root>
export const DropdownMenuRadix = forwardRef<ElementRef<typeof DropdownMenu.Trigger>, Props>(
  ({ align = 'end', children, trigger }, ref) => {
    const [open, setOpen] = useState(false)

    return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger ref={ref} asChild>
          <button className={s.dropdownMenuTrigger}>{trigger}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={s.downMenuWrapper}
            asChild
            align={align} // предположиттельно куда ровнять текс
            sideOffset={12} // количесво пикселей от кнопки относительно которой будет выпаадать меню
            alignOffset={-5}
            onClick={event => event.stopPropagation()}
          >
            <div>
              <DropdownMenu.Arrow className={s.dropdownMenuArrow} asChild>
                <div className={s.dropdownMenuArrow}></div>
              </DropdownMenu.Arrow>
              {children}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  }
)
export type DropDownMenuItemProps = {
  children: ReactNode
  className?: string
}
export const DropDownItem = ({ children, ...restProps }: DropDownMenuItemProps) => {
  // const DropDownMenuItemClass = clsx {s.item,className}
  return (
    <DropdownMenu.Item className={s.noOutline} {...restProps}>
      <div>
        {children}

        <div>
          <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
        </div>
      </div>
    </DropdownMenu.Item>
  )
}
export type DropDownMenuIconProps = {
  children?: ReactNode
  style?: CSSProperties
  icon?: ReactNode
  itemText: string
} & ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropDownMenuWithIcon = ({
  icon,
  itemText,
  onSelect,
  ...rest
}: DropDownMenuIconProps) => {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      onClick={event => event.stopPropagation()}
      {...rest}
      // className={s.itemWrapper}
    >
      <>
        <div className={s.itemWrapper}>
          <div className={s.itemIconImg}>{icon}</div>
          <Typography variant="caption" style={{ color: 'white' }}>
            {itemText}
          </Typography>
        </div>
        <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
      </>
    </DropdownMenu.Item>
  )
}
