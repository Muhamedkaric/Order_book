import React from 'react'
import { createTheme, styled, ThemeProvider } from '@mui/material'
import { SelectorsProvider } from './context/SelectorsContext'
import { AppBar } from './components/AppBar'
import { OrderTableContainer } from './components/ordertable/OrderTableContainer'
import { amber, blue } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: amber[200],
      dark: amber[400],
      contrastText: amber[100]
    },
    secondary: {
      main: blue[200],
      dark: blue[400],
      contrastText: blue[100]
    }
  }
})

const StyledRoot = styled('div')({
  padding: 2,
  backgroundColor: '#000',
  height: '100vh',
  boxSizing: 'border-box',
  overflow: 'hidden'
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SelectorsProvider>
        <StyledRoot>
          <AppBar />
          <OrderTableContainer />
        </StyledRoot>
      </SelectorsProvider>
    </ThemeProvider>
  )
}
