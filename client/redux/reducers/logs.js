import axios from 'axios'

const GET_LOGS = 'GET_LOGS'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  const newAction = { ...action, date: `${new Date()}` }
  if (action.type.indexOf('@@') !== 0) {
    fetch('/api/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newAction)
    })
  }
  if (action.type === GET_LOGS) {
    return { ...state, list: action.savedLog }
  }
  return {
    ...state,
    list: [...state.list, newAction]
  }
}

export function getLogs() {
  return (dispatch) => {
    axios('/api/v1/logs')
      .then((it) => it.data)
      .then((savedLog) => {
        // console.log(savedLog)
        dispatch({ type: GET_LOGS, savedLog })
      })
  }
}
