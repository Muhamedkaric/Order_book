import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { DecimalType } from '../../common/types'
import React, { useContext } from 'react'
import { SelectorsContext, SelectorsState } from '../../context/SelectorsContext'

const menuItems: { value: DecimalType; label: string }[] = [
  { value: 0, label: '0' },
  { value: 1, label: '0.1' },
  { value: 2, label: '0.01' },
  { value: 3, label: '0.001' },
  { value: 4, label: '0.0001' },
  { value: 5, label: '0.00001' },
  { value: 6, label: '0.000001' }
]
export function DecimalTypeSelect() {
  const { decimalType, setDecimalType } = useContext<SelectorsState>(SelectorsContext)

  function renderMenuItems() {
    return menuItems.map((item) => (
      <MenuItem key={item.value} value={item.value}>
        {item.label}
      </MenuItem>
    ))
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Decimal Type</InputLabel>
        <Select
          value={decimalType}
          label="Decimal Type"
          onChange={(e: SelectChangeEvent<DecimalType>) => setDecimalType(e.target.value as DecimalType)}>
          {renderMenuItems()}
        </Select>
      </FormControl>
    </Box>
  )
}
