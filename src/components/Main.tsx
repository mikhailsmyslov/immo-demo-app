import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import cn from 'classnames'
import { Route, Switch } from 'react-router-dom'
import navigation from '../navigation'
import ProfileContainer from './ProfileContainer'
import NewsContainer from './NewsContainer'
import Home from './Home'
import Page404 from './Page404'
import LoginContainer from './LoginContainer'
import { isAppLoadingSelector } from '../selectors'
import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

interface Props {
  className?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem'
    },
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

const Main = (props: Props) => {
  const { className } = props
  const classes = useStyles()
  const isLoading = useSelector(isAppLoadingSelector)
  const rootClasses = cn(
    {
      [classes.root]: true
    },
    className
  )
  if (isLoading)
    return (
      <Container className={classes.screenSaver} data-testid="main">
        <CircularProgress color="secondary" />
      </Container>
    )
  return (
    <Container className={rootClasses} data-testid="main">
      <Switch>
        <ProtectedRoute
          path={navigation.news.pathname}
          component={NewsContainer}
        />
        <ProtectedRoute
          path={navigation.profile.pathname}
          component={ProfileContainer}
        />
        <Route path={navigation.login.pathname} component={LoginContainer} />
        <Route exact path={navigation.main.pathname} component={Home} />
        <Route path="*" component={Page404} />
      </Switch>
    </Container>
  )
}

export default Main
