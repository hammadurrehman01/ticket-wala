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


const AddDriver = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);

  const isEdit = props.location?.state?.route;

  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");

  // LOGIN USER ID
  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: isEdit
        ? isEdit.Name
        : "",
      Phone: isEdit
      ? isEdit.PhoneNo
      : 0,
      Address: isEdit
      ? isEdit.Address
      : 0,
    },

    InputValidates: {
    Name: isEdit ? true : false,
    Phone: isEdit ? true : false,
    Address: isEdit ? true : false,
    },
    formisValid: isEdit ? true : false,
  });

  // START OF FORM INPUT FUNCTION
  const inputHandler = useCallback(
    (value, isValid, id) => {
      dispatch({
        type: FORM_FILLED,
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );
  // END OF FORM INPUT FUNCTION

  const dispatcher = useDispatch()
  // ADD ROUTE
  const addRouteHandler = async () => {
    const { 
      Name,
      Phone,
      Address,
    } = inputState.InputValues;
    setConfirmRoute("");
    setError('')
    // companyId,busCategoryId,Name, regNo, model, makeId
    try {
      if (isEdit) {
        setIsAddRoute(true);
        await dispatcher(
          bussAction.AddEditFunc(
            {
              name: Name,
              phoneNo: Phone,
              address: Address,
              active: true
            },
            `bus/update-driver/${Id}/${isEdit.Id}`,
            'PUT'
          )
        );
        setIsAddRoute(false);
        setConfirmRoute("Driver Update Updated Successfully");
        props.history.goBack()
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
          bussAction.AddEditFunc(
            {
              name: Name,
              phoneNo: Phone,
              address: Address,
              active: true
            },
            `bus/add-driver/${Id}`,
            'POST'
          )
        );
        setIsAddRoute(false);
        setConfirmRoute(response.Message);
        props.history.goBack()
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAddRoute(false);
    }
  };

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
                      {isEdit ? "Edit Driver" : "Add Driver"}
                    </h1>

                    <form>
                      <Row>

                        <Col lg="6">
                        <Input
                            inputFieldHandler={inputHandler}
                            Label="Name"
                            col="12"
                            id="Name"
                            initialValue={inputState.InputValues.Name}
                          />
                           <Input
                            inputFieldHandler={inputHandler}
                            Label="Phone"
                            col="12"
                            id="Phone"
                            type='number'
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            initialValue={inputState.InputValues.Phone}
                          />
                        </Col>
                        <Col lg='6'>
                        <Input
                            inputFieldHandler={inputHandler}
                            Label="Address"
                            col="12"
                            id="Address"
                            initialValue={inputState.InputValues.Address}
                          />
                        </Col>
                      </Row>
                    </form>

                    <ButtonComp
                      isLoading={isAddRoute}
                      disabled={!inputState.formisValid}
                      onClick={addRouteHandler}
                      Label={`${isEdit ? 'Edit' : 'Add'}`}
                    />
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

export default AddDriver;
