import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Tabs, Tab } from '@material-ui/core'
import navigation, { navBarTabsSet } from '../navigation'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { PROTECTED_TYPE } from '../constants'

interface Props {
  children?: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

const HideOnScroll = (props: Props) => {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const Header = (props: Props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const history = useHistory()
  const location = useLocation()
  const isAuth = useSelector((state: RootState) => state.app.isAuth)
  const handleAuthButtonClick = () => {
    history.push(navigation.login.pathname)
  }
  return (
    <HideOnScroll {...props}>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Tabs className={classes.tabs} value={location.pathname}>
            {navBarTabsSet.map(({ pathname, text, type }) => {
              return (
                <Tab
                  key={pathname}
                  component={Link}
                  to={pathname}
                  label={t(text)}
                  value={pathname}
                  disabled={type === PROTECTED_TYPE && !isAuth}
                />
              )
            })}
          </Tabs>
          <Button color="inherit" onClick={handleAuthButtonClick}>
            {t('login')}
          </Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default Header
