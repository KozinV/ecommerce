import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection, sortByPrice, sortByName } from '../redux/reducers/products'

const Cards = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
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
    <div className="flex flex-wrap content-center justifi-start card">
      {list.map((card) => {
        return (
          <div
            className="max-w-xs w-full object-cover object-center bg-white shadow-lg rounded-lg overflow-hidden my-10 mx-4"
            key={card.id}
          >
            <div className="px-4 py-2">
              <div className="card__title text-gray-900 font-bold text-3xl uppercase h-20">
                {card.title}
              </div>
              <div className="text-gray-600 text-sm mt-1">{card.description}</div>
            </div>
            <img
              className="card__image h-56 w-full object-cover mt-2"
              src={card.image}
              alt={card.title}
            />
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <div className="card__price">
                <div className="currency text-gray-200 font-bold text-xl">
                  {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="text-gray-200 font-bold text-lg h-6 w-6 rounded-full"
                  onClick={() => {
                    if (typeof selection[card.id] !== 'undefined') {
                      dispatch(removeSelection(card.id))
                    }
                  }}
                >
                  -
                </button>
                <span className="text-gray-200 font-bold text-lg mx-2">
                  {selection[card.id] || 0}
                </span>
                <button
                  type="button"
                  className="text-gray-200 font-bold text-lg h-6 w-6 rounded-full"
                  onClick={() => {
                    dispatch(addSelection(card.id))
                  }}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded uppercase text-bold"
                >
                  Add to card
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cards
