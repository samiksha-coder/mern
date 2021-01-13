import { useEffect, useState } from "react";
import ViewRouters from "./utils/ViewRouters";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3100/")
      .then((response) => response.text())
      .then((jsondata) => {
        console.log("jsondata", jsondata);
        setIsLoaded(true);
        setItems(jsondata);
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
      <div>
        <h1>{item}</h1>
        <ViewRouters />
      </div>
    );
  }
}

export default App;
