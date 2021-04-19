import React, { useState } from "react";
import { Paper, TextField, Button, Icon } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./Layout.css";

import Header from "../Header/Header";
import SearchApps from "../SearchApps";
import useMedia from "../../hooks/useMedia";
import { useHistory } from "react-router-dom";

const LayoutSecondApp: React.FC = () => {
  const [appName, setAppName] = useState("");
  const [canAnalyze, setCanAnalyze] = useState(false);
  const [appsList, setAppsList] = useState([]);
  const [chosenApp, setChosenApp] = useState<any>({})
  const history = useHistory();
  const onChangeAppName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChosenApp({});
    setAppName(e.target.value);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push({
      pathname: '/app-analysis/results',
      state: {  // location state
        update: true,
        appToAnalyze: chosenApp
      },
    });
  };
  function onChangeAutocomplete(event: React.ChangeEvent<{}>, value: any) {
    event.preventDefault();
    setChosenApp(value);
  }

  const isDisabled = () =>{
    if(JSON.stringify(chosenApp) === '{}' || chosenApp === null){
      return true;
    } else{
      return !canAnalyze;
    }
    
  }

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
                <Header title="App Analyzer" />
              </div>

              <form
                className="form-module"
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <div className="app-name">
                  <Autocomplete
                    onChange={(event, value) => { setChosenApp(value) }}
                    id="combo-box-demo"
                    options={appsList}
                    getOptionLabel={(option: any) => option.name}
                    style={{ width: "30%" }}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        id="app-textfield"
                        label="Application Name"
                        variant="outlined"
                        value={appName}
                        onChange={onChangeAppName}
                      />}
                  />
                  <div className="search-apps-container">
                    <SearchApps
                      q={appName}
                      setAppsList={setAppsList}
                      setCanAnalyze={setCanAnalyze}
                    />
                  </div>
                </div>

                <div className="analyze-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>poll</Icon>}
                    disabled={isDisabled()}
                  >
                    Analyze
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
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
                <Header title="A.A" />
              </div>

              <form
                className="form-module"
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <div className="app-name">
                  <Autocomplete
                    onChange={(event, value) => { onChangeAutocomplete(event, value) }}
                    id="combo-box-demo"
                    options={appsList}
                    style={{ width: "30%" }}
                    renderInput={(params) =>
                      <TextField
                        {...params}
                        id="app-textfield"
                        label="Application Name"
                        variant="outlined"
                        value={appName}
                        onChange={onChangeAppName}
                      />}
                  />
                  <div className="search-apps-container">
                    <SearchApps
                      q={appName}
                      setAppsList={setAppsList}
                      setCanAnalyze={setCanAnalyze}
                    />
                  </div>
                </div>

                <div className="analyze-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>poll</Icon>}
                    disabled={!canAnalyze}
                  >
                    Analyze
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return renderedLayout;
};

export default LayoutSecondApp;

