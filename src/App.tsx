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
import ResultSecondAppV3 from "./components/Result/ResultSecondAppV3";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00acc1",
    },
    secondary: {
      main: "#ff6f00",
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
            <Route exact path="/" component={About} />
            <Route path="/review-analysis" component={Layout} />
            <Route exact path="/app-analysis" component={LayoutSecondApp} />
            {/* <Route path="/app-analysis/results" component={ResultSecondApp}/> */}
            {/* <Route path="/app-analysis/results" component={ResultSecondAppV2}/> */}
            <Route path="/app-analysis/results" component={ResultSecondAppV3}/>
            <Route path="/**" component={NotFound} />
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
