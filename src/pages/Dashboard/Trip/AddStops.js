import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  InputGroup,
  Label,
  Row,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Select from "react-select";
import {
  formReducer,
  FORM_FILLED,
} from "../../../components/Forms/formReducer";
import Input from "../../../components/Forms/Input";
import { MDBDataTable, MDBBtn } from "mdbreact";
import * as routeActions from "../../../store/Route/action";
import { TerminalActions, CompanyActions } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import { tableIcons } from "../../../assets/Icon/MaterialUiIcon";

import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";

// Dummy Stops
const stops = [
  {
    id: 1,
    stops: "Hyderabad",
  },
  {
    id: 2,
    stops: "Karachi",
  },
  {
    id: 3,
    stops: "Karachi",
  },
  {
    id: 4,
    stops: "Karachi",
  },
];

const optionGroup = [
  {
    label: "Make",
    options: [
      { label: "Toyota Bus", value: "Toyota Bus" },
      { label: "Honda", value: "Honda" },
      { label: "Faw", value: "Faw" },
    ],
  },
];

const AddStop = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [isRouteUpdate, setIsRouteUpdate] = useState(false);
  const [terminalDropdown, setTerminalDropdown] = useState([]);

  const [routeSuccessCreate, setIsRouteSuccessCreate] = useState(false);

  // REDUX STATE
  const routeData = useSelector((state) => state.Route.routes);
  const terminals = useSelector((state) => state.Terminal.terminals);
  const Companies = useSelector((state) => state.Company.company);
  console.log("My Data is");
  console.log(routeData);

  // FETCH ROUTE FROM SERVER
  const dispatcher = useDispatch();
  useEffect(() => {
    const fetchRoute = async () => {
      setIsLoading(true);
      if (terminals.length === 0) {
        await dispatcher(TerminalActions.fetchAllTerminal(1));
      }
      if (Companies.length === 0) {
        await dispatcher(CompanyActions.fetchAllCompanies());
      }
      setIsLoading(false);
    };
    fetchRoute();
  }, []);
  // END FETCH ROUTE FROM SERVER

  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in terminals) {
      options.push({
        label: terminals[key].Name,
        value: terminals[key].Name,
        Id: terminals[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setTerminalDropdown(optionGroup);
  }, [terminals]);
  // useEffect to set Terminal Dropdown End

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: "",
      TerminalFrom: 0,
      TerminalTo: 0,
    },

    InputValidates: {
      Name: false,
      TerminalFrom: false,
      TerminalTo: false,
    },
    formisValid: false,
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
    const { Name, TerminalFrom, TerminalTo } = inputState.InputValues;
    try {
      setIsAddRoute(true);
      await dispatcher(
        routeActions.addRoute(
          Name,
          parseInt(TerminalFrom),
          parseInt(TerminalTo),
          1
        )
      );
      setIsAddRoute(false);
      setIsRouteSuccessCreate(true);
    } catch (err) {
      console.log(err);
      setIsAddRoute(false);
    }
  };

  // DELETE ROUTE HANDLER
  const deleteRouteHandler = async (rowData) => {
    console.log(rowData);
    try {
      setIsAddRoute(true);
      await dispatcher(routeActions.deleteRoute(rowData.Id));
      setIsAddRoute(false);
    } catch (err) {
      console.log(err);
      setIsAddRoute(false);
    }
  };

  // UPDATE ROUTE HANDLER
  const routeUpdateHandler = async (newData) => {
    console.log(newData);
    try {
      setIsRouteUpdate(true);
      await dispatcher(routeActions.updateRoute(newData));
      setIsRouteUpdate(false);
    } catch (err) {
      console.log(err);
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
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h1 className="card-title">Add Stop</h1>

                    <form>
                      <Row>
                        <Col lg="12">
                          <Input
                            inputFieldHandler={inputHandler}
                            Label="Name"
                            col="12"
                            id="Name"
                          />
                        </Col>

                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Terminal From</Label>
                            <Select
                              onChange={({ Id }) => {
                                inputHandler(Id, true, "TerminalFrom");
                              }}
                              options={terminalDropdown}
                              classNamePrefix="select2-selection"
                              isLoading={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Terminal To</Label>
                            <Select
                              onChange={({ Id }) => {
                                inputHandler(Id, true, "TerminalTo");
                              }}
                              options={terminalDropdown}
                              classNamePrefix="select2-selection"
                              isLoading={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </form>

                    <div className="button-items">
                      {isAddRoute ? (
                        <button
                          type="button"
                          className="btn btn-primary waves-effect waves-light"
                        >
                          <i className="bx bx-loader bx-spin font-size-16 align-middle mr-2"></i>{" "}
                          Please Wait
                        </button>
                      ) : (
                        <Button
                          color="primary"
                          className="btn btn-primary waves-effect waves-light"
                          data-toggle="button"
                          aria-pressed="false"
                          disabled={!inputState.formisValid}
                          onClick={addRouteHandler}
                        >
                          Add Trip
                        </Button>
                      )}
                    </div>

                    {/* TABLES START HERE */}
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {routeSuccessCreate ? (
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                    <Row>
                      <Col lg="6">
                        <h1 className="card-title">Stops</h1>
                      </Col>
                      <Col
                        lg="6"
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "flex-end",
                          marginBottom: 10,
                        }}
                      >
                        <Button
                          color="primary"
                          className="btn btn-primary waves-effect waves-light"
                          data-toggle="button"
                          aria-pressed="false"
                          // onClick={() => props.history.push("./AddTrips")}
                        >
                          Add Stop
                        </Button>
                      </Col>
                    </Row>
                    {isRouteUpdate ? (
                      <div
                        className="spinner-border text-success m-1"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <MaterialTable
                        isLoading={isAddRoute}
                        icons={tableIcons}
                        title="Routes"
                        columns={[
                          { title: "Name", field: "Name" },
                          { title: "Terminal From", field: "TerminalFrom" },
                          {
                            title: "Terminal To",
                            field: "TerminalTo",
                          },
                        ]}
                        data={routeData}
                        editable={{
                          onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                console.log(newData);
                                routeUpdateHandler(newData);

                                resolve();
                              }, 1000);
                            }),
                          onRowUpdateCancelled: (rowData) =>
                            console.log("Row editing cancelled"),
                        }}
                        // options={{filtering: true}}
                        onSearchChange={(e) => console.log(e)}
                        onChangePage={(e) => console.log(e)}
                        actions={[
                          (rowData) => ({
                            icon: "Export",
                            tooltip: "Delete",
                            onClick: (event, rowData) =>
                              deleteRouteHandler(rowData),
                          }),
                        ]}
                      />
                    )}

                      {/* TABLES START HERE */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </Container>
        </div>
      </React.Fragment>
    );
  }
};

export default AddStop;
