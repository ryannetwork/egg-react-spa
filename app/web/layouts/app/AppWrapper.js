import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'
import AppFrame from './AppFrame'
import theme from '../../styles/theme'

function AppWrapper (props) {
  const { children } = props

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AppFrame>{children}</AppFrame>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppWrapper
