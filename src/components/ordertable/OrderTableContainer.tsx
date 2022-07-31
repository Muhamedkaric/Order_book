import React, { useContext, useEffect, useState } from 'react'
import { SelectorsContext } from '../../context/SelectorsContext'
import { Box, CircularProgress } from '@mui/material'
import { createSocketUrl, fetcher, mapOrderBook } from '../../common/utils'
import { DepthSnapshot, DepthUpdate, OrderBook, OrderType } from '../../common/types'
import { DEPTH_SNAPSHOT_BASE_URL } from '../../common/constants'
import { OrderTable } from './OrderTable'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { updatePriceSizeQuantity } from './orderTableHelper'

const initialState: OrderBook = { lastUpdateId: 0, asks: [], bids: [] }
let prevEvent: DepthUpdate | undefined = undefined

function updateDepthState(data: OrderBook, setData: (value: OrderBook) => void, newDepthData?: DepthUpdate) {
  if (newDepthData && newDepthData.u > data.lastUpdateId && (!prevEvent || newDepthData.U == prevEvent.u + 1)) {
    const asks = updatePriceSizeQuantity(data.asks, newDepthData.a)
    const bids = updatePriceSizeQuantity(data.bids, newDepthData.b)
    setData({ ...data, asks, bids })
  }
  prevEvent = newDepthData
}

function useDepthState(symbol: string, newData: DepthUpdate) {
  const [data, setData] = useState<OrderBook>(initialState)
  const url = `${DEPTH_SNAPSHOT_BASE_URL}symbol=${symbol}&limit=1000`
  useEffect(() => {
    fetcher(url).then((value: DepthSnapshot) => {
      setData(mapOrderBook(value))
      prevEvent = undefined
    })
  }, [symbol])

  useEffect(() => {
    updateDepthState(data, setData, newData)
  }, [newData])
  return data
}

export function OrderTableContainer() {
  const { orderType, tradingPair } = useContext(SelectorsContext)

  const socketUrl = createSocketUrl(tradingPair)
  const { lastJsonMessage: message, readyState } = useWebSocket(socketUrl)

  const { asks, bids } = useDepthState(tradingPair, message)

  const types: OrderType[] = orderType == 'COMBINED' ? ['BUY', 'SELL'] : [orderType]

  function renderTables() {
    return types.map((type) => {
      return <OrderTable key={type} orders={type == 'BUY' ? bids : asks} type={type} />
    })
  }
  const connected = readyState == ReadyState.OPEN
  return (
    <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-around' }}>
      {connected ? renderTables() : <CircularProgress size={100} />}
    </Box>
  )
}
