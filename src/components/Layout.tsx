import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import routes from '../navigation'
import { find } from 'lodash-es'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { TOKEN_KEY } from '../constants'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import navigation from '../navigation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      minWidth: '100vw',
      minHeight: '100vh',
      maxWidth: '100vw',
      height: '100%',
      width: '100%'
    }
  })
)

const Layout = (props: { children: any }) => {
  const { children } = props
  const { pathname } = useLocation()
  const history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    const tKey = find(routes, { pathname })?.text
    document.title = tKey ? t([tKey, 'IMMO']) : 'IMMO'
  }, [pathname, t])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    try {
      dispatch(actions.validateSession(token))
    } catch (e) {
      history.replace(navigation.main.pathname)
    }
  }, [dispatch, history])

  return (
    <Container className={classes.root} disableGutters={true} maxWidth={false}>
      {children}
    </Container>
  )
}

export default Layout
