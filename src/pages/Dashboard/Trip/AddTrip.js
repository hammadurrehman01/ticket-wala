import React, { useState, useReducer, useCallback, useEffect } from "react";
import {Card,CardBody,Col,Container,FormGroup,Label,Row} from "reactstrap";
import Select from "react-select";
import {formReducer,FORM_FILLED,} from "../../../components/Forms/formReducer";
import Input from "../../../components/Forms/Input";
import * as routeActions from "../../../store/Route/action";
import { TerminalActions, CommonAction } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import MaterialTableComp from ".././../../components/Table/MateralTable";
import TableHeader from "../../../components/UI/TableHeader";
import Title from "../../../components/UI/Title";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from "../../../components/UI/ErrorOrConfirm";
import { EditDropdown } from "../../../components/Dropdowns/setEditDropdown";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { Fetch } from "components/Server/Fetch";
import ModalComp from "components/Common/Modal";
import RadioButton from "components/UI/RadioButton";

import { useParams } from "react-router-dom";
import TerminalDropdownAsPerCity from "../../../components/Common/TerminalDropdownAsPerCity";

// COLUMNS
const column = [
  { title: "Terminal From", field: "TerminalName" },
  { title: "City Name", field: "CityName" },
  { title: "Ticketable", field: "Ticketable" },
];

