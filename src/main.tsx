import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";

import "./assets/scss/index.scss";
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';
export const themeApp = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const Router = (window as any).cordova ? HashRouter : BrowserRouter;
ReactDOM.createRoot(document.getElementById("root")!).render(

  <Provider store={store}>
    <CssBaseline>
      <ThemeProvider theme={themeApp}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </CssBaseline>
  </Provider>

);
