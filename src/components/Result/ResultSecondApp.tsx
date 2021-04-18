import { Typography } from "@material-ui/core";
import Stepper from '../Utility/Stepper/ResultStepper';
import React, { useState, useEffect } from "react";
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


const ResultSecondApp: React.FC<HistoryProps> = ({
  location,
}: HistoryProps) => {
  const [appReviews, setAppReviews] = useState([]);
  const [appRating, setAppRating] = useState(0);
  const [stepper, setStepper] = useState(0);

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

  const analyzeReviewBatch = (reviews: any) => {
    // setStepper(1)
    let requestsArray = reviews.map((review: { body: string }) => {
      const request = ailab.post(`text/classification/predict/${ailabKey}`, {
        text: review.body,
      });

      return request;
    });
    Promise.all(requestsArray).then((values) => {
      let tmpList = values.map((value: any) => {
        return value.data;
      });
      
      setAppRating(calculateReviewBasedRating(tmpList, tmpList.length));
    });
  };

  const calculateReviewBasedRating = (
    analyzedReviews: ailabInterface[],
    reviewsNumber: number
  ): number => {
    // setStepper(2);
    let counter: number = 0;
    analyzedReviews.forEach((analyzedReview: ailabResult) => {
      switch (analyzedReview.result) {
        case "positive":
          counter += 1;
          break;
        case "negative":
          counter -= 1;
          break;
      }
    });

    let rating = counter / reviewsNumber;
    if (rating > 0) {
      rating = rating * 2.5 + 2.5;
    } else {
      rating = rating * -1;
      rating = rating * 2.5 + 1;
    }
    
    return rating;
  };
  if (location.state === undefined)
    return (
      <Typography variant="h1" color="primary">
        Bad Gateway
      </Typography>
    );
  analyzeReviewBatch(appReviews);

  return (
    <div className="results-container">
      
      <Typography variant="h2">{`Review-based rating for ${location.state.appToAnalyze.name}: Review-Based: ${appRating} vs Rating-Based: ${location.state.appToAnalyze.rating}`}</Typography>
      {/* <ResultStepper step={stepper}/> */}
    </div>
  );
};

export default ResultSecondApp;
