import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  CardMedia,
  Box
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { NewsItem } from '../store/news'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 900,
    margin: '1.5rem auto'
  },
  mb1: {
    marginBottom: '1rem'
  },
  media: {
    height: 200
  },
  cardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem'
  },
  athoredByText: {
    fontSize: 'smaller',
    marginLeft: '0.5rem',
    textAlign: 'right'
  }
})

const News: React.FC<NewsItem> = (props) => {
  const {
    sourceName,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt
  } = props

  const { t } = useTranslation()

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography
          className={classes.mb1}
          color="textSecondary"
          variant="body1"
        >
          {sourceName}
        </Typography>
        <Typography className={classes.mb1} variant="body2" component="p">
          {description}
        </Typography>
        <CardMedia className={classes.media} image={urlToImage} title={title} />
      </CardContent>
      <CardActions className={classes.cardBottom}>
        <Button size="small" href={url}>
          {t('more')}
        </Button>
        <Box>
          <Typography
            color="textSecondary"
            className={classes.athoredByText}
            component="p"
          >
            {t('authoredBy', { author })}
          </Typography>
          <Typography
            color="textSecondary"
            className={classes.athoredByText}
            component="p"
          >
            {t('publishedAt', { date: publishedAt })}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  )
}

export default News
