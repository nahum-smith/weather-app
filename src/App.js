import React from 'react'
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
