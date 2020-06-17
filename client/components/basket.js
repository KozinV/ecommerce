import React from 'react'
// import { useSelector } from 'react-redux' // , useDispatch
import Header from './header'
import CardsSort from './cards_sort'

const Basket = () => {
  // const selection = useSelector((s) => s.products.selection)
  // const list = useSelector((s) => s.products.list)
  return (
    <div>
      <div className="fixed w-full">
        <Header />
      </div>
      <div className="pt-20">
        <CardsSort />
      </div>
    </div>
  )
}

export default Basket
