import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1 1',
      height: '100%'
    },
    notFoundNumber: {
      fontSize: '10rem',
      fontWeight: 1000,
      color: theme.palette.grey[500]
    },
    notFoundText: {
      color: theme.palette.grey[700]
    }
  })
)

const Page404 = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Container className={classes.root}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        className={classes.notFoundNumber}
      >
        404
      </Typography>
      <Typography variant="h6" gutterBottom className={classes.notFoundText}>
        {t('errors.pageNotFound')}
      </Typography>
    </Container>
  )
}

export default Page404
