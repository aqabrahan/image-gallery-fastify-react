import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Home from './view/home';
const customTheme = createMuiTheme({
  palette: {
    background: {
      default: "#cecece"
    }
  }
});
const App = () => (
  <MuiThemeProvider theme={customTheme}>
      <CssBaseline />
      <Home />
  </MuiThemeProvider>
);

export default App;

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
