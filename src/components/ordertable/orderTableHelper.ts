import { Nx2StringMatrix, PriceQuantity } from '../../common/types'
import { mapPriceQuantity } from '../../common/utils'

export function updatePriceSizeQuantity(oldState: PriceQuantity[], newData: Nx2StringMatrix): PriceQuantity[] {
  const dataForUpdate = mapPriceQuantity(newData)
  const notForUpdate = oldState.filter((ask) => {
    return !dataForUpdate.some((newAsk) => newAsk.price == ask.price)
  })
  const filteredNewData = dataForUpdate.filter((o) => o.quantity != 0)

  return [...filteredNewData, ...notForUpdate]
}
