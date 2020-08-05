import React, { useEffect } from 'react'
import {
  Route,
  useHistory,
  RouteComponentProps,
  RouteProps,
  useLocation
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuthSelector } from '../selectors'
import navigation from '../navigation'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

const ProtectedRoute: React.FC<
  RouteProps & { component: React.ComponentType }
> = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(isAuthSelector)
  const histrory = useHistory()
  const { pathname } = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  useEffect(() => {
    if (isAuth === false) {
      enqueueSnackbar(t('errors.unauthorized'), { variant: 'warning' })
      histrory.push(navigation.login.pathname, { from: pathname })
    }
  }, [enqueueSnackbar, histrory, isAuth, pathname, t])

  if ([null, false].includes(isAuth)) return null

  return (
    <Route
      render={(props: RouteComponentProps) => <Component {...props} />}
      {...rest}
    />
  )
}

export default ProtectedRoute
