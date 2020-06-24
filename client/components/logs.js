import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getLogs } from '../redux/reducers/logs'
// import Header from './header'

const Logs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLogs())
  }, [])
  return (
    <div>
      <div className="flex items-center justify-start px-4 py-2 bg-gray-900">
        <Link to="/" className="text-gray-200 font-bold text-lg mx-2 px-4">
          Home
        </Link>
      </div>
      <div>logs</div>
      <button
        type="button"
        className="text-gray-900 font-bold text-lg px-2 border border-gray-900 rounded"
        onClick={() => {
          axios.delete('/api/v1/logs')
        }}
      >
        Delete All Logs
      </button>
    </div>
  )
}

export default Logs
