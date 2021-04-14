import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import rapidapi from "../../apis/appstore_rapidapi";
import ailab from "../../apis/ailab";

interface HistoryProps extends stateToMyProps {
  location: {
    [key:string]: stateToMyProps
  };
  history: RouteComponentProps["history"];
  match: RouteComponentProps["match"];
}

interface stateToMyProps extends MyProps{
  state: {
    [key: string]: MyProps
  }
}
interface MyProps extends appToAnalyzeItem {
  appToAnalyze: {
    [key: string]: appToAnalyzeItem
  }
}

interface appToAnalyzeItem {
  name: string;
  id: string;
  price: number;
  rating: number;
  image: string;
}

const ailabKey: string = "5d36d5e2-9941-11eb-a55d-4e6f62601c61";
const ResultSecondApp: React.FC<HistoryProps> = ({location}: HistoryProps) => {
  const [appReviews, setAppReviews] = useState([]);
  useEffect(() => {
    if (location.state !== undefined) {
      // console.log(location.state.appToAnalyze.name);
      // console.log(location.state.appToAnalyze.id);
      // console.log(location.state.appToAnalyze.price);
      // console.log(location.state.appToAnalyze.rating);

      const obtainAppReviews = async () => {
        try {
          const { data } = await rapidapi.get("applicationReviews", {
            params: {
              id: location.state.appToAnalyze.id,
            },
          });
          console.log('datos:')
          console.log(data);
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
  let dateReviewsMade = [''];
  let analyzedAppReviews = [{}];
  let errorReviews = [''];
  const analyzeReviewBatch = (reviews: any) => {
    reviews.forEach((review: { body: string, date: string; })=>{
      analyzeReview(review.body);
      dateReviewsMade.push(review.date);
    })
  };
  const analyzeReview = async (reviewText: string) => {
    try {
      const {data} = await ailab.post(
        `text/classification/predict/${ailabKey}`,
        { text: reviewText }
      );
      analyzedAppReviews.push(data);
    } catch (err) {
      console.log(
        `Error making the Http request to AILab. Error Message: ${err.message}`
      );
      errorReviews.push(reviewText);
    }
  };

  let positiveCounter: number = 0;
  let negativeCounter: number = 0;
  let neutralCounter: number = 0;

  const calculateReviewBasedRating = (analyzedReviews: any) => {
    analyzedReviews.forEach((analyzedReview: {confidence_score: number, result: string}) => {
      //pensar en una formula para calcular rating! :P      
      // analyzedReview.confidence_score
      // analyzedReview.result

    });
  };
  if (location.state === undefined)
    return (
      <Typography variant="h1" color="primary">
        Bad Gateway
      </Typography>
    );
  
  analyzeReviewBatch(appReviews);
  console.log('REVIEWS ANALIZADAS:');
  console.log(analyzedAppReviews);
  console.log('FECHAS DE REVIEWS');
  console.log(dateReviewsMade);
  console.log('REVIEWS CON ERRORES');
  console.log(errorReviews);

  calculateReviewBasedRating(analyzedAppReviews);
  return <div>I got here guys, i made it.</div>;
};

export default ResultSecondApp;
