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
  const [isUpdated, setUpdated] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(SERVICE_URL + BUTTON_API)
      .then(async (response) => {
        const jsonData = await response.json();
        setIsLoaded(true);
        setButtons(jsonData);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [isUpdated, setUpdated]);

  const handleSubmit = async (e) => {
    const result = await saveData(formData, SERVICE_URL + BUTTON_API);
    if (result && typeof result === "object") {
      buttons.push(result);
      setUpdated(true);
      alert("saved!");
    } else alert(`error in save result:\n${result}`);
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
