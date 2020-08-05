import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    screenSaver: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      flex: '1 1'
    }
  })
)

const ScreenSaver = () => {
  const classes = useStyles()
  return (
    <Container className={classes.screenSaver} data-testid="screenSaver">
      <CircularProgress color="secondary" />
    </Container>
  )
}

export default ScreenSaver
