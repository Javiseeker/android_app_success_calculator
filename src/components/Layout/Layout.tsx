import React from "react";
import { Paper } from "@material-ui/core";

import uruitLogo from "../../assets/uruitlogo.jfif";
import mandalorianLogo from "../../assets/mandalorianlogo.png";

import CSS from "csstype";
import "./Layout.css";

import Image from "../Utility/Image/Image";
import Header from "../Header/Header";
import Form from "../Form/Form";
import Result from "../Result/Result";
import Footer from "../Footer/Footer";

import useMedia from "../../hooks/useMedia";

const Layout = () => {
  const ActivateMediaQueries = () => {
    return {
      isSm: useMedia("(max-width: 640px)"),
      isMd: useMedia("(min-width: 641px) and (max-width: 1280px)"),
      isLg: useMedia("(min-width: 1281px)"),
    };
  };
  const windowWidth = ActivateMediaQueries();

  let renderedLayout = null;
  if (windowWidth.isLg) {
    renderedLayout = (
      <React.Fragment>
        <div className="body-container">
          <div className="form-container">
            <Paper className="paper-module" elevation={15}>
              <Header title="Mobile App Review Analyzer" />
              <Form style={{ width: "95%" }} />
            </Paper>
          </div>

          <div className="result-container">
            <Paper className="paper-module" elevation={15}>
              <Result />
            </Paper>
          </div>
        </div>
      </React.Fragment>
    );
  }
  if (windowWidth.isMd) {
    renderedLayout = (
      <React.Fragment>
        <div className="body-container">
          <div className="form-container">
            <Paper className="paper-module" elevation={15}>
              <Header title="Mobile App Review Analyzer" />
              <Form style={{ width: "95%" }} />
            </Paper>
          </div>
          <div className="result-container">
            <Paper className="paper-module" elevation={15}>
              <Result />
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
            <Paper className="paper-module" elevation={15}>
              <Header title="M.A.R.A" />
              <Form style={{ width: "95%" }} />
            </Paper>
          </div>
          <div className="result-container">
            <Paper className="paper-module" elevation={15}>
              <Result />
            </Paper>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return renderedLayout;
};

export default Layout;
