import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Typography } from "@material-ui/core";

interface Props {
  step: number;
}

function getSteps() {
  return [
    "Obtaining Application Reviews",
    "Processing Reviews",
    "Generating Review-based Rating",
  ];
}
function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return "Obtaining Application Reviews...";
    case 1:
      return "Processing Reviews...";
    case 2:
      return "Generating Review-based Rating...";
    default:
      return "Unknown stepIndex";
  }
}

const stepperStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const ResultStepper: React.FC<Props> = ({ step }: Props) => {
  const classes = stepperStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  return (
    <div className={classes.root}>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
          </div>
        )}
      </div>

      <div >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default ResultStepper;
