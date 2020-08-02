import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Tabs, Tab, CircularProgress } from '@material-ui/core'
import navigation, { navBarTabsSet } from '../navigation'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, actions } from '../store'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined'
import { aisAppLoadingSelector } from '../selectors'

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

interface ISideMenu {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const SideMenu: React.FC<ISideMenu> = (props) => {
  const { isOpen = false, onOpen = () => {}, onClose = () => {} } = props
  const history = useHistory()
  const handleClick = (pathname: string) => () => history.push(pathname)
  return (
    <SwipeableDrawer open={isOpen} onClose={onOpen} onOpen={onClose}>
      <div
        style={{ width: 250, maxWidth: '75%' }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List>
          {navBarTabsSet.map(({ pathname, text }) => (
            <ListItem button key={pathname} onClick={handleClick(pathname)}>
              <ListItemIcon>
                <KeyboardArrowRightOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={text} style={{ marginLeft: '5%' }} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </SwipeableDrawer>
  )
}

const Header = (props: Props) => {
  const classes = useStyles()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const { t } = useTranslation()
  const { isAppLoading } = useSelector(aisAppLoadingSelector)
  const history = useHistory()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const isAuth = useSelector((state: RootState) => state.app.isAuth)
  const handleAuthButtonClick = () => {
    if (!isAuth) {
      return history.push(navigation.login.pathname)
    }
    dispatch(actions.performLogout())
  }
  const tabsValue = pathname === navigation.login.pathname ? false : pathname
  return (
    <>
      <SideMenu isOpen={isMenuOpen} onOpen={toggleMenu} onClose={toggleMenu} />
      <HideOnScroll {...props}>
        <AppBar data-testid="header">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Tabs className={classes.tabs} value={tabsValue}>
              {navBarTabsSet.map(({ pathname, text }) => {
                return (
                  <Tab
                    key={pathname}
                    component={Link}
                    to={pathname}
                    label={t(text)}
                    value={pathname}
                    disabled={isAppLoading}
                  />
                )
              })}
            </Tabs>
            <Button
              color="inherit"
              onClick={handleAuthButtonClick}
              disabled={isAppLoading}
            >
              {isAppLoading ? (
                <CircularProgress color="secondary" size={20} />
              ) : isAuth ? (
                t('logout')
              ) : (
                t('login')
              )}
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  )
}

export default Header
