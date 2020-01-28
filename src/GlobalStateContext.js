import React, { createContext, useState } from 'react'

const searchTermDefault = ''

export const defaultGlobalState = { searchTerm: searchTermDefault }

export const GlobalStateContext = createContext(defaultGlobalState)

export const GlobalStateProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(searchTermDefault)
  const updateSearchTerm = searchTerm => setSearchTerm(searchTerm)
  return (
    <GlobalStateContext.Provider value={{
      search: { term: searchTerm, mutate: updateSearchTerm }
    }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateContext
