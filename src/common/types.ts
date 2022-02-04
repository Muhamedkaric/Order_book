export type ExchangeStatus = 'TRADING' | 'BREAK'

export type OrderType = 'BUY' | 'SELL' | 'COMBINED'

export interface ExchangeInfo {
  status: ExchangeStatus
  symbol: string // example: ETHBTC
}

export type PriceQuantity = {
  price: number
  quantity: number
}

export interface DepthSnapshot {
  lastUpdateId: number
  bids: Nx2StringMatrix
  asks: Nx2StringMatrix
}

export interface OrderBook {
  lastUpdateId: number
  bids: PriceQuantity[]
  asks: PriceQuantity[]
}

export interface DepthUpdate {
  e: string
  E: number
  s: string
  U: number
  u: number
  b: Nx2StringMatrix
  a: Nx2StringMatrix
}

export type Nx2StringMatrix = [string, string][]

export type DecimalType = 0 | 1 | 2 | 3 | 4 | 5 | 6
