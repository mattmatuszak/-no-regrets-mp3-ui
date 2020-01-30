import React, { useCallback, useState } from 'react'
import Card from '@material-ui/core/Card'
import PublishRoundedIcon from '@material-ui/icons/PublishRounded'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error'

import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  '& > *': {
    margin: theme.spacing(1),
    width: theme.spacing(16),
    height: theme.spacing(16)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  dropzone: {
    width: '100%'
  },
  cardFailure: {    
    backgroundColor: 'Red'
  },
  cardSuccess: {

  },
  title: {
    fontSize: 14
  },
  pos: {
    fontSize: 14,
    marginBottom: 12
  }
}))

const UploadMp3s = ({ mediaItemId, kind }) => {
  const classes = useStyles()
  const [uploadState, updateState] = useState({ uploading: false, uploaded: false, failure: false })
  const onDrop = useCallback(acceptedFiles => {
    updateState({ file: acceptedFiles[0], uploading: true })
    console.log(acceptedFiles)
    const data = new window.FormData()
    data.append('file', acceptedFiles[0])
    data.append('myName', 'test.mp3')
    axios.post(`/api/media/${mediaItemId}/${kind}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(result => updateState({ uploaded: true }))
    .catch(err => updateState({ failure: true }))
  }, [mediaItemId])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  if (uploadState.failure) {
    return <ErrorIcon fontSize='large' color='error' />
  }
  if (uploadState.uploaded) {
    return <CheckCircleIcon fontSize='large' color='action' />
  }
  if (uploadState.uploading) {
    return (
      <LinearProgress className={classes.root} />
    )
  }
  return (
    <div {...getRootProps()} className={classes.dropzone}>
      <input {...getInputProps()} />
      <Card className={classes.card}>
        <Typography className={classes.title} align='center' color='textSecondary'>
          Drag 'n' drop some files here, or click to select files
        </Typography>
        <Typography className={classes.title} align='center' color='textSecondary'>
          <PublishRoundedIcon color='primary' fontSize='large' />
        </Typography>
      </Card>
    </div>
  )
}

export default UploadMp3s
