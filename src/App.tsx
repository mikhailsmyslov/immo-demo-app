import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import {
  createStyles,
  makeStyles,
  Theme,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import Layout from './components/Layout'
import { SnackbarProvider } from 'notistack'
import ErrorBoundary from './components/ErrorBoundary'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242'
    },
    secondary: {
      main: '#ff9100'
    }
  }
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      flex: '1 1',
      marginTop: 64
    }
  })
)

const App = () => {
  const classes = useStyles()
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <BrowserRouter>
            <ErrorBoundary>
              <Layout>
                <Header />
                <Main className={classes.main} />
                <Footer />
              </Layout>
            </ErrorBoundary>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
