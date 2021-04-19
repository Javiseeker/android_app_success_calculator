import React from 'react';
import { Typography } from '@material-ui/core';
interface Props {
  appRating: number;
  reviewBasedRating: number;
}

const Rating: React.FC<Props> = ({ appRating, reviewBasedRating }: Props) => {

  const analyzeRating = (rating: number) => {
    let tmpStyle: object = {};
    if (rating < 2.5) {
      tmpStyle = { color: "red", fontSize:'200%' };
    } else if (rating >= 2.5 && rating < 3.8) {
      tmpStyle = { color: "#00acc1", fontSize:'200%' };
    } else if (rating >= 3.8) {
      tmpStyle = { color: "green", fontSize:'200%' };
    }
    return tmpStyle;
  }

  const generateConclusions = (appRating: number, reviewBasedRating: number) => {
    if (appRating >= 3.8 && reviewBasedRating >= 3.8) {
      return (
        <div>
          <p>
            Congratulations, you have a successful Mobile App! Keep up the good work!
          </p>
        </div>
      );
    }
    if (appRating >= 3.8 && (reviewBasedRating >= 2.5 && reviewBasedRating < 3.8)) {
      return (
        <div>
          <p>
            Your application is currently having issues. Please check its latest releases
            and ask your users for feedback about them.
          </p>
        </div>
      );
    }
    if (appRating >= 3.8 && reviewBasedRating < 2.5) {
      return (
        <div>
          <p>
            There are critical issues with your Application at the moment. If by any chance you did any major
            changes to it recently, it's highly advised to rollback to a better version!
          </p>
        </div>
      );
    }
    if((appRating >= 2.5 && appRating < 3.8) && reviewBasedRating >= 3.8){
      return(
        <div>
          <p>
            Your application reviews are improving. Good job. Be careful on the next steps you're taking for it. 
          </p>
        </div>

      );
    }
    if((appRating >= 2.5 && appRating < 3.8) && (reviewBasedRating >= 2.5 && reviewBasedRating < 3.8)){
      return(
        <div>
          <p>
            Your application does not show any major improvements. It's the right time to add new features.
          </p>
        </div>
      );
    }
    if((appRating >= 2.5 && appRating < 3.8) && reviewBasedRating < 2.5){
      return(
        <div>
          <p>
            You need to re-define your application's differential value. Its feedback is getting worse by time.
          </p>
        </div>
      );
    }
    if(appRating < 2.5 && reviewBasedRating >= 3.8){
      return(
        <div>
          <p>
            Your applications had critical issues in the past... But that was in the past! Whatever you changed recently definitely
            worked! Highly advised to get prepared for what's coming. This is the right time to start understanding what's your application's
            current target!
          </p>
        </div>
      );
    }
    if(appRating < 2.5 && (reviewBasedRating >= 2.5 && reviewBasedRating < 3.8)){
      return(
        <div>
          <p>
            Your application is slowly getting better. Keep fixing those bugs!
          </p>
        </div>
      );
    }
    if(appRating < 2.5 && reviewBasedRating < 2.5){
      return(
        <div>
          <p>
            Your application won't last long. It's time to start a new IT project.
          </p>
        </div>
      );
    }
  };


  let appRatingStyle: object = analyzeRating(appRating);
  let reviewBasedRatingStyle: object = analyzeRating(reviewBasedRating);
  let conclusions: any = generateConclusions(appRating, reviewBasedRating);

  return (
    <div className="rating-container">
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Typography variant="h5" color="primary">Application Rating</Typography>
          <h2 style={appRatingStyle}>{appRating}</h2>
        </div>
        <div style={{ width: '50%' }}>
          <Typography variant="h5" color="primary">Review-based Rating</Typography>
          <h2 style={reviewBasedRatingStyle}>{reviewBasedRating}</h2>
        </div>
      </div>
      <div>
        {conclusions}
      </div>

    </div>

  );
};

export default Rating;