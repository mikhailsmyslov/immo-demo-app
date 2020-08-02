import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import LoginForm from './LoginForm'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { actions } from '../store'
import logger from '../helper/logger'

const log = logger('login')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    form: {
      width: 400,
      maxWidth: '80vw'
    },
    header: {
      marginBottom: '2rem'
    }
  })
)

const LoginContainer = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onSubmit = (params: any) => dispatch(actions.performLogin(params))
  const onFailure = (err: Error) => {
    log(err)
    enqueueSnackbar(err.message, { variant: 'error' })
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        {t('authorization')}
      </Typography>
      <LoginForm
        className={classes.form}
        onSubmit={onSubmit}
        onFailure={onFailure}
      />
    </Container>
  )
}

export default LoginContainer
