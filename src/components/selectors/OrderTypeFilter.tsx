import * as React from 'react'
import { ReactNode, useContext } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { SelectorsContext, SelectorsState } from '../../context/SelectorsContext'
import { OrderType } from '../../common/types'
import { Ballot, Sell, ShoppingCart } from '@mui/icons-material'

const filterButtons: { value: OrderType; icon: ReactNode }[] = [
  { value: 'BUY', icon: <ShoppingCart /> },
  { value: 'SELL', icon: <Sell /> },
  { value: 'COMBINED', icon: <Ballot /> }
]

export default function OrderTypeFilter() {
  const { orderType, setOrderType } = useContext<SelectorsState>(SelectorsContext)

  const handleChange = (event: React.MouseEvent<HTMLElement>, orderType: OrderType) => {
    setOrderType(orderType)
  }

  function renderButtons() {
    return filterButtons.map(({ icon, value }) => {
      return (
        <ToggleButton key={value} value={value}>
          {icon}
        </ToggleButton>
      )
    })
  }

  return (
    <ToggleButtonGroup value={orderType} exclusive onChange={handleChange}>
      {renderButtons()}
    </ToggleButtonGroup>
  )
}
