// @ts-check
import React from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'
import { noop } from 'lodash'
import cn from 'classnames'
import * as Yup from 'yup'
import logger from '../helper/logger'
import { TextField, CircularProgress, Button } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    textField: {
      marginBottom: '1.5rem',
      width: '100%'
    },
    submitButton: {
      width: '100%',
      marginTop: '2rem'
    }
  })
)

const log = logger('login')

interface FormValues {
  login: string
  password: string
}

interface IProps {
  onSubmit?: () => void
  className?: string
}

const ChannelNameSchema = Yup.object().shape({
  login: Yup.string().required('required'),
  password: Yup.string().required('required')
})

const LoginForm: React.FC<IProps> = (props) => {
  const { onSubmit = noop, className } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const initialValues: FormValues = { login: '', password: '' }

  const handleSubmit = async (
    formValues: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { login, password } = formValues
    const { setSubmitting, resetForm } = actions
    try {
      log(login, password)
      setSubmitting(false)
      resetForm()
      onSubmit()
    } catch ({ message }) {
      setSubmitting(false)
      log(message)
    }
  }
  const formClasses = cn({ [classes.form]: true }, className)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ChannelNameSchema}
    >
      {({ isSubmitting }) => (
        <Form className={formClasses}>
          <Field
            name="login"
            label={t('loginForm.loginLabel')}
            type="text"
            className={classes.textField}
            placeholder={t('loginForm.loginPlaceholder')}
            disabled={isSubmitting}
            component={TextField}
          />
          <ErrorMessage name="login" />
          <Field
            name="password"
            label={t('loginForm.passwordLabel')}
            type="password"
            className={classes.textField}
            placeholder={t('loginForm.passwordPlaceholder')}
            disabled={isSubmitting}
            component={TextField}
          />
          <ErrorMessage name="password" />
          <Button
            type="submit"
            className={classes.submitButton}
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            size="large"
          >
            {isSubmitting ? (
              <CircularProgress color="secondary" />
            ) : (
              t('submit')
            )}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
