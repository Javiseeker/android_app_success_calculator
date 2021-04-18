import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import rapidapi from "../../apis/appstore_rapidapi";
import ailab from "../../apis/ailab";
import { Typography, Button, Icon, CircularProgress } from "@material-ui/core";
import ResultStepper from "../Utility/Stepper/ResultStepper";

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

class ResultSecondAppV3 extends React.Component<HistoryProps> {
  state = {
    appReviews: [],
    appRating: 0,
    stepValue: 0,
    showResults: false,
    appReviewsAnalyses: [],
    appReviewsAnalysesLength: 0,
    barScore: 0
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
          this.setState({ appReviews: data, stepValue: 1 });
        } catch (err) {
          console.log(
            `Error making the Http request to RapidAPI. Error Message: ${err.message}`
          );
        }
      };
      obtainAppReviews();
    }
  }

  componentDidUpdate() {
    if (this.state.appReviewsAnalyses.length > 0) {
      console.log(`appReviewsAnalyses.length: ${this.state.appReviewsAnalyses.length}`)
      let tmpArray = this.state.appReviewsAnalyses;
      let shiftedValue: any = tmpArray.shift();
      this.setState({ appReviewsAnalyses: tmpArray });
      if (shiftedValue.result === "positive") {
        this.setState({ barScore: this.state.barScore + 1 })
      } else if (shiftedValue.result === "negative") {
        this.setState({ barScore: this.state.barScore - 1 })
      }
      if (tmpArray.length === 0) this.setState({ stepValue: 2 });
    }

    // if (tmpArray.length === 0) {
    //   if (shiftedValue.result === "positive") {
    //     this.setState({ barScore: (this.state.barScore + 1), appReviewsAnalyses: tmpArray, stepValue: 2 })
    //   } else if (shiftedValue.result === "negative") {
    //     this.setState({ barScore: (this.state.barScore - 1), appReviewsAnalyses: tmpArray, stepValue: 2 })
    //   }
    // } else {
    //   if (shiftedValue.result === "positive") {
    //     this.setState({ barScore: (this.state.barScore + 1), appReviewsAnalyses: tmpArray })
    //   } else if (shiftedValue.result === "negative") {
    //     this.setState({ barScore: (this.state.barScore - 1), appReviewsAnalyses: tmpArray })
    //   }
    // }
  }

  analyzeReviewBatch = (reviews: any) => {
    let requestsArray = reviews.map((review: { body: string }) => {
      const request = ailab.post(`text/classification/predict/${ailabKey}`, {
        text: review.body,
      });
      return request;
    });
    Promise.all(requestsArray).then((values) => {
      this.setState(
        {
          appReviewsAnalysesLength: values.length,
          appReviewsAnalyses: values.map((value: any) => { return value.data; })
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
    this.setState({ stepValue: 3, appRating: rating })
  };

  render() {
    if (this.props.location.state === undefined)
      return (
        <Typography variant="h1" color="primary">
          Bad Gateway
        </Typography>
      );

    //App Reviews obtained. Moving logic along with the current stepper's step value.
    switch (this.state.stepValue) {
      case 1:
        if (this.state.appReviewsAnalyses.length === 0) {
          //App Reviews have not been analyzed yet.
          this.analyzeReviewBatch(this.state.appReviews);
        }
        break;

      case 2:
        this.calculateReviewBasedRating();
        break;
      case 3:
        setTimeout(() => {
          this.setState({ stepValue: -1, showResults: true })
        }, 2000);
    }

    let renderedResults = null;
    let renderedStepper = null;
    if (this.state.showResults) {
      renderedResults = (
        <div>
          <Typography variant="h2">{`Review-based rating for ${this.props.location.state.appToAnalyze.name}: Review-Based: ${this.state.appRating} vs Rating-Based: ${this.props.location.state.appToAnalyze.rating}`}</Typography>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Icon>poll</Icon>}
          >
            Analyze Another App
          </Button>
        </div>

      );
    } else {
      renderedStepper = (
        <div className="stepper-container">
          <ResultStepper step={this.state.stepValue} reviewAnalysisResult={this.state.barScore} />
        </div>
      );
    }
    return (
      <div className="results-container">
        {renderedResults}
        {renderedStepper}

      </div>
    );
  }
};

export default ResultSecondAppV3;