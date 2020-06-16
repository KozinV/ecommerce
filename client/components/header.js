import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBase, setSort, sortByPrice, sortByName } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const sort = useSelector((s) => s.products.sort)

  const getPrice = (id) => list.find((it) => it.id === id).price
  const selection = useSelector((s) => s.products.selection)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + (rec || 0), 0)
  const sum = Object.entries(selection)
    .reduce((acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1), 0)
    .toFixed(2)
  const symbols = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
      <Link to="/" id="brand-name" className="text-gray-200 font-bold text-lg mx-2 pr-6">
        E-$HOP
      </Link>
      <Link
        to="/basket"
        className="card__product-amount text-gray-200 font-bold text-lg mx-2 pr-4"
        id="order-count"
      >
        Count: {numberOfItems !== 0 && numberOfItems}
      </Link>
      <div className="mx-4">
        {['CAD', 'USD', 'EUR'].map((it) => {
          return (
            <button
              key={it}
              type="button"
              className={`text-gray-200 font-bold text-lg  px-2 ${
                base === it ? 'border border-white-500 rounded' : ''
              }`}
              onClick={() => {
                dispatch(setBase(it))
              }}
            >
              {it}
            </button>
          )
        })}
      </div>
      <div className="text-gray-200 font-bold text-lg mx-2 pr-2" id="order-count">
        Sort by:
        <button
          type="button"
          id="sort-price"
          className={`mx-1 px-2 text-gray-200 font-semibold text-lg ${
            sort === 'price' ? 'border border-white-500 rounded' : ''
          }`}
          onClick={() => {
            dispatch(setSort('price'))
            dispatch(sortByPrice())
          }}
        >
          Price
        </button>
        <button
          type="button"
          id="sort-name"
          className={`mx-1 px-2 text-gray-200 font-semibold text-lg ${
            sort === 'name' ? 'border border-white-500 rounded' : ''
          }`}
          onClick={() => {
            dispatch(setSort('name'))
            dispatch(sortByName())
          }}
        >
          Name
        </button>
      </div>
      <div className="text-gray-200 font-bold text-lg mx-2 pr-4">
        Total: {sum !== 0 && sum} {symbols[base]}
      </div>
    </div>
  )
}

export default Header
