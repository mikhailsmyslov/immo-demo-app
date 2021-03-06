import React, { useState, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import {
  Tabs,
  Tab,
  CircularProgress,
  Hidden,
  Zoom,
  Fab
} from '@material-ui/core'
import navigation, { navBarTabsSet } from '../navigation'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../store'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined'
import { isAppLoadingSelector, isAuthSelector } from '../selectors'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import useErrorHandler from '../hooks/useErrorHandler'
import logger from '../helper/logger'

const log = logger('header')

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
    },
    scrollTopButton: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      opacity: 0.75,
      zIndex: 1200
    }
  })
)

const HideOnScroll = (props: Props) => {
  const { children } = props
  const trigger = useScrollTrigger({ target: document.body })

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
  const { t } = useTranslation()
  const handleClick = (pathname: string) => () => history.push(pathname)
  return (
    <SwipeableDrawer open={isOpen} onClose={onOpen} onOpen={onClose}>
      <div
        style={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List style={{ padding: 0 }}>
          {navBarTabsSet.map(({ pathname, text }) => (
            <Fragment key={pathname}>
              <ListItem button key={pathname} onClick={handleClick(pathname)}>
                <ListItemIcon>
                  <KeyboardArrowRightOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t(text).toUpperCase()}
                  style={{ marginLeft: '5%' }}
                />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  )
}

const ScrollTop = (props: Props) => {
  const { children } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: document.body,
    disableHysteresis: true,
    threshold: 200
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrollTopButton}
      >
        {children}
      </div>
    </Zoom>
  )
}

const Header = (props: Props) => {
  const classes = useStyles()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const { t } = useTranslation()
  const { isAppLoading } = useSelector(isAppLoadingSelector)
  const history = useHistory()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const isAuth = useSelector(isAuthSelector)
  const handleError = useErrorHandler()
  const handleLogoutBtnClick = async () => {
    try {
      dispatch(actions.performLogout())
      history.push(navigation.main.pathname)
    } catch (err) {
      log(err)
      handleError(err)
    }
  }
  const handleLoginBtnClick = () => history.push(navigation.login.pathname)

  const handleAuthButtonClick = isAuth
    ? handleLogoutBtnClick
    : handleLoginBtnClick

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
            <Hidden smDown>
              <Tabs
                className={classes.tabs}
                value={tabsValue}
                selectionFollowsFocus={false}
              >
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
            </Hidden>
            <Button
              color="inherit"
              onClick={handleAuthButtonClick}
              style={{ marginLeft: 'auto' }}
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
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default Header
