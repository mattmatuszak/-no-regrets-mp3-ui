import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import axios from 'axios'

import mediaItems from './resources/mediaItems'

import { Link } from 'react-router-dom'

import { GlobalStateContext } from '../src/GlobalStateContext'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  notReady: {

  },
  readyForEdit: {
    backgroundColor: '#fff59d'
  },
  readyForUpload: {
    backgroundColor: '#ffe082'
  },
  uploadedToSubsplash: {
    backgroundColor: '#c5e1a5'
  },
  working: {
    backgroundColor: '#eeeeee'
  }
})

const mediaItemFilterImpl = searchTerm => item => {
  const term = searchTerm.toUpperCase()
  return term === '' || !term ||
    Number(term) === item.id ||
    item.title.toUpperCase().indexOf(term) >= 0 ||
    item.subtitle.toUpperCase().indexOf(term) >= 0
}

const sortImpl = (first, second) => {
  console.log(`am I sorting?`)
  const firstStatus = first.status || 'z'
  const secondStatus = second.status || 'z'
  console.log(first, second)
  if (firstStatus < secondStatus)
    return -1;
  if (firstStatus > secondStatus)
    return 1;
  return 0;
}

const MediaItems = () => {
  const classes = useStyles()
  const { search } = useContext(GlobalStateContext)

  const [mediaItemState, updateMediaItemState] = useState({ fetched: false, mediaItems: [] })

  useEffect(() => {
    if (!mediaItemState.fetched) {
      axios.get(`/api/media`)
        .then(mediaItemResult => mediaItemResult.data)
        .then(mediaItems => updateMediaItemState({ ...mediaItemState, mediaItems, fetched: true, failure: false }))
        .catch(err => {
          if (err.response.status === 404) {
            updateMediaItemState({ fetched: true })
          } else {
            console.log(err)
            updateMediaItemState({ fetched: true, failure: true })
          }
        })
    }
  }, [mediaItemState])

  return (
    <TableContainer component={Paper}>
      <Table classtitle={classes.table} aria-label='Media Item Table' size='small'>
        <TableHead>
          <TableRow component='tr'>
            <TableCell component='th'>Speaker</TableCell>
            <TableCell component='th'>Talk</TableCell>
            <TableCell component='th'>Status</TableCell>
            <TableCell component='th'>Campus</TableCell>
            <TableCell component='th'>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(mediaItems || []).filter(mediaItemFilterImpl(search.term)).map(mediaItem => {
            const mediaItemFromState = mediaItemState.mediaItems.find(item => mediaItem.id === Number(item.id)) || { status: 'Waiting for Upload' }
            let rowStyle = classes.notReady
            if (mediaItemFromState.status === 'Ready for Edit\n') {
              rowStyle = classes.readyForEdit
            } else if (mediaItemFromState.status.indexOf('Uploaded to Subsplash') >= 0) {
              rowStyle = classes.uploadedToSubsplash
            } else if (mediaItemFromState.status.indexOf('Subsplash') >= 0) {
              rowStyle = classes.readyForUpload
            }
            return {
              status: mediaItemFromState.status,
              row: (
            <TableRow key={mediaItem.id} component='tr' className={rowStyle}>
              <TableCell component='td'>
                {mediaItem.speaker}
              </TableCell>
              <TableCell component='td'>
                <Link to={`/details/${mediaItem.id}`}>
                  {mediaItem.talk}
                </Link>
              </TableCell>
              <TableCell component='td'>{mediaItemFromState.status}</TableCell>
              <TableCell component='td'>{mediaItem.subtitle}</TableCell>
              <TableCell component='td'>{mediaItem.time}</TableCell>
            </TableRow>
            )}
          }).sort(sortImpl).map(item => item.row)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MediaItems
