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

  return <thead className={s.head} {...res} />
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
export type HeadCellProps = ComponentProps<'th'> & {
  sortable?: boolean
}
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
  sortable?: boolean
}
export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type HeadProps = {
  columns: Column[]
  sort?: Sort
  onSort?: (sort: Sort) => void
}

export const Header = (props: HeadProps) => {
  const { columns, sort, onSort, ...res } = props

  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  const columnsMap = (
    <Row>
      {columns.map(({ title, key, sortable }) => {
        return (
          <HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>
            {title}
          </HeadCell>
        )
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
