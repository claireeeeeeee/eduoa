import React, { createContext, useReducer, useContext } from 'react'
const initialState = {
  jwt: 0
}

function reducer (state, action) {
  switch (action.type) {
    case 'set':
      return { jwt: action.value }
    default:
      throw new Error()
  }
}

const Context = createContext()

function useStore () {
  return useContext(Context)
}

function StoreProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export { useStore, StoreProvider }
