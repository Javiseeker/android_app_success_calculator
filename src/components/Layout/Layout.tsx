import React, { useState } from "react";
import { Paper, TextField, Button, Icon, CircularProgress } from "@material-ui/core";
import "./Layout.css";
import Header from "../Header/Header";
import Result from "../Result/Result";
import ailab from "../../apis/ailab";
import useMedia from "../../hooks/useMedia";

const ailabKey: string = "5d36d5e2-9941-11eb-a55d-4e6f62601c61";

const Layout: React.FC = () => {
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
  const analyzeReview = async (reviewText: string) => {
    setResultAvailable({ init: false, loading: true });
    try {
      const response = await ailab.post(
        `text/classification/predict/${ailabKey}`,
        { text: reviewText }
      );
      setResult(response.data.result);
      setResultAvailable({ init: false, loading: false });
    } catch (err) {
      console.log(
        `Error making the Http request to AILab. Error Message: ${err.message}`
      );
      setResultAvailable({ init: true, loading: false });
    }
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
        <Paper
          elevation={15}
          style={{ borderRadius: "15px",   height: '100%', width: '40%' }}
        >
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
            <Paper
              className="paper-module"
              elevation={15}
              style={{ borderRadius: "15px" }}
            >
              <div className="paper-title">
                <Header title="App Review Analyzer" />
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
        </div>
        <div>
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
            <Paper
              className="paper-module"
              elevation={15}
              style={{ borderRadius: "15px" }}
            >
              <div className="paper-title">
                <Header title="A.R.A" />
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
        </div>
        <div>
          {resultsRenderer}
        </div>
      </React.Fragment>
    );
  }
  return renderedLayout;
};

export default Layout;
