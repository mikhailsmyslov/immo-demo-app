import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TelegramIcon from '@material-ui/icons/Telegram'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'static'
    }
  })
)

const Icons = [
  GitHubIcon,
  FacebookIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon
]

const Footer = () => {
  const classes = useStyles()
  return (
    <AppBar className={classes.appBar} component="footer">
      <Toolbar variant="dense" disableGutters>
        {Icons.map((Icon, index) => (
          <IconButton color="inherit" key={index}>
            <Icon />
          </IconButton>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default Footer
