import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Typography, StepConnector, StepIconProps, Paper, CircularProgress } from "@material-ui/core";
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import './ResultStepper.css';

interface Props {
  step: number;
  reviewAnalysisResult: number;
}

function getSteps() {
  return [
    "Obtaining Application Reviews",
    "Processing Reviews",
    "Generating Review-based Rating",
  ];
}

function getStepContent(stepIndex: number, reviewAnalysisResult: number) {
  switch (stepIndex) {
    case 0:
      return (
        <Typography  color="primary">
          Obtaining Application Reviews...
        </Typography>
      );
    case 1:
      return (
        <CircularProgress size={50} />
      );
    case 2:
      return (
        <Typography  color="primary">
          Generating Review-based Rating...
        </Typography>
      );

    default:
      return (
        <Typography  color="primary">
          Unknown Index...
        </Typography>
      );
  }
}


const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#00acc1',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#ff6f00',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#ff6f00',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#00acc1',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#00acc1',
    },
  },
  line: {
    borderColor: '#00acc1',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const ResultStepper: React.FC<Props> = ({ step, reviewAnalysisResult }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    setActiveStep(step);
  }, [step]);
  return (
    <React.Fragment>
      <div className="information-container">
        <Paper className="paper-module" elevation={15}>
          {activeStep === steps.length ? (
            <div className="information-container">
              <Typography variant="h3" color="primary">
                All steps completed
            </Typography>
            </div>
          ) : (
            <div className="information-container">
              {getStepContent(activeStep, reviewAnalysisResult)}
            </div>
          )}
        </Paper>
      </div>
      <div className="stepper-container">
        <Paper className="paper-module" elevation={15}>
          <div>
            <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />} >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default ResultStepper;
