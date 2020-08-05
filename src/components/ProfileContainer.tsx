import React, { useEffect } from 'react'
import Profile from './Profile'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { actions } from '../store'
import {
  Container,
  LinearProgress,
  Typography,
  Divider
} from '@material-ui/core'
import { profileSelector, userNameSelector } from '../selectors'
import { useTranslation } from 'react-i18next'
import logger from '../helper/logger'
import useErrorHandler from '../hooks/useErrorHandler'

const log = logger('profile')

interface Props {
  children?: React.ReactElement
}

const ProfileContainer: React.FC<Props> = (props) => {
  const { data: profile, isLoading: isFetchingProfile } = useSelector(
    profileSelector
  )
  const userName = useSelector(userNameSelector)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  useEffect(() => {
    if (isEmpty(profile)) {
      dispatch(actions.fetchProfile()).catch((err: Error) => {
        log(err)
        handleError(err)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters>
      <Typography
        variant="h5"
        style={{ marginBottom: '2rem', marginLeft: '2rem' }}
      >
        {t('profileOfUser', { userName })}
        <Divider />
      </Typography>
      {isFetchingProfile ? (
        <LinearProgress style={{ height: 5, width: '50%', margin: 'auto' }} />
      ) : isEmpty(profile) ? null : (
        <Profile {...profile} />
      )}
    </Container>
  )
}

export default ProfileContainer
