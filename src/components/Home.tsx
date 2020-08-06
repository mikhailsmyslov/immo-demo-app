import React, { useEffect } from 'react'
import {
  Container,
  Typography,
  Divider,
  LinearProgress
} from '@material-ui/core'
import Carousel from './Carousel'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { isAuthSelector, userNameSelector, imagesSelector } from '../selectors'
import { isEmpty } from 'lodash-es'
import { actions } from '../store'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import logger from '../helper/logger'

const log = logger('home')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    title: {
      marginBottom: '2rem'
    },
    authText: {
      marginBottom: '2rem'
    }
  })
)

const Home = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const isAuth = useSelector(isAuthSelector)
  const userName = useSelector(userNameSelector)

  const { data: carouselItems, isLoading: isFetchingImages } = useSelector(
    imagesSelector
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isEmpty(carouselItems)) {
      dispatch(actions.fetchImages()).catch((err: Error) => {
        log(err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className={classes.container} disableGutters>
      <Typography variant="h5" className={classes.title}>
        {isAuth ? t('wellcomeUser', { userName }) : t('wellcomeGuest')}
        <Divider />
      </Typography>
      {isAuth && (
        <Typography
          className={classes.authText}
          color="textSecondary"
          variant="body2"
        >
          {t('wellcomeUserAuthText')}
        </Typography>
      )}
      {isFetchingImages ? (
        <LinearProgress style={{ height: 5, width: '50%' }} />
      ) : isEmpty(carouselItems) ? null : (
        <Carousel items={carouselItems} />
      )}
    </Container>
  )
}

export default Home
