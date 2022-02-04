import { updatePriceSizeQuantity } from '../orderTableHelper'
import { Nx2StringMatrix, PriceQuantity } from '../../../common/types'

describe('Order table', () => {
  test('Update quantity for price', () => {
    // given
    const priceForUpdate = 7
    const priceForDelete = 6
    const updatedPriceQuantity = '40'
    const oldState: PriceQuantity[] = [
      { price: 1, quantity: 6 },
      { price: 2, quantity: 2 },
      { price: 3, quantity: 9 },
      { price: 4, quantity: 7 },
      { price: 5, quantity: 4 },
      { price: priceForDelete, quantity: 5 },
      { price: priceForUpdate, quantity: 6 }
    ]
    const newData: Nx2StringMatrix = [
      [String(priceForDelete), '0'],
      [String(priceForUpdate), updatedPriceQuantity],
      ['8', '1'],
      ['9', '1'],
      ['10', '4'],
      ['11', '62'],
      ['12', '1'],
      ['13', '0']
    ]

    // when
    const newState = updatePriceSizeQuantity(oldState, newData)

    // then
    const forUpdate = newData.filter((o) => +o[1] != 0 && oldState.some((s) => s.price == +o[0])).length
    const forDeletion = newData.filter((o) => +o[1] == 0 && oldState.some((a) => a.price == +o[0])).length
    const newAdded = newData.filter((o) => !oldState.some((s) => s.price == +o[0])).length

    expect(newData.length).toBe(forDeletion + forUpdate + newAdded)
    expect(newState.some((o) => o.price == priceForDelete)).toBe(false)
    expect(newState.find((o) => o.price == priceForUpdate)?.quantity).toBe(+updatedPriceQuantity)
  })
})
