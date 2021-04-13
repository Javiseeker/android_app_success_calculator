import React, { useState, useEffect } from "react";
import rapidapi from "../apis/appstore_rapidapi";

interface Props {
  q: string;
}

const SearchApp: React.FC<Props> = ({ q }) => {
  const [appName, setAppName] = useState("");
  const [debouncedAppName, setDebouncedAppName] = useState(q);

  useEffect(() => {
    if (q !== "") {
      const timerId = setTimeout(() => {
        setDebouncedAppName(q);
      }, 3000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [q]);

  useEffect(() => {
    if (q !== "") {
      const obtainAppDetails = async () => {
        const { data } = await rapidapi.get("applicationSearch", {
          params: {
            q: debouncedAppName,
          },
        });
        setAppName(
          `app_id: ${data[0].id} app_name: ${data[0].name} app_price: ${data[0].price} app_rating: ${data[0].rating}`
        );
      };
      obtainAppDetails();
    }
  }, [debouncedAppName]);

  return (
    <div>
      <h1 className="ui header">{appName}</h1>
    </div>
  );
};

export default SearchApp;
