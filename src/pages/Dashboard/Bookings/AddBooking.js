import React, { useState, useReducer, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import {
  formReducer,
  FORM_FILLED,
} from "../../../components/Forms/formReducer";
import Input from "../../../components/Forms/Input";
import * as bussAction from '../../../store/Buss/action'

import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from '../../../components/UI/ErrorOrConfirm'
import {Fetch} from '../../../components/Server/Fetch'
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";


const AddBooking = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);

  const isEdit = props.location?.state?.route;

  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");


  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: isEdit
        ? isEdit.CustomerFullName
        : "",
      Email: isEdit
      ? isEdit.CustomerEmail
      : 0,
      CreatedOn: isEdit
      ? isEdit.CreatedOn: '',
      OrderStatus: isEdit
      ? isEdit.OrderStatus
      : 0,
      PaymentStatus: isEdit
      ? isEdit.PaymentStatus
      : 0,
      OrderTotal: isEdit
      ? isEdit.OrderTotal
      : 0,
    },

    InputValidates: {
    Name: isEdit ? true : false,
    Phone: isEdit ? true : false,
    Address: isEdit ? true : false,
    },
    formisValid: isEdit ? true : false,
  });


  if (isLoading) {
    return (
      <div className="spinner-border text-success m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
          <ErrorOrConfirm error={error} confirmRoute={confirmRoute}/>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h1 className="card-title">
                      {isEdit ? `Customer #${isEdit.CustomerId}` : "Add Driver"}
                    </h1>

                    <form>
                      <Row>

                        <Col lg="6">
                        <Input
                            Label="Name"
                            col="12"
                            id="Name"
                            initialValue={inputState.InputValues.Name}
                            disabled={true}
                          />
                           <Input
                            Label="Email"
                            col="12"
                            id="Email"
                            initialValue={inputState.InputValues.Email}
                            disabled={true}
                          />
                            <Input
                            Label="Payment Status"
                            col="12"
                            id="PaymentStatus"
                            initialValue={inputState.InputValues.PaymentStatus}
                            disabled={true}
                          />
                        </Col>
                        <Col lg='6'>
                        <Input
                            Label="Created On"
                            col="12"
                            id="CreatedOn"
                            initialValue={inputState.InputValues.CreatedOn}
                            disabled={true}
                          />
                            <Input
                            Label="Order Status"
                            col="12"
                            id="OrderStatus"
                            initialValue={inputState.InputValues.OrderStatus}
                            disabled={true}
                          />
                             <Input
                            Label="Order Total"
                            col="12"
                            id="OrderTotal"
                            initialValue={inputState.InputValues.OrderTotal}
                            disabled={true}
                          />
                      
                        </Col>
                      </Row>
                    </form>

                    {/* TABLES START HERE */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
};

export default AddBooking;
