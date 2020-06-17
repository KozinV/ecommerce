import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection, sortByPrice, sortByName } from '../redux/reducers/products'

const CardsSort = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const sum = Object.entries(selection)
    .reduce((acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1), 0)
    .toFixed(2)
  useEffect(() => {
    dispatch(sortByPrice())
    dispatch(sortByName())
  }, [])
  const symbols = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }
  return (
    <div className="flex flex-col content-center justifi-start card">
      <div className="pb-12">
        <div className="w-full">
          <table className="w-full">
            <tr>
              <th className="border px-4 py-2 w-1/6 product__image">Image</th>
              <th className="border px-4 py-2 w-1/4 product__title">Title</th>
              <th className="border px-4 py-2 w-1/12 product__price">Price</th>
              <th className="border px-4 py-2 w-1/12 product__amout">Amount</th>
              <th className="border px-4 py-2 w-1/6 product__total_price">Total price</th>
              <th className="border px-4 py-2 w-1/6 product__remove">Remove</th>
            </tr>
          </table>
        </div>
        <div>
          {list
            .filter((it) => Object.keys(selection).indexOf(it.id) !== -1)
            .map((card) => {
              return (
                <div key={card.id}>
                  <div className="w-full">
                    <table className="w-full">
                      <tr>
                        <th className="border px-4 py-2 w-1/6 product__image">
                          <img
                            className="card__image h-40 w-full object-cover mt-2"
                            src={card.image}
                            alt={card.title}
                          />
                        </th>
                        <th className="border px-4 py-2 w-1/4 product__title">{card.title}</th>
                        <th className="border px-4 py-2 w-1/12 product__price">{card.price}</th>
                        <th className="border px-4 py-2 w-1/12 product__amout">
                          {selection[`${card.id}`]}
                        </th>
                        <th className="border px-4 py-2 w-1/6 product__total_price">
                          {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}
                        </th>
                        <th className="border px-4 py-2 w-1/6 product__remove">
                          <button
                            type="button"
                            className="text-gray-900 font-bold text-lg border mx-4 px-8 py-3 border-gray-900 rounded"
                            onClick={() => {
                              if (typeof selection[card.id] !== 'undefined') {
                                dispatch(removeSelection(card.id))
                              }
                            }}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="text-gray-900 font-bold text-lg border mx-4 px-8 py-3 border-gray-900 rounded"
                            onClick={() => {
                              dispatch(addSelection(card.id))
                            }}
                          >
                            +
                          </button>
                        </th>
                      </tr>
                    </table>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <div className="w-full border-box p-0 m-0 bg-gray-900 fixed left-0 bottom-0">
        <div className="total-amount flex border-box p-0 m-0 flex-row-reverse text-gray-200 font-bold text-lg py-2 mx-2 pr-8">
          Total: {sum !== 0 && sum} {symbols[base]}
        </div>
      </div>
    </div>
  )
}

export default CardsSort
