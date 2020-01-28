import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField'

import { GlobalStateContext } from '../src/GlobalStateContext'

// import Autocomplete from '@material-ui/lab/Autocomplete';

// import mediaItems from './resources/mediaItems'

const MediaItemSearchInput = () => {
  const { search } = useContext(GlobalStateContext)
  return (
    <TextField
      id='SearchTerm'
      variant='outlined'
      label='Search'
      value={search.term || ''}
      onChange={e => search.mutate(e.target.value)}
      autoFocus
    />
  )
}

export default MediaItemSearchInput
