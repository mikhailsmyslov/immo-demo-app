import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Box,
  Avatar,
  Grid
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { ProfileItem } from '../store/profile'
import { capitalize } from 'lodash-es'

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: 'auto'
  },
  dFlexCentered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 20
  }
})

interface ILine {
  name: string
  value?: string
  as?: string
}
const Line: React.FC<ILine> = ({ name, value = '' }) => {
  if (!name) return null
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Typography color="textSecondary" variant="body2">
          {`${capitalize(name)}:`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
    </Grid>
  )
}

const Profile: React.FC<ProfileItem> = (props) => {
  const {
    firstName,
    lastName,
    jobTitle,
    companyName,
    county,
    city,
    avatar,
    phone,
    email
  } = props

  const { t } = useTranslation()
  const fullName = [firstName, lastName].join(' ')
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box className={classes.dFlexCentered}>
              <Avatar alt={fullName} src={avatar} className={classes.avatar} />
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              <a href={`tel:${email}`}>{phone}</a>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Line name={t('name')} value={fullName} />
            <Line
              name={t('jobDescription')}
              value={t('workAsInCompany', { jobTitle, companyName })}
            />
            <Line
              name={t('placeOfResidense')}
              value={[county, city].join(', ')}
            />
            <Line name={t('email')} value={email} as="email" />
            <Line name={t('phone')} value={phone} as="phone" />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  )
}

export default Profile
