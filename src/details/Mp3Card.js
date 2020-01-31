import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import GetAppIcon from '@material-ui/icons/GetApp'
import Tooltip from '@material-ui/core/Tooltip'

import axios from 'axios'

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
    width: '100%',
    height: '165px',
    // objectFit: 'cover'
    // paddingTop: '56.25%', // 16:9
  },
  downloadIcon: {
    verticalAlign: 'middle'
  },
  title: {
    fontSize: 14
  },
  pos: {
    fontSize: 14,
    marginBottom: 12
  }
}))

const Mp3Card = ({ mediaScope, title }) => {
  const classes = useStyles()

  const mp3URL = `/api/media/content/${mediaScope.find(file => file.indexOf('mp3') > 0)}`
  const pngURL = `/api/media/content/${mediaScope.find(file => file.indexOf('png') > 0)}`
  const mp3FileName = mediaScope.find(file => file.indexOf('mp3') > 0)

  return (
    <div>
      {mediaScope &&
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {title}
            <Tooltip title="Download"
              onClick={() => {
                console.log('clicked')
                axios({
                  url: mp3URL,
                  method: 'GET',
                  responseType: 'blob', // important
                }).then((response) => {
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', mp3FileName);
                  document.body.appendChild(link);
                  link.click();
                });
              }}
            >
              <GetAppIcon fontSize='large' className={classes.downloadIcon} />
            </Tooltip>
          </Typography>
          <CardMedia
            className={classes.media}
            image={pngURL}
            title={title}
            src='img'
          />
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>}
    </div>
  )
}

export default Mp3Card