const AddTrip = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTerminalLoading, setTerminalLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [isRouteUpdate, setIsRouteUpdate] = useState(false);
  const [isStopRowData, setStopRowData] = useState(undefined);
  const [terminalDropdown, setTerminalDropdown] = useState([]);
  const [cityDropdown, setCityDropdown] = useState([]);
  const [search, setSearch] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");
  const [isTerminalAddPopup, setIsTerminalAddPopup] = useState(false);
  const [busCatDropdown, setBusCatDropdown] = useState({});

  // CITY DRODPOWN
  const [cityToDropdown, setCityToDropdown] =  useState(null)
  const [cityFromDropdown, setCityFromDropdown] =  useState(null)

  // TERMINALS DROPDOWN
  const [terminalFromDropdown, setTerminalFromDropdown] = useState([]);
  console.log(terminalFromDropdown)
  const [terminalToDropdown, setTerminalToDropdown] = useState([]);
  const [terminalFromDropdownCityId, setTerminalFromDropdownCityId] = useState([]);
  const [terminalToDropdownCityId, setTerminalToDropdownCityId] = useState([]);

  // ADD TERMINAL STATES
  const [newTerminalName, setNewTerminalName] = useState("");
  const [newTerminalCity, setNewTerminalCity] = useState({});

  // ADD STOP DROPDOWN STATES
  const [stopCity, setStopCity] = useState({})
  const [addStopTerminals, setAddStopsTerminals] = useState([])
  const [stopTicketable, setStopTicketable] = useState(false)
  const [selectedStopTerminalId, setSelectedStopTerminalId] = useState(null)

  // Edit Route
  const isEdit = props.location?.state?.route;

  // LOGIN USER ID
  const { Id: userId } = JSON.parse(localStorage.getItem("userId")) || {};
  const [routeId, setRouteId] = useState(isEdit ? isEdit.Id : "");
  const [isStopAddPopup, setIsStopAddPopup] = useState(false);
  const [routeSuccessCreate, setIsRouteSuccessCreate] = useState(isEdit ? true : false);
  let { id } = useParams();

    // REDUX STATES
    const terminals = useSelector((state) => state.Terminal.terminals);
    const stopsData = useSelector((state) => state.Route.stops);
    console.log(stopsData)
    const pagingInfo = useSelector((state) => state.Route.stopPagingInfo);
    console.log(pagingInfo)

  // FETCH ALL CITIES
  const countries = useSelector((state) => state.Common.countries);
  const { Loading: cityLoad, isError } = Fetch(CommonAction.fetchCountries());
  

  // REDUX STATES OF REDUCER 
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: props.location.state?.route ? isEdit.Name : "",
      TerminalFrom: 0,
      TerminalTo: 0,
      StopTerminal: 0,
      city: 0,
    },

    InputValidates: {
      Name: isEdit ? true : false,
      TerminalFrom: isEdit ? true : false,
      TerminalTo: isEdit ? true : false,
      StopTerminal: isEdit ? true : true,
      city: isEdit ? true : true,
    },
    formisValid: isEdit ? true : false,
  });

    // FUNCTION WHICH UPDATES ABOVE REDUCER STATES
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

  //___________________ ENDS HERE

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
    setCityDropdown(optionGroup);
  }, [cityLoad]);

  

  // SET TERMINAL TO AND TERMINAL FROM DROPDOWN
  const { dropdownData } = EditDropdown(
    isEdit,
    terminals,
    isEdit?.BusCategoryId
  );
  useEffect(() => {
    if (dropdownData) {
      setBusCatDropdown(dropdownData);
    }
  }, [dropdownData]);

  // FETCH TERMINAL IF EMPTY FROM SERVER
  const dispatcher = useDispatch();
  // const {Loading, isError} = Fetch(TerminalActions.fetchAllTerminal(1), terminals)

  const fetchRouteStopHandler = async () => {
    try {
      setIsRouteUpdate(true);
      await dispatcher(
        routeActions.fetchRouteStops(
          pageSize,
          pageIndex,
          userId,
          routeId,
          search
        )
      );
      setIsRouteUpdate(false);
    } catch (err) {
      setError(err);
      setIsRouteUpdate(false);
    }
  };

  const setPageIndexHandler = (pageSize, pageIndex) => {
    setPageIndex(pageIndex);
  };
  
  // USEFFECT TO CHECK IF SEARCH VALUE CHANGE AND RUN FETCH
  useEffect(() => {
    if (routeId !== "") {
      fetchRouteStopHandler(10, 1);
    }
  }, [search, routeId, pageIndex]);

  const fetchTerminals = async () => {
    try {
      setTerminalLoading(true);
      await dispatcher(
        TerminalActions.fetchAllTerminal(
          0,
          undefined,
          undefined,
          null,
          inputState.InputValues.city
        )
      );
      setTerminalLoading(false);
    } catch (err) {
      setTerminalLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    fetchTerminals();
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

  // SET CITY TO AND CITY FROM DROPDWN WHEN ISEDIT
  useEffect(()=>{
    if(isEdit) {
      if(countries.length !==0 && terminals.length !==0) {

        let TerminalToSplit = isEdit.TerminalTo.split(", ")
        let TerminalToCityId = countries.find(item=> item.Name === TerminalToSplit[1]) 
        setCityToDropdown({
          label: TerminalToCityId?.Name,
          value: TerminalToCityId?.Name,
          Id: TerminalToCityId?.Id,
        })
        updateTerminalDropdownHandler(TerminalToCityId?.Id, 'TerminalTo')
  
        let TerminalFromSplit = isEdit.TerminalFrom.split(", ")
        let TerminalFromCityId = countries.find(item=> item.Name === TerminalFromSplit[1])
        setCityFromDropdown({
          label: TerminalFromCityId?.Name,
          value: TerminalFromCityId?.Name,
          Id: TerminalFromCityId?.Id,
        })
        updateTerminalDropdownHandler(TerminalFromCityId?.Id, 'TerminalFrom')
      } 
    }
  },[countries])

  // City Dropdown End here

  // FUNCTION WHICH UPDATE TERMINASL DROPDWONS AS PER CITY SELECTIONS
  const updateTerminalDropdownHandler = useCallback(
    async (id, option) => {

      let filteredTerminal = terminals.filter((item) => item.CityId === id);
      console.log(filteredTerminal)
      console.log(terminals)

      let options = [];
      for (let key in filteredTerminal) {
        options.push({
          label: filteredTerminal[key].Name,
          value: filteredTerminal[key].Name,
          Id: filteredTerminal[key].Id,
        });
      }
      const optionGroup = [
        {
          options,
        },
      ];

      if (option === "TerminalFrom") {
        setTerminalFromDropdown(optionGroup);
        setTerminalFromDropdownCityId(id);
      }
      if (option === "TerminalTo") {
        setTerminalToDropdown(optionGroup);
        setTerminalToDropdownCityId(id);
      }
      if (option === "StopCity") {
        setAddStopsTerminals(optionGroup);
      }
    },
    [terminals]
  );



  // ------------------------STOP ADD EDIT DELETE FUNCTIONS BELOW ----------------------------//
  // DELETE STOP HANDLER
  const deleteStopHandler = async (rowData) => {
    setConfirmRoute("");
    setError("");
    try {
      await dispatcher(routeActions.deleteStop(rowData.Id, userId));
      setConfirmRoute("Stop Deleted Successfully");
      if (stopsData.length === 1 && pageIndex > 1) {
        setPageIndex(pageIndex - 1);
      } else {
        fetchRouteStopHandler();
      }
    } catch (err) {
      console.log(err);
      setIsRouteUpdate(false);
      setError(err);
    }
  };
  // DELETE STOP ENDS HERE

  // ADD STOP HANDLER
  const addStopHandler = async () => {
    setIsStopAddPopup(false);
    setConfirmRoute("");
    setError("");
    console.log('Yes m wrking')
    if (isStopRowData === undefined) {
      try {
        await dispatcher(routeActions.addStops(selectedStopTerminalId.Id, userId, routeId, stopTicketable));
        fetchRouteStopHandler();
        setStopTicketable(false)
        setConfirmRoute("Stop Add Successfully");
        setSelectedStopTerminalId(null)
        setStopCity({})
      } catch (err) {
        console.log(err);
        setStopTicketable(false)
        setError(err);
      }
    } else {
      try {
        await dispatcher(routeActions.UpdateStop(userId, isStopRowData.Id, selectedStopTerminalId.Id,stopTicketable));
        fetchRouteStopHandler();
        setStopTicketable(false)
        setConfirmRoute("Stop Updated Successfully");
        setSelectedStopTerminalId(null)
        setStopCity({})
      } catch (err) {
        console.log(err);
        setStopTicketable(false)
        setError(err);
      }
    }
  };

  // ADD STOP HANDLER
  const EditStopHandler = async (rowData) => {
    setStopRowData(rowData);
    updateTerminalDropdownHandler(rowData.CityId, 'StopCity')
    setStopTicketable(rowData.Ticketable)
    setStopCity({
      label: rowData.CityName,
      value: rowData.CityName,
      Id: rowData.CityId,
    })
    setSelectedStopTerminalId({
      label: rowData.TerminalName,
      value: rowData.TerminalName,
      Id: rowData.TerminalId,
    })
    setIsStopAddPopup(true);
  };

  // ADD STOP BUTTON HANDLER
  const AddStopButtonHandler = () => {
    setStopRowData(undefined);
    setIsStopAddPopup(true);
  };

    // ------------------------STOP ADD EDIT DELETE FUNCTIONS END HERE ----------------------------//

  
  const setSearchHandler = (e) => {
    setPageIndex(1);
    setSearch(e);
  };

  // -----------BELOW FUNCTION RUNS WHEN USER ADD NEW TERMINAL ----------------------------//
  const addNewTerminalHandler = async () => {
    try {
      setTerminalLoading(true);
      const response = await dispatcher(
        TerminalActions.addTerminal(newTerminalName, newTerminalCity.Id, userId)
      );

      if (response.success) {
        let options = [];
        if (newTerminalCity.Id === terminalToDropdownCityId) {
          options = terminalToDropdown[0].options;
        } else if (newTerminalCity.Id === terminalFromDropdownCityId) {
          options = terminalFromDropdown[0].options;
        }
        options.push({
          label: newTerminalName,
          value: newTerminalName,
          Id: response.dataId,
        });
        let optionGroup = [
          {
            options,
          },
        ];
        if (newTerminalCity.Id === terminalToDropdownCityId) {
          setTerminalToDropdown(optionGroup);
        } else if (newTerminalCity.Id === terminalToDropdownCityId) {
          setTerminalFromDropdown(optionGroup);
        }
        fetchTerminals();
        setTerminalLoading(false);
        setIsTerminalAddPopup(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // -----------BELOW FUNCTION RUNS WHEN USER ADD NEW TERMINAL END HERE----------------------------//

  //--------------------- BELOW FUNCTION RUN WHEN USER ADD/EDIT ROUTE --------------------//
  const addRouteHandler = async () => {
    const { Name, TerminalFrom, TerminalTo } = inputState.InputValues;
    setConfirmRoute("");
    setError("");
    try {
      if (isEdit) {
        setIsAddRoute(true);
        await dispatcher(
          routeActions.updateRoute(
            Name,
            TerminalTo,
            TerminalFrom,
            routeId,
            userId
          )
        );
        setIsAddRoute(false);
        setConfirmRoute("Route Updated Successfully");
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
          routeActions.addRoute(
            Name,
            parseInt(TerminalFrom),
            parseInt(TerminalTo),
            userId
          )
        );
        setIsAddRoute(false);
        setIsRouteSuccessCreate(true);
        setRouteId(response.dataId);
        setConfirmRoute(response.Message);
        // props.history.goBack()
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAddRoute(false);
    }
  };

  // -----------------ROUTE ADD/EDIT END HERE -----------------------------//

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
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Title
                      title={
                        props.location.state?.route ? "Edit Route" : "Add Route"
                      }
                    />
                    <form>
                      <Row>
                        <Col lg="12">
                          <Input
                            inputFieldHandler={inputHandler}
                            Label="Name"
                            col="12"
                            id="Name"
                            initialValue={inputState.InputValues.Name}
                          />
                        </Col>
                        {/* CITY DROPDOWN */}
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>City (Terminal To)</Label>
                            <Select
                              onChange={(e) => {
                                setCityToDropdown(e),
                                updateTerminalDropdownHandler(e.Id, "TerminalTo");
                              }}
                              options={cityDropdown}
                              classNamePrefix="select2-selection"
                              value={cityToDropdown}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>City (Terminal From)</Label>
                            <Select
                              onChange={(e) => {
                                setCityFromDropdown(e),
                                updateTerminalDropdownHandler(
                                  e.Id,
                                  "TerminalFrom"
                                );
                              }}
                              options={cityDropdown}
                              classNamePrefix="select2-selection"
                              value={cityFromDropdown}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* FIRST ROW END HERE */}
                      {/* SECOND ROW STARTS HERE */}
                      <Row>
                        {cityToDropdown === null ? null : (
                           <TerminalDropdownAsPerCity
                           isTerminalLoading={isTerminalLoading}
                           terminalDropdown={terminalToDropdown}
                           setIsTerminalAddPopup={setIsTerminalAddPopup}
                           Label="Terminal To"
                           Id="TerminalTo"
                           isEdit={isEdit}
                           setIsTerminalAddPopup={setIsTerminalAddPopup}
                           inputHandler={inputHandler}
                           terminalValue={isEdit?.TerminalTo}
                           terminalId={isEdit?.TerminalToId}
                         />
                        )}
                       {cityFromDropdown === null ? null : (
                        <TerminalDropdownAsPerCity
                          isTerminalLoading={isTerminalLoading}
                          terminalDropdown={terminalFromDropdown}
                          setIsTerminalAddPopup={setIsTerminalAddPopup}
                          Label="Terminal From"
                          Id="TerminalFrom"
                          isEdit={isEdit}
                          setIsTerminalAddPopup={setIsTerminalAddPopup}
                          inputHandler={inputHandler}
                          terminalValue={isEdit?.TerminalFrom}
                          terminalId={isEdit?.TerminalFromId}
                        />
                       )}
                      </Row>
                    </form>

                    <ButtonComp
                      isLoading={isAddRoute}
                      disabled={!inputState.formisValid}
                      onClick={addRouteHandler}
                      Label="Save"
                    />
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
                      <TableHeader
                        title="Stops"
                        history={props.history}
                        buttonText="Add Stop"
                        onClick={AddStopButtonHandler}
                        searchValue={(e) => setSearchHandler(e)}
                      />

                      {/* TABLES START HERE */}

                      <MaterialTableComp
                        isAddRoute={isAddRoute}
                        isLoading={isRouteUpdate}
                        title="Route"
                        routeData={stopsData}
                        PageIndex={pagingInfo.PageIndex}
                        TotalCount={pagingInfo.TotalCount}
                        fetchRouteHandler={setPageIndexHandler}
                        deleteRouteHandler={deleteStopHandler}
                        history={props.history}
                        EditHandler={EditStopHandler}
                        Popup
                        Link={"./AddTrips"}
                        columns={column}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
            <ModalComp
              title="Add Stops"
              setIsStopAddPopup={() => setIsStopAddPopup(false)}
              isStopAddPopup={isStopAddPopup}
            >
               <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>City</Label>
                            <Select
                              onChange={(e) => {
                                setStopCity(e),
                                updateTerminalDropdownHandler(e.Id, "StopCity");
                              }}
                              options={cityDropdown}
                              classNamePrefix="select2-selection"
                              value={stopCity}
                            />
                          </FormGroup>
                          {addStopTerminals?.length !== 0 ? (
                             <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                             <Label>Select Terminal</Label>
                             <Select
                               onChange={(e) => {
                                //  addStopHandler(Id);
                                setSelectedStopTerminalId(e)
                               }}
                               options={addStopTerminals}
                               classNamePrefix="select2-selection"
                               value={selectedStopTerminalId}
                             />
                           </FormGroup>
                          ): null}
                          <RadioButton htmlFor={'ticketable'} checked={stopTicketable} Label="Ticketable" setCustomRadioHandler={()=> setStopTicketable(!stopTicketable)} />
                          <ButtonComp
                      isLoading={false}
                      disabled={selectedStopTerminalId === null ? true : false}
                      onClick={addStopHandler}
                      Label="Add Stop"
                    />
            </ModalComp>

            <ModalComp
              title="Add Terminal"
              setIsStopAddPopup={() => setIsTerminalAddPopup(false)}
              isStopAddPopup={isTerminalAddPopup}
            >
              <Row>
                <Col lg="6">
                  <Input
                    inputFieldHandler={(value) => setNewTerminalName(value)}
                    Label="Name"
                    col="12"
                    id="Name"
                  />
                </Col>
                <Col lg="6">
                  <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                    <Label>City Name</Label>
                    <Select
                      onChange={(item) => {
                        setNewTerminalCity(item);
                      }}
                      options={cityDropdown}
                      classNamePrefix="select2-selection"
                      // value={cityDropdown}
                    />
                  </FormGroup>
                </Col>
                <Col lg="12">
                  <ButtonComp
                    isLoading={isAddRoute}
                    disabled={false}
                    onClick={addNewTerminalHandler}
                    Label="Add Terminal"
                  />
                </Col>
              </Row>
            </ModalComp>
            {/* Modal Start from here */}
          </Container>
        </div>
      </React.Fragment>
    );
  }
};

export default AddTrip;
