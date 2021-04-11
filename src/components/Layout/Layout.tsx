import React, { useState } from "react";
import { Paper, TextField, Button, Icon } from "@material-ui/core";
import "./Layout.css";

import Header from "../Header/Header";
import Result from "../Result/Result";
import ailab from "../../apis/ailab";
import useMedia from "../../hooks/useMedia";
import CircularProgress from "@material-ui/core/CircularProgress";

const ailabKey: string = "5d36d5e2-9941-11eb-a55d-4e6f62601c61";

const Layout = () => {
  const [reviewText, setReviewText] = useState("");
  const [result, setResult] = useState("");
  const [resultAvailable, setResultAvailable] = useState({
    init: true,
    loading: false,
  });
  const onChangeReviewText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewText(e.target.value);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    analyzeReview(reviewText);
  };
  const analyzeReview = async (term: string) => {
    setResultAvailable({ init: false, loading: true });
    const response = await ailab.post(
      `text/classification/predict/${ailabKey}`,
      { text: term }
    );
    setResult(response.data.result);
    setResultAvailable({ init: false, loading: false });
  };
  const ActivateMediaQueries = () => {
    return {
      isSm: useMedia("(max-width: 640px)"),
      isMd: useMedia("(min-width: 641px)"),
    };
  };
  let resultsRenderer = null;
  if (resultAvailable.init) {
    resultsRenderer = null;
  } else {
    resultsRenderer = resultAvailable.loading ? (
      <div className="result-container">
        <CircularProgress />
      </div>
      
    ) : (
      <div className="result-container">
        <Paper className="paper-module" elevation={15} style={{borderRadius:"15px"}}>
          <Result result={result} />
        </Paper>
      </div>
    );
  }

  const windowWidth = ActivateMediaQueries();
  let renderedLayout = null;

  if (windowWidth.isMd) {
    renderedLayout = (
      <React.Fragment>
        <div className="body-container">
          <div className="form-container">
            <Paper className="paper-module" elevation={15} style={{borderRadius:"15px"}}>
              <div className="paper-title">
                <Header title="Mobile App Review Analyzer" />
              </div>

              <form
                className="form-module"
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <div className="review-text">
                  <TextField
                    id="review-textfield"
                    label="Application Review"
                    variant="outlined"
                    multiline
                    rows={6}
                    rowsMax={6}
                    value={reviewText}
                    onChange={onChangeReviewText}
                    style={{ width: "90%" }}
                  />
                </div>
                <div className="analyze-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>poll</Icon>}
                    disabled={/^\s*$/.test(reviewText)}
                  >
                    Analyze
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
          {resultsRenderer}
        </div>
      </React.Fragment>
    );
  }
  if (windowWidth.isSm) {
    renderedLayout = (
      <React.Fragment>
        <div className="body-container">
          <div className="form-container">
            <Paper className="paper-module" elevation={15} style={{borderRadius:"15px"}}>
              <div className="paper-title">
                <Header title="M.A.R.A" />
              </div>

              <form
                className="form-module"
                noValidate
                autoComplete="off"
                onSubmit={onFormSubmit}
              >
                <div className="review-text">
                  <TextField
                    id="review-textfield"
                    label="Application Review"
                    variant="outlined"
                    multiline
                    rows={6}
                    rowsMax={6}
                    value={reviewText}
                    onChange={onChangeReviewText}
                    style={{ width: "90%" }}
                  />
                </div>
                <div className="analyze-button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    endIcon={<Icon>poll</Icon>}
                    disabled={/^\s*$/.test(reviewText)}
                  >
                    Analyze
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
          {resultsRenderer}
        </div>
      </React.Fragment>
    );
  }
  return renderedLayout;
};

export default Layout;
