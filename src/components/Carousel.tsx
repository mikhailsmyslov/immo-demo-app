import React from 'react'
import ReactCarousel from 'react-material-ui-carousel'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  LinearProgress
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import cn from 'classnames'
import { isEmpty } from 'lodash-es'
import { useImage } from 'react-image'

interface ICarouselItem {
  id?: string
  title?: string
  description?: string
  imageUrl?: string
}

interface ICarouselItemProps extends ICarouselItem {
  className?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carouselRoot: {
      maxWidth: 900
    },
    carouselItem: {
      minHeight: 250,
      margin: 'auto',
      boxShadow: '5px 5px 20px grey',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    carouselItemText: {
      position: 'absolute',
      top: '5%',
      left: '5%',
      color: 'white',
      filter: 'drop-shadow(1px 1px 2px black)'
    },
    carouselItemImage: {
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: 400
    },
    submitButton: {
      width: '100%',
      marginTop: '2rem'
    }
  })
)

const CarouselItem: React.FC<ICarouselItemProps> = (props) => {
  const { title, description, imageUrl = '', className } = props
  const classes = useStyles()
  const itemClasses = cn(
    {
      [classes.carouselItem]: true
    },
    className
  )
  const { src, isLoading, error } = useImage({
    srcList: imageUrl,
    useSuspense: false
  })
  if (isLoading || error)
    return <LinearProgress style={{ height: 5, width: '100%' }} />
  return (
    <Card className={itemClasses}>
      <CardMedia
        className={classes.carouselItemImage}
        image={src}
        title={title}
        component="img"
      />
      <CardContent className={classes.carouselItemText}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  )
}

interface ICarousel {
  items?: ICarouselItem[]
  containerClassName?: string
  itemClassName?: string
}

const Carousel: React.FC<ICarousel> = (props) => {
  const classes = useStyles()

  const { items = [], containerClassName, itemClassName } = props

  const containerClasses = cn(
    {
      [classes.carouselRoot]: true
    },
    containerClassName
  )

  if (isEmpty(items)) return null

  return (
    <ReactCarousel
      indicatorProps={{ className: '', style: {} }}
      activeIndicatorProps={{ className: '', style: {} }}
      className={containerClasses}
    >
      {items.map((item: ICarouselItem, index) => (
        <CarouselItem
          key={item.id || index}
          {...item}
          className={itemClassName}
        />
      ))}
    </ReactCarousel>
  )
}

export default Carousel
