import { ComponentProps } from 'react'

import s from './table.module.scss'

export type TableProps = ComponentProps<'table'>

export const TableRoot = (props: TableProps) => {
  const { className, ...res } = props

  return <table className={s.tableRoot} {...res} />
}

type TheadProps = ComponentProps<'thead'>

export const Thead = (props: TheadProps) => {
  const { className, ...res } = props

  return <thead {...res} />
}

export type TbodyProps = ComponentProps<'tbody'>
export const Tbody = (props: TbodyProps) => {
  const { className, ...res } = props

  return <tbody className={s.body} {...res} />
}

export type RowType = ComponentProps<'tr'>
export const Row = (props: RowType) => {
  const { className, ...res } = props

  return <tr className={s.row} {...res} />
}
export type HeadCellProps = ComponentProps<'th'>
export const HeadCell = (props: HeadCellProps) => {
  const { className, children, ...res } = props

  return (
    <th className={s.headCell} {...res}>
      <span>{children}</span>
    </th>
  )
}
export type CellProps = ComponentProps<'td'>
export const Cell = (props: CellProps) => {
  const { className, ...res } = props

  return <td className={s.cell} {...res}></td>
}

export type Column = {
  title: string
  key: string
}
export type HeadProps = {
  columns: Column[]
}
export const Header = (props: HeadProps) => {
  const { columns, ...res } = props

  const columnsMap = (
    <Row>
      {columns.map(el => {
        return <HeadCell key={el.key}>{el.title}</HeadCell>
      })}
    </Row>
  )

  return <Thead {...res}>{columnsMap}</Thead>
}

export const Table = {
  TableRoot,
  Thead,
  Header,
  HeadCell,
  Row,
  Cell,
  Tbody,
}
