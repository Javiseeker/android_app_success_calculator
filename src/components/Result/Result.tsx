import { Typography } from "@material-ui/core";
import React from "react";
import CSS from "csstype";
interface ResultProps {
  result: string;
}

const defaultProps: ResultProps = { result: "" };

const Result = ({ result }: ResultProps) => {
  let style: object = {};
  if (result === "negative") {
    style = { color: "red" };
  } else if (result === "positive") {
    style = { color: "green" };
  } else {
    style = { color: "#00acc1" };
  }
  return (
    <div>
      <h3 style={style}>{result.toUpperCase()}</h3>
    </div>
  );
};
Result.defaultProps = defaultProps;

export default Result;
