import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";

const theme = createMuiTheme({
  palette: {
    primary:{
      main: "#00acc1"
    },
    secondary: {
      main: "#ffe0b2",
    },
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="main-body">
        <header className="main-header"></header>
        <main className="main-content">
          <Layout />
        </main>
        <footer className="main-footer">
          <Footer />
        </footer>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
