import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import mediaItems from './resources/mediaItems'

// import Link from '../src/Link'
import { Link } from 'react-router-dom'

import { GlobalStateContext } from '../src/GlobalStateContext'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

const mediaItemFilterImpl = searchTerm => item => {
  const term = searchTerm.toUpperCase()
  return term === '' || !term ||
    Number(term) === item.id ||
    item.title.toUpperCase().indexOf(term) >= 0 ||
    item.subtitle.toUpperCase().indexOf(term) >= 0
}

const MediaItems = () => {
  const classes = useStyles()
  const { search } = useContext(GlobalStateContext)

  return (
    <TableContainer component={Paper}>
      <Table classtitle={classes.table} aria-label='Media Item Table' size='small'>
        <TableHead>
          <TableRow component='tr'>
            <TableCell component='th'>Speaker</TableCell>
            <TableCell component='th'>Talk</TableCell>
            <TableCell component='th'>Campus</TableCell>
            <TableCell component='th'>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(mediaItems || []).filter(mediaItemFilterImpl(search.term)).map(mediaItem => (
            <TableRow key={mediaItem.id} component='tr'>
              <TableCell component='td'>
                {mediaItem.speaker}
              </TableCell>
              <TableCell component='td'>
                <Link to={`/details/${mediaItem.id}`}>
                  {mediaItem.talk}
                </Link>
              </TableCell>
              <TableCell component='td'>{mediaItem.subtitle}</TableCell>
              <TableCell component='td'>{mediaItem.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MediaItems
