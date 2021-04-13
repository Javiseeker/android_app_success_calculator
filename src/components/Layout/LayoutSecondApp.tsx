import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Icon } from "@material-ui/core";
import "./Layout.css";

import Header from "../Header/Header";
import ResultSecondApp from "../Result/ResultSecondApp";
import SearchApp from '../SearchApp';
import useMedia from "../../hooks/useMedia";
import CircularProgress from "@material-ui/core/CircularProgress";

const ailabKey: string = "5d36d5e2-9941-11eb-a55d-4e6f62601c61";

const LayoutSecondApp: React.FC = () => {
  
  const [appName, setAppName] = useState("");

  const onChangeAppName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const ActivateMediaQueries = () => {
    return {
      isSm: useMedia("(max-width: 640px)"),
      isMd: useMedia("(min-width: 641px)"),
    };
  };

  const windowWidth = ActivateMediaQueries();
  let renderedLayout = null;

  if (windowWidth.isMd) {
    renderedLayout = (
      <React.Fragment>
        <div className="body-container">
          <div className="form-container">
            <Paper
              className="paper-module"
              elevation={15}
              style={{ borderRadius: "15px" }}
            >
              <div className="paper-title">
                <Header title="Mobile App Analyzer" />
              </div>

              <form
                className="form-module"
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <div className="app-name">
                  <TextField
                    id="app-textfield"
                    label="Application Name"
                    variant="outlined"
                    value={appName}
                    onChange={onChangeAppName}
                    style={{ width: "30%" }}
                  />
                </div>
                <div className="analyze-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>poll</Icon>}
                    disabled={/^\s*$/.test(appName)}
                  >
                    Analyze
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
          <SearchApp q={appName} />
        </div>
      </React.Fragment>
    );
  }
  if (windowWidth.isSm) {
    renderedLayout = (
      <React.Fragment>
        <div className="body-container">
          <div className="form-container">
            <Paper
              className="paper-module"
              elevation={15}
              style={{ borderRadius: "15px" }}
            >
              <div className="paper-title">
                <Header title="A.A.A" />
              </div>

              <form
                className="form-module"
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <div className="app-text">
                  <TextField
                    id="app-textfield"
                    label="Application Name"
                    variant="outlined"
                    value={appName}
                    onChange={onChangeAppName}
                    style={{ width: "30%" }}
                  />
                </div>
                <div className="analyze-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>poll</Icon>}
                    disabled={/^\s*$/.test(appName)}
                  >
                    Analyze
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
          <SearchApp q={appName} />
        </div>
      </React.Fragment>
    );
  }
  return renderedLayout;
};

export default LayoutSecondApp;
