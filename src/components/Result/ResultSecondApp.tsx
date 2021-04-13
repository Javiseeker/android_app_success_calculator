import React from "react";
interface ResultProps {
  result: string;
}

const defaultProps: ResultProps = { result: "" };

const ResultSecondApp: React.FC<ResultProps> = ({ result }: ResultProps) => {
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
ResultSecondApp.defaultProps = defaultProps;

export default ResultSecondApp;
