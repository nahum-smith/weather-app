import React from 'react'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Root from './containers/Root'

const theme = createMuiTheme()

function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  )
}

export default App
