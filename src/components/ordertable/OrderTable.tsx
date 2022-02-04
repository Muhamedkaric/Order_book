import React, { useContext } from 'react'

import { AutoSizer, Column, Table, TableHeaderProps, TableHeaderRowProps, TableRowProps } from 'react-virtualized'
import { OrderType, PriceQuantity } from '../../common/types'
import { styled, TableCell, TableRow } from '@mui/material'
import { TableCellProps } from 'react-virtualized/dist/es/Table'
import { SelectorsContext } from '../../context/SelectorsContext'
import { lightGreen, red } from '@mui/material/colors'

const rowHeight = 50
const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  height: '40px'
}
interface OrderTableProps {
  orders: PriceQuantity[]
  type: OrderType
}

const columns = [
  { width: 200, label: 'Price', dataKey: 'price' },
  { width: 200, label: 'Quantity', dataKey: 'quantity' }
]

const TableStyled = styled('div')({
  margin: '6px',
  paddingRight: '3px',
  border: '1px solid gray',
  height: 'calc(100vh - 210px)',
  width: '300px',
  overflow: 'hidden'
})

const StyledHeader = (header: TableHeaderProps) => (
  <TableCell component="div" variant="head">
    {header.label}
  </TableCell>
)

interface StyledCellProps extends TableCellProps {
  type: OrderType
}
const StyledCell = ({ dataKey, cellData, type }: StyledCellProps) => {
  const { decimalType } = useContext(SelectorsContext)
  const color = type == 'BUY' ? lightGreen['A400'] : red['A400']

  return (
    <TableCell sx={{ color }} component="div" variant="body">
      {dataKey == 'price' ? cellData.toFixed(decimalType) : cellData}
    </TableCell>
  )
}

const StyledRow = (props: TableRowProps) => (
  <TableRow key={props.key} sx={rowStyle} style={props.style} component={'div'}>
    {props.columns}
  </TableRow>
)

const StyledHeaderRow = (props: TableHeaderRowProps) => (
  <TableRow sx={rowStyle} style={props.style} component={'div'}>
    {props.columns}
  </TableRow>
)

export function OrderTable(props: OrderTableProps) {
  const { orders, type } = props

  return (
    <TableStyled>
      <AutoSizer>
        {({ width, height }) => {
          return (
            <Table
              height={height}
              width={width}
              rowGetter={({ index }) => orders[index]}
              rowHeight={rowHeight}
              rowRenderer={StyledRow}
              headerRowRenderer={StyledHeaderRow}
              headerHeight={50}
              rowCount={orders.length}>
              {columns.map((column) => {
                return (
                  <Column
                    key={column.dataKey}
                    headerRenderer={StyledHeader}
                    cellRenderer={(props) => <StyledCell {...props} type={type} />}
                    dataKey={column.dataKey}
                    label={column.label}
                    width={column.width}
                  />
                )
              })}
            </Table>
          )
        }}
      </AutoSizer>
    </TableStyled>
  )
}
