import React from 'react'
import { Container } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import cn from 'classnames'
import {
  // withRouter,
  Route,
  Switch
  // Redirect,
  // useHistory
} from 'react-router-dom'
import navigation from '../navigation'
import Profile from './Profile'
import NewsContainer from './NewsContainer'
import Home from './Home'
import Page404 from './Page404'
import LoginContainer from './LoginContainer'

interface Props {
  className?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem'
    }
  })
)

const Main = (props: Props) => {
  const { className } = props
  const classes = useStyles()
  const rootClasses = cn(
    {
      [classes.root]: true
    },
    className
  )
  return (
    <Container className={rootClasses}>
      <Switch>
        <Route path={navigation.news.pathname} component={NewsContainer} />
        <Route path={navigation.profile.pathname} component={Profile} />
        <Route path={navigation.login.pathname} component={LoginContainer} />
        <Route exact path={navigation.main.pathname} component={Home} />
        <Route path="*" component={Page404} />
      </Switch>
    </Container>
  )
}

export default Main
