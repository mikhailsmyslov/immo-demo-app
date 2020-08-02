import React, { useEffect } from 'react'
import News from './News'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { actions } from '../store'
import {
  Container,
  LinearProgress,
  Typography,
  Divider
} from '@material-ui/core'
import { NewsItem } from '../store/news'
import { newsSelector } from '../selectors'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import logger from '../helper/logger'

const log = logger('news')

interface Props {
  children?: React.ReactElement
}

const NewsContainer: React.FC<Props> = (props) => {
  const { data: news, isLoading } = useSelector(newsSelector)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (isEmpty(news)) {
      dispatch(actions.fetchNews()).catch((err: Error) => {
        log(err)
        enqueueSnackbar(err.message, { variant: 'error' })
      })
    }
  }, [dispatch, enqueueSnackbar, news])

  return (
    <Container disableGutters>
      <Typography
        variant="h2"
        style={{ marginBottom: '2rem', marginLeft: '2rem' }}
      >
        {t('news')}
        <Divider />
      </Typography>
      {isLoading ? (
        <LinearProgress style={{ height: 5, width: '50%', margin: 'auto' }} />
      ) : isEmpty(news) ? null : (
        news.map((newsItem: NewsItem) => <News {...newsItem} />)
      )}
    </Container>
  )
}

export default NewsContainer
