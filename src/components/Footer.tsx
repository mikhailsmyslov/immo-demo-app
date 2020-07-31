import React from 'react'
import { Container, Box } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.main,
      height: 64,
      backgroundColor: theme.palette.primary.main
    }
  })
)

const Footer = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root} disableGutters={true} maxWidth={false}>
      <Box>Footer</Box>
    </Container>
  )
}

export default Footer
