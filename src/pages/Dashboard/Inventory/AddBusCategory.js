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
import ModalComp from "components/Common/Modal";
import * as bussAction from "../../../store/Buss/action";
import seat from "../../../assets/images/seat.png";
import seat2 from "../../../assets/images/seat2.png";
//SimpleBar
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from "../../../components/UI/ErrorOrConfirm";
import { Fetch } from "../../../components/Server/Fetch";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import RadioButton from "../../../components/UI/RadioButton";
import { EditDropdown } from "../../../components/Dropdowns/setEditDropdown";

import { seats } from "components/Common/busType";
import { filter } from "lodash";

const AddBusCategory = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [terminalDropdown, setTerminalDropdown] = useState([]);
  const [seatDropdown, setSeatDropdown] = useState([]);
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState()

  //  RADIO BUTTON SELECTIONS STATE
  const [Wifi, setWifi] = useState(
    props.location?.state?.route.Wifi ? true : false
  );
  const [ExtendedLegspace, setExtendedLegspace] = useState(
    props.location?.state?.route.ExtendedLegspace ? true : false
  );
  const [Movie, setMovie] = useState(
    props.location?.state?.route.Movie ? true : false
  );
  const [ChargingOutlets, setChargingOutlets] = useState(
    props.location?.state?.route.ChargingOutlets ? true : false
  );
  const [Washroom, setWashroom] = useState(
    props.location?.state?.route.Washroom ? true : false
  );
  const [Refreshment, setRefreshment] = useState(
    props.location?.state?.route.Refreshment ? true : false
  );

  const isEdit = props.location?.state?.route;

  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");
  const [busCatDropdown, setBusCatDropdown] = useState({});

  const [seatType, setSeatType] = useState([]);
  const [rowIndex, setRowIndex] = useState(-1);
  const [colIndex, setColIndex] = useState(-1);
  const [tempName, setTempName] = useState(1);
  const [seatTypePopup, setSeatTypePopup] = useState(false);

  // BUSS CATEGORIES
  const busCategoryType = useSelector((state) => state.Bus.bussCategoriesType);

  const { Id } = JSON.parse(localStorage.getItem("userId")) || {};

  // if Edit to set Dropdown
  const { dropdownData } = EditDropdown(
    isEdit,
    busCategoryType,
    isEdit?.TypeId
  );
  useEffect(() => {
    if (dropdownData) {
      setBusCatDropdown(dropdownData);
    }
  }, [dropdownData]);

  const { Loading, isError } = Fetch(bussAction.fetchAllBussCategoriesType());

  const dispatcher = useDispatch();
  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in busCategoryType) {
      options.push({
        label: busCategoryType[key].Name,
        value: busCategoryType[key].Name,
        Id: busCategoryType[key].Id,
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

  // FETCH ALL SEAT TYPSE
  // BUSS CATEGORIES
  const seatTypeData = useSelector((state) => state.Bus.seatType);

  const { Loading: seatLoading } = Fetch(bussAction.fetchAllSeatType());

  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in seatTypeData) {
      options.push({
        label: seatTypeData[key].Name,
        value: seatTypeData[key].Name,
        Id: seatTypeData[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setSeatDropdown(optionGroup);
  }, [seatLoading]);
  // useEffect to set Terminal Dropdown End

  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in seats) {
      options.push({
        label: seats[key].name,
        value: seats[key].name,
        Id: seats[key].id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setModels(optionGroup);
  }, []);
  // useEffect to set Terminal Dropdown End

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: props.location.state?.route
        ? props.location?.state?.route.Name
        : "",
      Capacity: props.location.state?.route
        ? props.location?.state?.route.Capacity
        : 0,
      Rows: props.location.state?.route ? props.location?.state?.route.Rows : 0,
      Columns: props.location.state?.route
        ? props.location?.state?.route.Columns
        : 0,
    },

    InputValidates: {
      Name: isEdit ? true : false,
      Capacity: isEdit ? true : false,
      Rows: true,
      Columns: true,
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
    const { Name, Capacity, Rows, Columns } = inputState.InputValues;
    setConfirmRoute("");
    setError("");
    console.log(Id)
    console.log(seatType)
    // companyId,busCategoryId,Name, regNo, model, makeId
    try {
      if (props.location?.state?.route) {
        setIsAddRoute(true);
        await dispatcher(
          bussAction.AddEditFunc(
            {
              name: Name,
              capacity: Capacity,
              rows: Rows,
              columns: Columns,
              typeId: busCatDropdown.Id,
              wifi: Wifi,
              chargingOutlets: ChargingOutlets,
              extendedLegspace: ExtendedLegspace,
              washroom: Washroom,
              movie: Movie,
              refreshment: Refreshment,
              active: true,
            },
            `bus/update-bus-Category/${Id}/${isEdit.Id}`,
            "PUT"
          )
        );
        setIsAddRoute(false);
        setConfirmRoute("Bus Category Updated Successfully");
        props.history.goBack();
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
          bussAction.AddEditFunc(
            {
              name: Name,
              capacity: Capacity,
              rows: Rows,
              columns: Columns,
              typeId: busCatDropdown.Id,
              wifi: Wifi,
              chargingOutlets: ChargingOutlets,
              extendedLegspace: ExtendedLegspace,
              washroom: Washroom,
              movie: Movie,
              refreshment: Refreshment,
              active: true,
              seats: {
                rows: seatType.rows,
                id: seatType.id
              }
            },
            `bus/add-bus-Category/${Id}`,
            'POST'
          )
        );
        setIsAddRoute(false);
        setConfirmRoute(response.Message);
        props.history.goBack();
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAddRoute(false);
    }
  };

  // SET DROPDOWN
  const dropdownSetHandler = (item) => {
    setBusCatDropdown({ name: item.label, label: item.label, Id: item.Id });
  };

  // SET CHAGNE SEAT TYPE
  const changeSeatTypeHandler = (rIndex, cIndex) => {
    setRowIndex(rIndex);
    setColIndex(cIndex);
    setSeatTypePopup(true);
  };

  useEffect(() => {
    if (selectedModel === undefined) {
      return
    }else{
      console.log(selectedModel)
      const filteredModel = seats.filter(item => item.id === selectedModel.Id)
      console.log(filteredModel)
      setSeatType(filteredModel[0])
    }
  }, [selectedModel]);

  // SET SEAT TYPE HANDLER
  const SeatTypeHandler = (item) => {
    setIsLoading(true);
    const seatTemp = seatType;
    seatTemp.rows[rowIndex].columns[colIndex] = {
      name: item.value,
      seatType: item.Id,
      active: true,
    };
    setSeatType(seatTemp);
    setIsLoading(false);
    setSeatTypePopup(false);
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
            <ErrorOrConfirm error={error} confirmRoute={confirmRoute} />
            <ModalComp
              size="md"
              setIsStopAddPopup={() => console.log(setSeatTypePopup(false))}
              title="Arrange Seats"
              isStopAddPopup={seatTypePopup}
            >
              <Row>
                <Col lg="12">
                  <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                    <Label>Seat Type</Label>
                    <Select
                      onChange={(item) => {
                        SeatTypeHandler(item);
                      }}
                      options={seatDropdown}
                      classNamePrefix="select2-selection"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalComp>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h1 className="card-title">
                      {props.location.state?.route
                        ? "Edit Bus Category"
                        : "Add Bus Category"}
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
                            Label="Capacity"
                            col="12"
                            id="Capacity"
                            type="number"
                            min={1}
                            initialValue={inputState.InputValues.Capacity}
                          />
                          {/* <Input
                            inputFieldHandler={inputHandler}
                            Label="Columns"
                            col="12"
                            id="Columns"
                            type="number"
                            min={1}
                            initialValue={inputState.InputValues.Columns}
                          /> */}
                        </Col>
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Bus Category</Label>
                            <Select
                              onChange={(item) => {
                                dropdownSetHandler(item);
                              }}
                              options={terminalDropdown}
                              classNamePrefix="select2-selection"
                              value={busCatDropdown}
                            />
                          </FormGroup>
                          {/* <Input
                            inputFieldHandler={inputHandler}
                            Label="Rows"
                            col="12"
                            id="Rows"
                            type="number"
                            min={1}
                            initialValue={inputState.InputValues.Rows}
                          /> */}
                          {isEdit ? null : (
                                  <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                                  <Label>Select Models</Label>
                                  <Select
                                    onChange={(item) => {
                                      setSelectedModel(item)
                                    }}
                                    options={models}
                                    classNamePrefix="select2-selection"
                                    value={selectedModel}
                                  />
                                </FormGroup>
                          )}
                    
                        </Col>
                      </Row>
                    </form>

                    <Row>
                      <Col lg="6">
                        <Row>
                          <Col lg="6">
                            <RadioButton
                              htmlFor="customCheck-outlinecolor1"
                              checked={Wifi}
                              setCustomRadioHandler={() => setWifi(!Wifi)}
                              Label="Wifi"
                            />
                            <RadioButton
                              htmlFor="customCheck-outlinecolor2"
                              checked={ExtendedLegspace}
                              setCustomRadioHandler={() =>
                                setExtendedLegspace(!ExtendedLegspace)
                              }
                              Label="Extended Legspace"
                            />
                            <RadioButton
                              htmlFor="customCheck-outlinecolor3"
                              checked={Movie}
                              setCustomRadioHandler={() => setMovie(!Movie)}
                              Label="Movie"
                            />
                          </Col>
                          <Col lg="6">
                            <RadioButton
                              htmlFor="customCheck-outlinecolor4"
                              checked={ChargingOutlets}
                              setCustomRadioHandler={() =>
                                setChargingOutlets(!ChargingOutlets)
                              }
                              Label="Charging Outlets"
                            />
                            <RadioButton
                              htmlFor="customCheck-outlinecolor5"
                              checked={Washroom}
                              setCustomRadioHandler={() =>
                                setWashroom(!Washroom)
                              }
                              Label="Washroom"
                            />
                            <RadioButton
                              htmlFor="customCheck-outlinecolor6"
                              checked={Refreshment}
                              setCustomRadioHandler={() =>
                                setRefreshment(!Refreshment)
                              }
                              Label="Refreshment"
                            />
                          </Col>
                        </Row>
                      </Col>
                      {isEdit ? null : (
                      <Col lg="6">
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {selectedModel === undefined ? <p>Please Select Model</p> : (
                              <div
                              style={{
                                width: 350,
                                borderRadius: 8,
                                borderColor: "white",
                                borderWidth: 1,
                                backgroundColor: "#2E3548",
                                paddingTop: 20,
                                paddingLeft: 20,
                                paddingRight: 20,
                                paddingBottom: 20,
                                justifyContent:'flex-start'
                              }}
                            >
                              {seatType?.rows?.map((item, rowIndex) => (
                                <Row style={{ justifyContent: "flex-start" }}>
                                  {item.columns.map((column, index) => (
                                    <img
                                      onClick={() =>
                                        changeSeatTypeHandler(rowIndex, index)
                                      }
                                      src={column.seatType === 3 ? seat : seat2}
                                      style={{
                                        width: 65,
                                        marginRight: index === 1 ? 30 : 5,
                                        marginLeft: index === 2 ? 10 : 0,
                                        marginBottom:5
                                      }}
                                    ></img>
                                  ))}
                                </Row>
                              ))}
                            </div>
                          )}      
                        </div>
                      </Col>
                      )}
                    </Row>

                    <ButtonComp
                      isLoading={isAddRoute}
                      disabled={!inputState.formisValid}
                      onClick={addRouteHandler}
                      Label={`${isEdit ? "Edit" : "Add"}`}
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

export default AddBusCategory;
