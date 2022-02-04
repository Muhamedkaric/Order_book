import { Autocomplete, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { SelectorsContext, SelectorsState } from '../../context/SelectorsContext'

export function TradingPairAutoComplete(props: { symbols: string[] }) {
  const { tradingPair, setTradingPair } = useContext<SelectorsState>(SelectorsContext)
  return (
    <Autocomplete
      options={props.symbols}
      sx={{ minWidth: 200 }}
      disableClearable={true}
      value={tradingPair}
      onChange={(e, val) => setTradingPair(val as string)}
      renderInput={(params) => <TextField {...params} label={'Trading pair'} variant="filled" />}
    />
  )
}
