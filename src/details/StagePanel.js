import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

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

const StagePanel = ({ expanded, kind, mediaItemId }) => {
  const classes = useStyles()

  return (

    <ExpansionPanel expanded={expanded}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={classes.heading}>Upload Original</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <UploadMp3 mediaItemId={mediaItemId} kind={kind} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default StagePanel
