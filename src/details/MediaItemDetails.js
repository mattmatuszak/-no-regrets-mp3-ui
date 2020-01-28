import React from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import { itemsMap } from '../resources/mediaItems'

// import StagePanel from './StagePanel'
import UploadMp3 from './UploadMp3'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    fontSize: 14,
    marginBottom: 12
  }
}))

export default () => {
  const { mediaItemId } = useParams()
  const details = itemsMap[mediaItemId] || {}
  const classes = useStyles()

  const files = [
    { kind: 'original', visualLink: '/api/media/123456/original/visual', fileLink: '/api/media/123456/original' },
    { kind: 'pre-edit', visualLink: '/api/media/123456/pre-edit/visual', fileLink: '/api/media/123456/pre-edit' }
  ]

  const original = files.find(file => file.kind === 'original')
  const preEdit = files.find(file => file.kind === 'pre-edit')
  const final = files.find(file => file.kind === 'final')

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' component='h1'>
            {details.speaker}
          </Typography>
          <Typography className={classes.title} color='textSecondary'>
            {details.talk}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {`${details.subtitle} - ${details.time}`}
          </Typography>
          {!original &&
            <>
            <Typography className={classes.pos} color='textSecondary'>
              Upload Original
            </Typography>
              <UploadMp3 mediaItemId={mediaItemId} kind='original' />}
            </>}
          {original && preEdit && !final &&
            <>
            <Typography className={classes.pos} color='textSecondary'>
              Upload Final
            </Typography>
            <UploadMp3 mediaItemId={mediaItemId} kind='final' />
            </>}
        </CardContent>
        <CardActions>
          {/* <UploadMp3 /> */}
        </CardActions>
      </Card>
      {/* <StagePanel
        mediaItemId={mediaItemId}
        kind='original'
        details={files.find(file => file.kind === 'original')}
      /> */}
      {/* <StagePanel
        mediaItemId={mediaItemId}
        kind='pre-edit'
        details={files.find(file => file.kind === 'pre-edit')}
      />
      <StagePanel
        mediaItemId={mediaItemId}
        kind='compand'
        details={files.find(file => file.kind === 'compand')}
      /> */}
    </div>
  )
}
