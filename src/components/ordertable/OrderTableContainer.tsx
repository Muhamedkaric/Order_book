import React, { useContext, useEffect, useState } from 'react'
import { SelectorsContext } from '../../context/SelectorsContext'
import { Box } from '@mui/material'
import { createSocketUrl, fetcher, mapOrderBook } from '../../common/utils'
import { DepthSnapshot, DepthUpdate, OrderBook } from '../../common/types'
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

  const data = useDepthState(tradingPair, message)

  if (readyState != ReadyState.OPEN) {
    return <div style={{ color: 'white' }}>LOADING</div>
  }

  return (
    <Box sx={{ p: 3, m: 3, display: 'flex', justifyContent: 'space-around' }}>
      {orderType != 'SELL' && <OrderTable orders={data.asks} type={'BUY'} />}
      {orderType != 'BUY' && <OrderTable orders={data.bids} type={'SELL'} />}
    </Box>
  )
}
