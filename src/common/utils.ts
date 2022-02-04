import { DEPTH_STREAM, WS_STREAM_BASE_URL } from './constants'
import { DepthSnapshot, Nx2StringMatrix, OrderBook, PriceQuantity } from './types'

export function createSocketUrl(symbol: string) {
  return `${WS_STREAM_BASE_URL}${symbol.toLocaleLowerCase()}${DEPTH_STREAM}`
}

export function fetcher(url: string) {
  return fetch(url).then((response) => response.json())
}

export function mapPriceQuantity(data: Nx2StringMatrix): PriceQuantity[] {
  return data.map((arr) => ({
    ...data,
    price: +arr[0],
    quantity: +arr[1]
  }))
}

export function mapOrderBook(data: DepthSnapshot): OrderBook {
  return {
    ...data,
    asks: mapPriceQuantity(data.asks),
    bids: mapPriceQuantity(data.bids)
  }
}
