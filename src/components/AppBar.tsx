import { useContext, useEffect, useState } from 'react'
import { ExchangeInfo } from '../common/types'
import { SelectorsContext, SelectorsState } from '../context/SelectorsContext'
import { EXCHANGE_INFO_URL } from '../common/constants'
import { TradingPairAutoComplete } from './selectors/TradingPairAutoComplete'
import { DecimalTypeSelect } from './selectors/DecimalTypeSelect'
import OrderTypeFilter from './selectors/OrderTypeFilter'
import { Box } from '@mui/material'
import { fetcher } from '../common/utils'
import React from 'react'

function useInitialization(setTradingPairs: (values: string[]) => void, setTradingPair: (val: string) => void) {
  useEffect(() => {
    fetcher(EXCHANGE_INFO_URL).then((data: { symbols: ExchangeInfo[] }) => {
      const symbols = data.symbols.filter((o) => o.status == 'TRADING').map((o) => o.symbol)

      setTradingPairs(symbols)
      setTradingPair(symbols[0])
    })
  }, [])
}

export function AppBar() {
  const { setTradingPair, tradingPair } = useContext<SelectorsState>(SelectorsContext)

  const [tradingPairs, setTradingPairs] = useState<string[]>([tradingPair])
  useInitialization(setTradingPairs, setTradingPair)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', m: 4 }}>
      <TradingPairAutoComplete symbols={tradingPairs} />
      <DecimalTypeSelect />
      <OrderTypeFilter />
    </Box>
  )
}
