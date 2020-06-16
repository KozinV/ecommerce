import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './header'
import Cards from './cards'
import { getProducts, getRates } from '../redux/reducers/products'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [])
  return (
    <div>
      <div className="fixed w-full">
        <Header />
      </div>
      <div className="pt-10">
        <Cards />
      </div>
    </div>
  )
}

export default Home
