import React from 'react'
import NavBar from './components/NavBar'
import { Container } from '@material-ui/core'
import Footer from './components/Footer'
import Content from './components/Content'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './store'
import { Provider } from 'react-redux'
import './styles/App.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      minWidth: '100vw',
      minHeight: '100vh',
      maxWidth: '100vw',
      height: '100%',
      width: '100%'
    },
    content: {
      flex: '1 1',
      marginTop: 64
    }
  })
)

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production'
})

const App = () => {
  const classes = useStyles()
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container
          className={classes.root}
          disableGutters={true}
          maxWidth={false}
        >
          <NavBar />
          <Content className={classes.content} />
          <Footer />
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default App
