import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import rapidapi from "../apis/appstore_rapidapi";
import { Icon } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  readonly q: string;
  readonly setCanAnalyze: Dispatch<SetStateAction<boolean>>;
  readonly setAppsList: Dispatch<SetStateAction<never[]>>;
}

const SearchApps: React.FC<Props> = ({ q, setCanAnalyze, setAppsList }) => {
  const [dataObtained, setDataObtained] = useState(false);
  const [debouncedAppName, setDebouncedAppName] = useState(q);
  const [loader, setLoader] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  useEffect(() => {
    if (q !== "") {
      const timerId = setTimeout(() => {
        setDebouncedAppName(q);
      }, 1500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [q]);

  useEffect(() => {
    if (q !== "") {
      const obtainAppsList = async () => {
        try {
          setLoader(true);
          const { data } = await rapidapi.get("applicationSearch", {
            params: {
              q: debouncedAppName,
            },
          });
          setAppsList(data);
          setErrorFound(false);
          setCanAnalyze(true);
          setDataObtained(true);
          setLoader(false);
        } catch (err) {
          console.log(
            `Error making the Http request to RapidAPI. Error Message: ${err.message}`
          );
          setAppsList([]);
          setErrorFound(true);
          setCanAnalyze(false);
          setDataObtained(false);
          setLoader(false);
        }
      };
      obtainAppsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAppName]);

  let iconElement = null;

  if (q !== "") {
    if (dataObtained) {
      iconElement = <Icon style={{ color: "green", fontSize: 35 }}>check</Icon>;
    } else {
      iconElement = loader ? (
        <CircularProgress size={33}/>
      ) : errorFound ? (
        <Icon style={{ color: "red", fontSize: 30 }}>close</Icon>
      ) : null;
    }
  }
  return <div>{iconElement}</div>;
};

export default SearchApps;
