import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import makeAnimated from "react-select/animated";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";

const optionGroup = [
  {
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
  },
];

const optionGroup1 = [
  {
    label: "Bus Category",
    options: [
      { label: "Toyota Bus", value: "Toyota Bus" },
      { label: "Honda", value: "Honda" },
      { label: "Faw", value: "Faw" },
    ],
  },
];

const AddStaff = () => {
  //** Datepicker Method */

  const max_len = 25;
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);
  const [customOutlinePrimary, setcustomOutlinePrimary] = useState(true);

  const [phone, setPhone] = useState("Enter");

  function handleMulti1(selectedMulti1) {
    setselectedMulti1(selectedMulti1);
  }

  function handleMulti2(selectedMulti2) {
    setselectedMulti2(selectedMulti2);
  }

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3);
  }

  /*
    get date Method
  **/

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h1 className="card-title">Add Staff</h1>
                  <form>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="select2-container">
                          <label for="exampleInputEmail1">First Name</label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="First name"
                          />
                        </FormGroup>

                        <FormGroup className="select2-container">
                          <label for="exampleInputEmail1">Phone</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone"
                          />
                        </FormGroup>
                        <FormGroup className="select2-container">
                          <Label>User Role</Label>
                          <Select
                            value={selectedMulti2}
                            onChange={() => {
                              handleMulti2();
                            }}
                            options={optionGroup1}
                            classNamePrefix="select2-selection"
                            isDisabled={false}
                          />
                        </FormGroup>

                        <FormGroup className="select2-container">
                          <Label>Gender</Label>
                          <Select
                            value={selectedMulti1}
                            onChange={() => {
                              handleMulti1();
                            }}
                            options={optionGroup}
                            classNamePrefix="select2-selection"
                            isDisabled={false}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup className="select2-container">
                          <label for="exampleInputEmail1">Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Last Name"
                          />
                        </FormGroup>
                        <FormGroup className="select2-container">
                          <label for="exampleInputEmail1">DOB</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="DOB"
                          />
                        </FormGroup>

                        <FormGroup className="select2-container">
                          <label for="exampleInputEmail1">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Password"
                          />
                        </FormGroup>
                        <FormGroup className="select2-container">
                          <label for="exampleInputEmail1">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                  <div
                    className="custom-control custom-checkbox custom-checkbox-outline custom-checkbox-primary mb-3"
                    style={{ marginTop: 20 }}
                  >
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck-outlinecolor1"
                      checked={customOutlinePrimary}
                      onChange={() => {
                        setcustomOutlinePrimary(!customOutlinePrimary);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck-outlinecolor1"
                    >
                      Active
                    </label>
                  </div>

                  <div className="button-items">
                    <Button
                      color="primary"
                      className="btn btn-primary waves-effect waves-light"
                      data-toggle="button"
                      aria-pressed="false"
                      onClick={() => console.log("Button Click")}
                    >
                      Add User
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddStaff;
