import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import routes from '../navigation'
import { find } from 'lodash-es'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { TOKEN_KEY } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store'
import logger from '../helper/logger'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { isAuthSelector, isAppLoadingSelector } from '../selectors'
import { isNull } from 'util'
import ScreenSaver from './ScreenSaver'

const log = logger('layout')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      minWidth: '100vw',
      minHeight: '100vh',
      maxWidth: '100%',
      background: 'whitesmoke'
    },
    main: {
      flex: '1 1',
      marginTop: 64
    }
  })
)

const Layout = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    const tKey = find(routes, { pathname })?.text
    document.title = tKey ? t([tKey, 'immo']) : 'immo'
  }, [pathname, t])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    dispatch(actions.validateSession(token)).catch((err: Error) => {
      log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const isAuth = useSelector(isAuthSelector)
  const isLoading = useSelector(isAppLoadingSelector)

  const shouldRenderMainContent = !isNull(isAuth) && !isLoading

  return (
    <Container className={classes.root} disableGutters={true} maxWidth={false}>
      <Header />
      {shouldRenderMainContent ? (
        <Main className={classes.main} />
      ) : (
        <ScreenSaver />
      )}
      <Footer />
    </Container>
  )
}

export default Layout
