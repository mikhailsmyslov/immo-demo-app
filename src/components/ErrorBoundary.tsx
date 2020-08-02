import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import logger from '../helper/logger'
import { Container, Typography } from '@material-ui/core'
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const log = logger('Error')

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1',
    height: '100%'
  },
  errorIcon: {
    width: 100,
    height: 100,
    color: 'grey'
  }
})

interface IProps extends WithStyles<typeof styles> {
  children?: React.ReactNode
}

interface IState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<IProps & WithTranslation, IState> {
  constructor(props: IProps & WithTranslation) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    log(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children, t, classes } = this.props
    if (hasError) {
      return (
        <Container className={classes.root}>
          <ErrorOutlineIcon className={classes.errorIcon} />
          <Typography variant="h5" gutterBottom style={{ color: 'grey' }}>
            {t('errors.oops')}
          </Typography>
        </Container>
      )
    }

    return children
  }
}

const WithTranslationWrapped = withTranslation()(ErrorBoundary)
export default withStyles(styles)(WithTranslationWrapped)
