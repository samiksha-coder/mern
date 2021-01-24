import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

import { SERVICE_URL, API } from "../../config/default.json";
import { collectFormData, saveData } from "../common/customHooks";

export default function Storage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storage, setStorage] = useState([]);
  const [formData, setFormData] = useState({});
  const [buttons, setButtons] = useState([]);
  const [isUpdated, setUpdated] = useState(false);

  useEffect(() => {
    fetch(SERVICE_URL + API.STORAGE)
      .then(async (response) => {
        const jsonData = await response.json();
        setIsLoaded(true);
        setStorage(jsonData);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
    fetch(SERVICE_URL + API.BUTTON)
      .then(async (response) => {
        const jsonData = await response.json();
        setButtons(jsonData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [isUpdated]);

  const createButtonDropdown = () => {
    return buttons.map((button) => {
      return (
        <option value={JSON.stringify(button)}>
          {button.name} {button.material} {button.polish}
        </option>
      );
    });
  };

  const handleSubmit = async (e) => {
    const result = await saveData(formData, SERVICE_URL + API.STORAGE);
    if (result && typeof result === "object") {
      setUpdated(true);
      alert("saved!");
    } else alert(`error in save result:\n${result}`);
  };

  const iterateStorage = () => {
    const list = storage.map((item) => {
      const { quantity, unit } = item;
      const { name, material, polish } = item.button;
      const dateObj = new Date(item.updated);
      let updated = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
      return (
        <li key={item._id}>
          {name} {material} {polish}: {quantity} {unit} {updated}
        </li>
      );
    });
    return list;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <h1>Storage</h1>
        <ul>{storage && iterateStorage()}</ul>
        <Form>
          <Form.Group controlId="button">
            <Form.Label>Button</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => collectFormData(e, formData, setFormData)}
            >
              <option>Please Select</option>
              {buttons && createButtonDropdown()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => collectFormData(e, formData, setFormData)}
            />
          </Form.Group>
          <Form.Group controlId="unit">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => collectFormData(e, formData, setFormData)}
            />
          </Form.Group>
          <Form.Group controlId="submit">
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
