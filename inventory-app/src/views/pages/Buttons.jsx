import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SERVICE_URL, BUTTON_API } from "../../config/default.json";

export default function Buttons() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(SERVICE_URL + BUTTON_API)
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw Error("Error");
      })
      .then((jsondata) => {
        console.log("jsondata", jsondata);
        setIsLoaded(true);
        setCustomers(jsondata);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <h1>Buttons</h1>

        <ul className="pt-3">
          {customers.map((item) => (
            <li key={item.id}>
              {item.name} {item.materia} {item.polish}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
