import React, { useEffect, useState } from "react";
import { SERVICE_URL, CUSTOMER_API } from "../../config/default.json";

export default function Customers(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(SERVICE_URL + CUSTOMER_API)
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
        <h1>Customers</h1>

        <ul className="pt-3">
          {customers.map((item) => (
            <li key={item._id}>
              {item.name} {item.phone} {item.address} {item.email}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
