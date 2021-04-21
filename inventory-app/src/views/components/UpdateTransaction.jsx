import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { ENUM } from "../../config/default.json";
import {
  collectFormData,
  getTypeDropdown,
  getUnitDropdown,
} from "../common/customHooks";

export default function UpdateTransaction(props) {
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { handleSubmit, buttons } = props;

  const createButtonDropdown = () => {
    return buttons.map((button) => {
      return (
        <option key={button._id} value={JSON.stringify(button)}>
          {button.name} {button.material} {button.polish}
        </option>
      );
    });
  };

  return (
    <React.Fragment>
      <FontAwesomeIcon
        icon={faPlus}
        onClick={handleShow}
        className={"m-2"}
        style={{ float: "right", fontSize: "2em" }}
      />
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Update Storage</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="button">
              <Form.Label>Button</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => collectFormData(e, formData, setFormData)}
              >
                <option value="0">Please Select</option>
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
                <option value="0">Please Select</option>
                {ENUM.UNIT && getUnitDropdown()}
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Form.Group controlId="submit">
              <Button
                onClick={(e) => {
                  handleSubmit(e, formData);
                  handleClose();
                }}
              >
                Submit
              </Button>
            </Form.Group>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
