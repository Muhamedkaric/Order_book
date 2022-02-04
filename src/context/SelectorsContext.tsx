import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react'
import { DecimalType, OrderType } from '../common/types'

export interface SelectorsState {
  orderType: OrderType
  decimalType: DecimalType
  tradingPair: string
  setTradingPair(value: string): void
  setDecimalType(value: DecimalType): void
  setOrderType(value: OrderType): void
}

const initContextValue: SelectorsState = {
  tradingPair: 'ETHBTC',
  orderType: 'COMBINED',
  decimalType: 6,
  ...Object.create({})
}

export const SelectorsContext = createContext<SelectorsState>(initContextValue)

function useSelectorsState() {
  const [orderType, setOrderType] = useState<OrderType>(initContextValue.orderType)
  const [tradingPair, setTradingPair] = useState(initContextValue.tradingPair)
  const [decimalType, setDecimalType] = useState<DecimalType>(initContextValue.decimalType)

  return {
    orderType,
    setOrderType,
    decimalType,
    setDecimalType,
    setTradingPair,
    tradingPair
  }
}

export function SelectorsProvider(props: PropsWithChildren<ReactNode>) {
  const { children } = props
  const state = useSelectorsState()

  return <SelectorsContext.Provider value={state}>{children}</SelectorsContext.Provider>
}
