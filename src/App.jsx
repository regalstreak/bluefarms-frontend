import React from 'react';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MainRouter from './screens/MainRouter';
import green from "@material-ui/core/colors/green";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3147B6"
    },
    secondary: {
      main: "#202833"
    },
    success: {
      main: green[500],
      contrastText: "#fff"
    }
  }
});


export default () => (
  <MuiThemeProvider theme={theme}>
    <MainRouter />
  </MuiThemeProvider>
);
