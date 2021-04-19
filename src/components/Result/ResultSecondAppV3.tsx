import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import rapidapi from "../../apis/appstore_rapidapi";
import ailab from "../../apis/ailab";
import { Typography, Button, Icon, CircularProgress, Backdrop, Paper } from "@material-ui/core";
import ResultStepper from "../Utility/Stepper/ResultStepper";
import Header from '../Header/Header';
import Image from '../Utility/Image/Image';
import Rating from '../Rating/Rating';
import moment from 'moment';

import './ResultSecondApp.css';
interface HistoryProps extends stateToMyProps {
  location: {
    [key: string]: stateToMyProps;
  };
  history: RouteComponentProps["history"];
  match: RouteComponentProps["match"];
}
interface stateToMyProps extends MyProps {
  state: {
    [key: string]: MyProps;
  };
}
interface MyProps extends appToAnalyzeItem {
  appToAnalyze: {
    [key: string]: appToAnalyzeItem;
  };
}
interface appToAnalyzeItem {
  name: string;
  id: string;
  price: number;
  rating: number;
  image: string;
}
const ailabKey: string = "5d36d5e2-9941-11eb-a55d-4e6f62601c61";
const resultsStages = {
  initializing: 'initializing',
  processing: 'processing',
  done: 'done'
}
class ResultSecondAppV3 extends React.Component<HistoryProps> {
  state = {
    appReviews: [],
    initialReviewDate: '',
    latestReviewDate: '',
    appRating: 0,
    stepValue: 0,
    resultsAnalysis: resultsStages.initializing,
    appReviewsAnalyses: [],
    appReviewsAnalysesLength: 0,
    barScore: 0,
    error: false,
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const obtainAppReviews = async () => {
        try {
          const { data } = await rapidapi.get("applicationReviews", {
            params: {
              id: this.props.location.state.appToAnalyze.id,
            },
          });
          this.setState({ appReviews: data }, () => {
            this.setState({ stepValue: 1 });
          });
        } catch (err) {
          console.log(
            `Error making the Http request to RapidAPI. Error Message: ${err.message}`
          );
          this.setState({error: true})
          setTimeout(()=>{
            this.props.history.push('/app-analysis')
          },4000)
        }
      };
      obtainAppReviews();
    }
  }

  componentDidUpdate() {

    if (this.state.appReviewsAnalyses.length > 0) {
      let tmpArray = this.state.appReviewsAnalyses;
      let shiftedValue: any = tmpArray.shift();
      this.setState({ appReviewsAnalyses: tmpArray }, () => {
        if (tmpArray.length === 0) {
          if (shiftedValue.result === "positive") {
            this.setState({ stepValue: 2 }, () => {
              this.setState({ barScore: this.state.barScore + 1 })
            })
          } else if (shiftedValue.result === "negative") {
            this.setState({ stepValue: 2 }, () => {
              this.setState({ barScore: this.state.barScore - 1 })
            });
          } else {
            this.setState({ stepValue: 2 });
          }
        } else {
          if (shiftedValue.result === "positive") {
            this.setState({ barScore: this.state.barScore + 1 })
          } else if (shiftedValue.result === "negative") {
            this.setState({ barScore: this.state.barScore - 1 })
          }
        }
      });
    }
  }

  analyzeReviewBatch = (reviews: any) => {
    let tmpInitialReviewDate: string = ''
    let tmpLatestReviewDate: string = ''
    let requestsArray = reviews.map((review: { body: string, dateIso: string }, index: number) => {
      if (index === 0) tmpLatestReviewDate = review.dateIso;
      if (index === reviews.length - 1) tmpInitialReviewDate = review.dateIso;

      const request = ailab.post(`text/classification/predict/${ailabKey}`, {
        text: review.body,
      });
      return request;
    });
    Promise.all(requestsArray).then((values) => {
      this.setState(
        {
          appReviewsAnalyses: values.map((value: any) => { return value.data; })
        }, () => {
          this.setState({
            appReviewsAnalysesLength: values.length,
            initialReviewDate: tmpInitialReviewDate,
            latestReviewDate: tmpLatestReviewDate
          });
        });
    });

  };

  calculateReviewBasedRating = () => {
    let rating = this.state.barScore / this.state.appReviewsAnalysesLength;
    if (rating > 0) {
      rating = rating * 2.5 + 2.5;
    } else {
      rating = rating * -1;
      rating = rating * 2.5 + 1;
    }
    this.setState({ appRating: rating }, () => {
      this.setState({ stepValue: 3 });
    });
  };

  render() {
    if (this.props.location.state === undefined)
      return (
        <Typography variant="h1" color="primary">
          Bad Gateway
        </Typography>
      );
      
    if(this.state.error) {
      return(
        <React.Fragment>
          <Typography variant="h3" color="primary"> Reviews Not Found. Redirecting...</Typography>
          <CircularProgress />
        </React.Fragment>
      );
    }
    //App Reviews obtained. Moving logic along with the current stepper's step value.
    let renderedStepper = null;
    switch (this.state.stepValue) {
      case 1:
        if (this.state.appReviewsAnalyses.length === 0) {
          //App Reviews have not been analyzed yet.
          renderedStepper = <ResultStepper step={this.state.stepValue} reviewAnalysisResult={this.state.barScore} />
          this.analyzeReviewBatch(this.state.appReviews);
        }
        break;

      case 2:
        renderedStepper = <ResultStepper step={this.state.stepValue} reviewAnalysisResult={this.state.barScore} />

        this.calculateReviewBasedRating();
        break;
      case 3:
        renderedStepper = <ResultStepper step={this.state.stepValue} reviewAnalysisResult={this.state.barScore} />
        setTimeout(() => {
          this.setState({ stepValue: -1, resultsAnalysis: resultsStages.processing });
        }, 2000);
        break;
    }

    let renderedResults = null;
    switch (this.state.resultsAnalysis) {
      case resultsStages.processing:
        renderedResults = (
          <Backdrop open={true}>
            <CircularProgress />
          </Backdrop>
        );
        setTimeout(() => {
          this.setState({ resultsAnalysis: resultsStages.done });
        }, 2000);
        break;
      case resultsStages.done:

        renderedResults = (
          <div className="results-container">
            <div className="header-container">
              <Image
                imgSrc={this.props.location.state.appToAnalyze.image.toString()}
                altPath=""
                onClickUrl=""
                style={{
                  maxWidth: "120px",
                  maxHeight: "120px",
                  borderRadius: "50%",
                }}
                onClickEnabled={false}
              />
              <Header title={this.props.location.state.appToAnalyze.name.toString()} />
            </div>
            <div className="dates-container">
              <p>{`Analyzed Reviews: ${this.state.appReviewsAnalysesLength}`}</p>
              <p>{`Initial Date: ${moment(this.state.initialReviewDate, moment.ISO_8601)}`}</p>
              <p>{`Initial Date: ${moment(this.state.latestReviewDate, moment.ISO_8601)}`}</p>
            </div>
            <div className="rating-container">
              <Rating appRating={Number(this.props.location.state.appToAnalyze.rating)} reviewBasedRating={this.state.appRating} />
            </div>
            <div className="button-container">
              <Button
                variant="contained"
                color="secondary"
                onClick={()=>{this.props.history.push('/app-analysis')}}
                endIcon={<Icon>poll</Icon>}
              >
                Analyze Another App
            </Button>
            </div>

          </div>

        );
        break;
    }

    return (
      <React.Fragment>
        <div className="results-layout">
          <Paper className="paper-module">
            {renderedResults}
          </Paper>
        </div>
        <React.Fragment>
          {renderedStepper}
        </React.Fragment>
      </React.Fragment>
    );
  }
};

export default ResultSecondAppV3;