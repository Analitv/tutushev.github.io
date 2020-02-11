import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { HashRouter } from 'react-router-dom'

import { store } from "./configureStore";

import { App } from './App'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e5e5e5",
      main: "#727272",
      dark: "#363839",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff5e50",
      main: "#e41e26",
      dark: "#a90000",
      contrastText: "#fff",
    },
  },
})

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
)

render(<Root />, document.getElementById('root'))
