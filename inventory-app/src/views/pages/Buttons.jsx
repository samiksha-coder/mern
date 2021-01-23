import React, { useEffect, useState } from "react";
import _ from "lodash";
import { SERVICE_URL, BUTTON_API } from "../../config/default.json";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { saveData } from "../common/customHooks";

export default function Buttons() {
  const [error, setError] = useState(null);
  const [formDataError] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [isUpdated, setupdated] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(SERVICE_URL + BUTTON_API)
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw Error("Error");
      })
      .then((jsondata) => {
        setIsLoaded(true);
        setButtons(jsondata);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [isUpdated, setupdated]);
  const handleSubmit = async (e) => {
    const result = await saveData(formData, SERVICE_URL + BUTTON_API);
    console.log("typeof result", typeof result);
    if (typeof result === "object") {
      console.log("save result", result.join);
      buttons.push(result);
      setupdated(true);
    } else console.log("error in save result", result);
  };
  const collectFormData = (e) => {
    const { id, value } = e.target;
    let data = formData;
    data[id] = value;
    setFormData(data);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log("formDataError", formDataError);
    return (
      <React.Fragment>
        <h1>Buttons</h1>
        <ul className="pt-3">
          {buttons.map((item) => (
            <li key={item._id}>
              {item.name} {item.material} {item.polish}
            </li>
          ))}
        </ul>
        <Form id="newButton">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" onChange={(e) => collectFormData(e)} />
          </Form.Group>
          <Form.Group controlId="material">
            <Form.Label>Material</Form.Label>
            <Form.Control type="text" onChange={(e) => collectFormData(e)} />
          </Form.Group>
          <Form.Group controlId="polish">
            <Form.Label>Polish</Form.Label>
            <Form.Control type="text" onChange={(e) => collectFormData(e)} />
          </Form.Group>
          <Form.Group controlId="submit">
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
