import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { useHistory, useLocation } from 'react-router-dom'
import navigation from '../navigation'
import { actions } from '../store'
import { AxiosResponse } from 'axios'

interface ErrorMapper {
  [key: string]: string
}

const mapErrorStatusToMessage: ErrorMapper = {
  '404': 'errors.pageNotFound',
  '401': 'errors.unauthorized',
  '422': 'errors.unprocessableEntity'
}

const UNKNOWN_ERROR = 'oops'

interface IError extends Error {
  response?: AxiosResponse
  isAxiosError?: boolean
}

const parseError = (err: IError) => {
  const { response, message = '' } = err
  const { status = '' } = response || {}
  if (err.isAxiosError && isEmpty(response)) {
    return { status: 503, msg: 'network' }
  }
  const msg =
    mapErrorStatusToMessage[String(status)] || message || UNKNOWN_ERROR
  return { status, msg }
}

export default () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const history = useHistory()

  const handleError = (err: IError) => {
    const { status, msg } = parseError(err)
    if (status === 401) {
      history.replace(navigation.login.pathname, { from: pathname })
      dispatch(actions.clearSession())
    }
    enqueueSnackbar(t(msg), { variant: 'error' })
  }
  return handleError
}
