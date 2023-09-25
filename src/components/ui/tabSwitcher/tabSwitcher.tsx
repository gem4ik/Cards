import * as ToggleGroup from '@radix-ui/react-toggle-group';
import s from './tabSwitcher.module.scss'
import {Typography} from "@/components/ui/typography";

type Props = {
    values: string[]
    onValueChange:(value: string) => void
}

export const ToggleGroupDemo = (props: Props) => {
    const items = props.values.map(el => {
        return (
            <ToggleGroup.Item key={el} className={s.ToggleGroupItem} value={el} >
                <Typography variant={"body1"} className={'toggle'}>{el}</Typography>
            </ToggleGroup.Item>
        )
    })

    return (
        <ToggleGroup.Root
            className={s.ToggleGroup}
            type='single'
            defaultValue={props.values[0]}
            onValueChange={(value) => {
                if (value) {
                    props.onValueChange(value)
                }
            }}

        >
                {items}
        </ToggleGroup.Root>
    )
}


