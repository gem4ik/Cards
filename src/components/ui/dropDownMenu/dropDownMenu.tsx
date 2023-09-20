import {useState} from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type Props={
    align?: 'start' | 'center' | 'end'
}
export const DropdownMenuRadix = ({align='end'}:Props) => {
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
                <button>"dfddfdf"</button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    asChild
                    align={align} // предположиттельно куда ровнять текс
                    sideOffset={12} // количесво пикселей от кнопки относительно которой будет выпаадать меню
                    onClick={event => event.stopPropagation()}
                >

                </DropdownMenu.Content>

            </DropdownMenu.Portal>

        </DropdownMenu.Root>
    );
};

