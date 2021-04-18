import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Typography, StepConnector, StepIconProps } from "@material-ui/core";
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';

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
function getStepContent(stepIndex: number, reviewAnalysisResult:number) {
  switch (stepIndex) {
    case 0:
      return "Obtaining Application Reviews...";
    case 1:
      return `counter actual: ${reviewAnalysisResult}`;
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
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
  })
);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
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
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const ResultStepper: React.FC<Props> = ({ step, reviewAnalysisResult }: Props) => {
  const classes = stepperStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  // console.log(`this is the current score: ${reviewAnalysisResult}`)
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
              {getStepContent(activeStep, reviewAnalysisResult)}
            </Typography>
          </div>
        )}
      </div>

      <div >
        <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />} >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default ResultStepper;
