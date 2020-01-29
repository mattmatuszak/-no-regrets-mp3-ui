import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import axios from 'axios'

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
    minWidth: 275,
    margin: theme.spacing(5)
  },
  media: {
    width: '800px',
    height: '525px',
    // objectFit: 'cover'
    // paddingTop: '56.25%', // 16:9
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
  const [mediaItem, updateMediaItem] = useState({ fetched: false })
  const details = itemsMap[mediaItemId] || {}
  const classes = useStyles()

  useEffect(() => {
    if (!mediaItem.fetched) {
      axios.get(`/api/media/${mediaItemId}`)
        .then(mediaItemResult => mediaItemResult.data)
        .then(mediaItem => updateMediaItem({ ...mediaItem, fetched: true, failure: false }))
        .catch(err => {
          if (err.response.status === 404) {
            updateMediaItem({ fetched: true })
          } else {
            console.log(err)
            updateMediaItem({ fetched: true, failure: true })
          }
        })
    }
  }, [mediaItemId, mediaItem.fetched])

  // const files = [
  //   { kind: 'original', visualLink: '/api/media/123456/original/visual', fileLink: '/api/media/123456/original' },
  //   { kind: 'pre-edit', visualLink: '/api/media/123456/pre-edit/visual', fileLink: '/api/media/123456/pre-edit' }
  // ]

  // const original = files.find(file => file.kind === 'original')
  // const preEdit = files.find(file => file.kind === 'pre-edit')
  // const final = files.find(file => file.kind === 'final')

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
          {mediaItem.failure &&
            <Typography className={classes.pos} color='textSecondary'>
              Big errors, please fix me!!
            </Typography>}
          {!mediaItem.failure && !mediaItem.original &&
            <>
              <Typography className={classes.pos} color='textSecondary'>
                Upload Original
              </Typography>
              <UploadMp3 mediaItemId={mediaItemId} kind='original' />
            </>}
        </CardContent>
        <CardActions>
          {/* <UploadMp3 /> */}
        </CardActions>
      </Card>
      {mediaItem.original &&
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            Original
          </Typography>
          <CardMedia
            className={classes.media}
            image={`/api/media/content/10003-original.png`}
            title="Original"
            src='img'
          />
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>}
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
