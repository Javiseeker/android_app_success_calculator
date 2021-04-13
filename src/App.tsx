import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import NavigationBar from "./components/NavigationBar";
import About from "./components/About/About";
import Layout from "./components/Layout/Layout";
import LayoutSecondApp from "./components/Layout/LayoutSecondApp";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00acc1",
    },
    secondary: {
      main: "#ffe0b2",
    },
  },
});

const App: React.FC = () => {
 

  return (
    <MuiThemeProvider theme={theme}>
      <div className="main-body">
        
        <header className="main-header">
          <NavigationBar />
        </header>
        <main className="main-content">
          <Switch>
            <Route exact path="/">
              <About />
            </Route>
            <Route path="/review-analysis">
              <Layout />
            </Route>
            <Route path="/app-analysis">
              <LayoutSecondApp />
            </Route>
            <Route path="/**">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <footer className="main-footer">
          <Footer />
        </footer>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
