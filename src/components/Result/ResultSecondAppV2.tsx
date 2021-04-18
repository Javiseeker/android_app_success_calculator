import { Typography, Button, Icon, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import rapidapi from "../../apis/appstore_rapidapi";
import ailab from "../../apis/ailab";
import "./ResultSecondApp.css";
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
type ailabResult = {
  result: string;
  confidence_score: number;
  processing_time: number;
};
interface ailabInterface {
  result: string;
  confidence_score: number;
  processing_time: number;
}

const ailabKey: string = "5d36d5e2-9941-11eb-a55d-4e6f62601c61";

const ResultSecondAppV2: React.FC<HistoryProps> = ({
  location,
}: HistoryProps) => {
  const [appReviews, setAppReviews] = useState([]);
  const [appRating, setAppRating] = useState(0);
  const [stepValue, setStepValue] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [appReviewsAnalyses, setAppReviewsAnalyses] = useState<any>([]);
  const [appReviewsAnalysesLength, setAppReviewsAnalysesLength] = useState(0);
  const [barScore, setBarScore] = useState(0);

  // useLayoutEffect(
  //   () => {
  //     console.log(appReviewsAnalyses)
  //   }, [appReviewsAnalyses]
  // );

  useEffect(() => {
    if (location.state !== undefined) {
      const obtainAppReviews = async () => {
        try {
          const { data } = await rapidapi.get("applicationReviews", {
            params: {
              id: location.state.appToAnalyze.id,
            },
          });
          setAppReviews(data);
          setStepValue(1);
        } catch (err) {
          console.log(
            `Error making the Http request to RapidAPI. Error Message: ${err.message}`
          );
          setAppReviews([]);
        }
      };
      obtainAppReviews();
    }
  }, []);

  useEffect(
    //App Reviews analyzed. Starting analyzing one by one to render on the ResultStepper component.
    () => {
      console.log(appReviewsAnalyses)

      if (appReviewsAnalyses.length > 0) {
        console.log('appReviewsAnalyses:')
        console.log(appReviewsAnalyses)
        let tmpArray = appReviewsAnalyses;
        let shiftedValue = tmpArray.shift();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setAppReviewsAnalyses(tmpArray);
        if (shiftedValue.result === "positive") {
          setBarScore(barScore + 1);
        } else if (shiftedValue.result === "negative") {
          setBarScore(barScore - 1)
        }
        
        if (appReviewsAnalyses.length === 0) setStepValue(2);
      }
    }, [appReviewsAnalyses]
  );

  const analyzeReviewBatch = (reviews: any) => {
    let requestsArray = reviews.map((review: { body: string }) => {
      const request = ailab.post(`text/classification/predict/${ailabKey}`, {
        text: review.body,
      });

      return request;
    });

    Promise.all(requestsArray).then((values) => {
      setAppReviewsAnalysesLength(values.length);
      setAppReviewsAnalyses(values.map((value: any) => {
        return value.data;
      }));
    });
  };

  const calculateReviewBasedRating = () => {

    let rating = barScore / appReviewsAnalysesLength;
    if (rating > 0) {
      rating = rating * 2.5 + 2.5;
    } else {
      rating = rating * -1;
      rating = rating * 2.5 + 1;
    }
    setStepValue(3);
    setAppRating(rating);
  };

  // console.log(`app review analyses length: ${appReviewsAnalysesLength}`)
  // console.log(`app review analyses: ${appReviewsAnalyses}`)
  // console.log(`current barscore: ${currentBarScore}`);
  // console.log(`analyzed reviews length: ${appReviewsAnalysesLength}`);

  if (location.state === undefined)
    return (
      <Typography variant="h1" color="primary">
        Bad Gateway
      </Typography>
    );

  // if (appReviewsAnalyses.length > 0) {
  //   let tmpList = appReviewsAnalyses;
  //   tmpList.shift()
  //   setAppReviewsAnalyses(tmpList);
  // }

  //App Reviews obtained. Moving logic along with the current stepper's step value.
  switch (stepValue) {
    case 1:
      if (appReviewsAnalyses.length === 0) {
        //App Reviews have not been analyzed yet.
        analyzeReviewBatch(appReviews);
      }
      break;

    case 2:

      calculateReviewBasedRating();
      break;
    case 3:
      setTimeout(() => {
        setStepValue(-1);
        setShowResults(true);
      }, 2000)
  }


  let renderedResults = null;
  let renderedStepper = null;
  if (showResults) {
    renderedResults = (
      <div>
        <Typography variant="h2">{`Review-based rating for ${location.state.appToAnalyze.name}: Review-Based: ${appRating} vs Rating-Based: ${location.state.appToAnalyze.rating}`}</Typography>
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
        <ResultStepper step={stepValue} reviewAnalysisResult={barScore} />
      </div>
    );
  }

  return (
    <div className="results-container">
      {renderedResults}
      {renderedStepper}

    </div>
  );
};

export default ResultSecondAppV2;
