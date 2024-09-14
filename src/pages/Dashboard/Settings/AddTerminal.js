import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
  Modal,
} from "reactstrap";
import Select from "react-select";
import {
  formReducer,
  FORM_FILLED,
} from "../../../components/Forms/formReducer";
import Input from "../../../components/Forms/Input";
import * as routeActions from "../../../store/Route/action";
import { TerminalActions,CommonAction } from "../../../store/actions";

import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from '../../../components/UI/ErrorOrConfirm'
import {Fetch} from '../../../components/Server/Fetch'
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import {EditDropdown} from '../../../components/Dropdowns/setEditDropdown'
import { isPropsValid } from "@fullcalendar/react";



const AddTerminal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [terminalDropdown, setTerminalDropdown] = useState([]);

console.log(props)
  const [cityDropDown, setCityDropDown] = useState({})
  const [cityDropdownVerification, setCityDropdownVerification] = useState(false)

  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");

  const isEdit = props.location?.state?.route;
  console.log(isEdit)

  const [routeId, setRouteId] = useState(
    isEdit ? isEdit.Id : ""
  );

  const [routeSuccessCreate, setIsRouteSuccessCreate] = useState(
    isEdit ? true : false
  );

  const countries = useSelector(state => state.Common.countries)

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

   // SET ROUTE DROPDOWN WHEN EDIT
   const {dropdownData} = EditDropdown(isEdit,countries,isEdit?.CityId)
   useEffect(()=>{
     if(dropdownData){
      setCityDropDown(dropdownData)
     }
   },[dropdownData])

  const {Loading, isError} = Fetch(CommonAction.fetchCountries())
  const dispatcher = useDispatch()
  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in countries) {
      options.push({
        label: countries[key].Name,
        value: countries[key].Name,
        Id: countries[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setTerminalDropdown(optionGroup);
  }, [Loading]);
  // useEffect to set Terminal Dropdown End

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: props.location.state?.route
        ? isEdit.Name
        : "",
      citySelected : false
    },

    InputValidates: {
      Name: isEdit ? true : false,
      citySelected: isEdit ? true : false
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

  // ADD ROUTE
  const addRouteHandler = async () => {
    const { Name } = inputState.InputValues;
    setConfirmRoute("");
    setError('')
    try {
      if (isEdit) {
        setIsAddRoute(true);
        await dispatcher(
          TerminalActions.UpdateTerminal(Name, cityDropDown.Id, Id, isEdit.Id)
        );
        setIsAddRoute(false);
        setConfirmRoute("Terminal Updated Successfully");
        props.history.goBack()
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
          TerminalActions.addTerminal(
            Name,
            cityDropDown.Id,
            Id
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
                      {props.location.state?.route ? "Edit Terminal" : "Add Terminal"}
                    </h1>

                    <form>
                      <Row>

                        <Col lg="6">
                        <Input
                            inputFieldHandler={inputHandler}
                            Label="Name"
                            required
                            col="12"
                            id="Name"
                            initialValue={inputState.InputValues.Name}
                          />
                        </Col>
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>City Name</Label>
                            <Select
                              onChange={(item) => {
                                setCityDropDown(item),
                                inputHandler(true, true, 'citySelected')
                              }}
                              options={terminalDropdown}
                              classNamePrefix="select2-selection"
                              value={cityDropDown}
                            />
                          </FormGroup>
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

export default AddTerminal;
