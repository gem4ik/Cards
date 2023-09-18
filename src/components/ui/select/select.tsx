import s from './select.module.scss'

type Props = {
  className?: string
  options: string[]
  value?: string
}

export const Select = (props: Props) => {
  return (
    <div>
      <select className={s.primary}>
        {props.options.map(el => (
          <option className={s.hover} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  )
}
