import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { SERVICE_URL, API, ENUM } from "../../config/default.json";
import {
  collectFormData,
  saveData,
  getUnitDropdown,
  getTypeDropdown,
} from "../common/customHooks";

export default function Transactions() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [formData, setFormData] = useState({});
  const [buttons, setButtons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isUpdated, setUpdated] = useState(false);

  useEffect(() => {
    fetch(SERVICE_URL + API.TRANSACTION)
      .then(async (response) => {
        const jsonData = await response.json();
        setIsLoaded(true);
        setTransaction(jsonData);
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
    fetch(SERVICE_URL + API.CUSTOMER + API.OPTIONS)
      .then(async (response) => {
        const jsonData = await response.json();
        setCustomers(jsonData);
      })
      .catch((error) => {
        setError(error);
      });
  }, [isUpdated, setUpdated]);

  const createButtonDropdown = () => {
    return buttons.map((button) => {
      return (
        <option value={button._id}>
          {button.name} {button.material} {button.polish}
        </option>
      );
    });
  };

  const createCustomerDropdown = () => {
    return customers.map((customer) => {
      return <option value={customer._id}>{customer.name}</option>;
    });
  };

  const handleSubmit = async (e) => {
    const result = await saveData(formData, SERVICE_URL + API.TRANSACTION);
    if (result && typeof result === "object") {
      setUpdated(true);
      transaction.push(result);
      alert("saved!");
    } else alert(`error in save result:\n${result}`);
  };

  const iterateTransaction = () => {
    const list = transaction.map((item) => {
      console.log("item", item);
      const { quantity, unit, type } = item;
      const { name, material, polish } = item.button;
      const { name: user } = item.customer;
      const dateObj = new Date(item.date);
      let updated = `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
      return (
        <li key={item._id}>
          {name} {material} {polish}: {quantity} {unit} {updated} {user} {type}
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
        <h1>Transaction</h1>
        <ul>{transaction && iterateTransaction()}</ul>
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
              as="select"
              onChange={(e) => collectFormData(e, formData, setFormData)}
            >
              <option>Please Select</option>
              {ENUM.UNIT && getUnitDropdown()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="customer">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => collectFormData(e, formData, setFormData)}
            >
              <option>Please Select</option>
              {customers && createCustomerDropdown()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => collectFormData(e, formData, setFormData)}
            >
              <option>Please Select</option>
              {ENUM.TX_TYPE && getTypeDropdown()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="submit">
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
          </Form.Group>
        </Form>
      </React.Fragment>
    );
  }
}
