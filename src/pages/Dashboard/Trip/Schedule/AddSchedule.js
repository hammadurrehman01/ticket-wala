import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Label,
  Row,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Input from "../../../../components/Forms/Input";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import * as bussAction from "../../../../store/Buss/action";
import { useDispatch, useSelector } from "react-redux";
import { Fetch } from "../../../../components/Server/Fetch";
import * as routeActions from "../../../../store/Route/action";
import RadioButton from "../../../../components/UI/RadioButton";
import ErrorOrConfirm from "../../../../components/UI/ErrorOrConfirm";
import ButtonComp from "../../../../components/UI/Button";
import {EditDropdown} from '../../../../components/Dropdowns/setEditDropdown'
import { TerminalActions } from "../../../../store/actions";
import { useParams } from "react-router";
import {Api} from '../../../../common/Api'
import classnames from "classnames"
import NavLinkComp from "components/UI/NavLinkComp";
import { Redirect } from 'react-router-dom';

const optionGroup = [
  {
    options: [
      { label: "Daily", value: "Daily", Id: 0 },
      { label: "Weekly", value: "Weekly", Id: 1 },
      { label: "Custom", value: "Custom", Id: 2 },
    ],
  },
];

const typeDropdown = [
  {
    options: [
      { label: "Ticketable", value: "Ticketable", Id: 0 },
      { label: "Schedule", value: "Schedule", Id: 1 },
    ],
  },
];

const AddSchedule = (props) => {

  const [selectedMulti1, setselectedMulti1] = useState(0);
  const [availableOnValue, setAvailableOnValue] = useState({
    label: "Daily",
    value: "Daily",
    Id: 0,
  });


  const [inputFields, setInputFields] = useState([{ date: "Date 1" }]);
  const [customeDate, setCustomDates] = useState([]);
  const [busCategoryDropdown, setBusCategoryDropdown] = useState({});

  const [busCatDropDownData, setBusCatDropDownData] = useState({})
  const [routeDropDown, setRouteDropDown]= useState({})
  const [routeDropdown, setRouteDropdown] = useState({});

  const [confirmRoute, setConfirmRoute] = useState("");
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState()

  // WEEKDAYS
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [stopData, setStopData] = useState([])
  const [terminalDropdown, setTerminalDropdown] = useState([])
  const [scheduleNotFound, setScheduleNotFound] = useState(false)
  const [stopArrivalTime, setStopArrivalTime] = useState('')
  console.log(stopArrivalTime)
  const [stopDepartureTime, setStopDepartureTime] = useState('')
  const [isUserEdit, setIsUserEdit] = useState(false)
  // FORMS FIELDS STATES
    // STATS FOR FIELD
    const [name, setName] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endFrom, setEndFrom] = useState('');
    const [noOfDays, setNoOfDays] = useState('');
    const [busCatId, setBusCatId] = useState(0)
    const [routeId, setRouteId] = useState(0)

    const [isTicketable, setIsTicketable] = useState(true)

  // // When Edit Route
  // const isEdit = props.location.state?.route;
  // console.log(isEdit)

  // LOGIN USER ID
  const {Id : userId} = JSON.parse(localStorage.getItem("userId")) || {}
  
  const {id} = useParams()
  const [schedleId, setScheduleId] = useState(
    id ? id : ""
  );

// useEffect to set Schedule Id and schedule Data

const fetchScheduleData = async() =>{
  try{
    const response = await fetch(`${Api}bus-schedule/schedule/${id}/${userId}`, {
      method: "GET",
    });
    const resData = await response.json();

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }else{
      setScheduleId(id)
      setStopData(resData.stopdata)
      setStopArrivalTime(resData.stopdata[0].ArrivalTime?.slice(11))
      setStopDepartureTime(resData.stopdata[0].DepartureTime?.slice(11))
      setName(resData.data.Name)
      setDepartureTime(resData.data.DepartureTime?.slice(11))
      setArrivalTime(resData.data.ArrivalTime?.slice(11))
      setStartDate(resData.data.StartDate?.slice(0, 10))
      setEndFrom(resData.data.EndFrom?.slice(0, 10))
      setNoOfDays(resData.data.NoOfDays)
      setBusCatId(resData.data.BusCategoryId)
      setRouteId(resData.data.RouteId)
      setIsLoading(false)
      setselectedMulti1(resData.data.AvailableTypeId)
    }
  }catch(e){
    if(id!=='0'){setScheduleNotFound(true)}
    console.log('Fetch Scheduel Data', e)
    setIsLoading(false)
  }
}

useEffect(()=>{
  if(id !== '0') {
    setIsLoading(true)
    fetchScheduleData()
  }
},[id])


  const dispatcher = useDispatch();

  

  function handleMulti1(selectedMulti1) {
    setAvailableOnValue(selectedMulti1);
    setselectedMulti1(selectedMulti1.Id);
  }

  
  // BUSS CATEGORY DROPDOWN
  // BUSS CATEGORIES
  const bussCategories = useSelector((state) => state.Bus.bussCategories);
   // SET ROUTE DROPDOWN WHEN EDIT
   const {dropdownData :busDropdownData} = EditDropdown(id,bussCategories,busCatId)
   useEffect(()=>{
     if(busDropdownData){
      setBusCatDropDownData(busDropdownData)
     }
   },[busDropdownData,busCatId])

  const { Loading, isError } = Fetch(bussAction.fetchAllBussCategories(userId));
  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in bussCategories) {
      options.push({
        label: bussCategories[key].Name,
        value: bussCategories[key].Name,
        Id: bussCategories[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setBusCategoryDropdown(optionGroup);
  }, [bussCategories]);
  // useEffect to set Terminal Dropdown End


  // SET TERMINALS DROPDOWN
    // useEffect to set Terminal Dropdown
    const terminals = useSelector((state) => state.Terminal.terminals);
    const terminalLoading = Fetch(TerminalActions.fetchAllTerminal(userId));
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

  // BUSS CATEGORY DROPDOWN
  // BUSS CATEGORIES
  const AllRoutes = useSelector((state) => state.Route.routes);

  // SET ROUTE DROPDOWN WHEN EDIT
  const {dropdownData} = EditDropdown(id,AllRoutes,routeId)
  useEffect(()=>{
    if(dropdownData){
      setRouteDropDown(dropdownData)
    }
  },[dropdownData,routeId])

// useEffect to set Terminal Dropdown End

  const { routeLoading, routeIsError } = Fetch(routeActions.fetchAllRoute(userId));
  // useEffect to set Terminal Dropdown
  useEffect(() => {
    let options = [];
    for (let key in AllRoutes) {
      options.push({
        label: AllRoutes[key].Name,
        value: AllRoutes[key].Name,
        Id: AllRoutes[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setRouteDropdown(optionGroup);
  }, [AllRoutes]);
  // useEffect to set Terminal Dropdown End



  /*
    get date Method
  **/

  // ADD FIELDS HANDLER
  const addButtonHandler = () => {
    let inputAddField = { date: `Date ${inputFields.length + 1}` };
    setInputFields(inputFields.concat(inputAddField));
    setCustomDates(customeDate.concat("yyyy/mm/dd"));
  };

  const handleDateChange = (e, index) => {
    const AllCustomDates = customeDate;
    AllCustomDates[index] = e.target.value;
    setCustomDates(AllCustomDates);
  };

  // ADD AND EDIT FUNC START HERE

  // ADD ROUTE
  const addRouteHandler = async () => {
    setConfirmRoute("");
    setError("");
    // companyId,busCategoryId,Name, regNo, model, makeId
    try {
      if (id !== '0') {
        setIsAddRoute(true);
        await dispatcher(
          bussAction.AddEditFunc(
            {
              name: name,
              departureTime: departureTime,
              arrivalTime: arrivalTime,
              startDate: startDate,
              endFrom: endFrom,
              routeId: routeDropDown.Id,
              busCategoryId: busCatDropDownData.Id,
              noOfDays: noOfDays,
              active: true,
            },
            `bus-schedule/update-schedule/${userId}/${id}`,
            "PUT"
          )
        );
        fetchScheduleData()
        setIsAddRoute(false);
        setConfirmRoute("Schedule Updated Successfully");
        // props.history.goBack()
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
          bussAction.AddEditFunc(
            {
              name: name,
              departureTime: departureTime,
              arrivalTime: arrivalTime,
              startDate: startDate,
              endFrom: endFrom,
              routeId: routeDropDown.Id,
              busCategoryId: busCatDropDownData.Id,
              noOfDays: noOfDays,
              active: true,
              availableTypeId: selectedMulti1,
              waeklyDay: {
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
              },
              customDates: customeDate,
            },
            `bus-schedule/add-schedule/${userId}`,
            "POST"
          )
        );
        setIsAddRoute(false);
        setConfirmRoute(response.Message);
        // props.history.goBack()
        setScheduleId(response.dataId)
        props.history.push(`./${response.dataId}`, {
          route: response.dataId,
        })

      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAddRoute(false);
    }
  };

  // UPDATE SCHEDULE STOPS
  const changeStopHandler = async(value,item,id, ticketable) =>{
    if(id === 2){setStopArrivalTime(value)}
    else if (id === 3){setStopDepartureTime(value)} 
    console.log(stopArrivalTime)
    console.log(stopDepartureTime)
    console.log(id)

    try {
        await dispatcher(
          bussAction.AddEditFunc(
            {
              terminalId: id === 1 ? value.Id : item.TerminalId,
              active: true,
              ticketable: ticketable,
              arrivalTime: id === 2 ? value : stopArrivalTime,
              departureTime: id === 3 ? value : stopDepartureTime
            },
            `route/update-terminal-stop/${userId}/${item.Id}`,
            "PUT"
          )
        );
      
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  if(scheduleNotFound) {
    return <Redirect to="/404" />
  }
  return (
    <React.Fragment>
      {isLoading ? (
        <div className="spinner-border text-success m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      ): (
        <div className="page-content">
        <div className="checkout-tabs">
                <Row>
                  <Col lg="1">
                    <NavLinkComp id={id} Active={'1'} history={props.history} disabled={id === '0' ? true : false} />
                  </Col>
  
                  <Col lg="11">
          <Container fluid={true}>
            <ErrorOrConfirm error={error} confirmRoute={confirmRoute} />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>      
                    <h1 className="card-title">
                      {id === '0'  ? `Add Schedule` : `Trp-${id}`}
                    </h1>
                    <form>
                      <Row>
                        <Col lg="6">
                          <Input
                            inputFieldHandler={(e) => setName(e)}
                            Label="Name"
                            col="6"
                            id="name"
                            disabled={id === '0' ? false : true}
                            initialValue={name}

                          />
                          <Row>
                            <Col lg="6" sm="3">
                              <label
                                htmlFor="example-time-input"
                                className="col-form-label"
                              >
                                Departure Time
                              </label>
                              <input
                              disabled={id === '0' ? false : true}
                                className="form-control"
                                type="time"
                                defaultValue={departureTime}
                                id="example-time-input"
                                onChange={(e) => setDepartureTime(e.target.value)}
                              />
                            </Col>
  
                            <Col lg="6" sm="3">
                              <label
                                htmlFor="example-time-input"
                                className="col-form-label"
                              >
                                Arrival Time
                              </label>
                              <input
                              disabled={id === '0' ? false : true}
                                className="form-control"
                                type="time"
                                id="example-time-input"
                                defaultValue={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                              />
                            </Col>
                          </Row>
  
                          <Label style={{ marginTop: 15 }}>
                            Schedule Validity
                          </Label>
                          <Row>
                            <Col lg="6" sm="3">
                              <input
                              disabled={id === '0' ? false : true && !isUserEdit}
                                className="form-control"
                                type="date"
                                id="example-date-input"
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Select Date"
                                defaultValue={startDate}
                                min={id === '0' ? new Date().toISOString().split("T")[0] : startDate}
                                
                              />
                            </Col>
  
                            <Col lg="6" sm="3">
                              <input
                              disabled={id === '0' ? false : true && !isUserEdit}
                                className="form-control"
                                type="date"
                                id="example-date-input"
                                onChange={(e) => setEndFrom(e.target.value)}
                                placeholder="Select Date"
                                defaultValue={endFrom}
                                min={startDate}
                              />
                            </Col>
                          </Row>
  
                            <React.Fragment>
                              <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                              <Label>Available On</Label>
                              <Select
                              isDisabled={id === '0' ? false : true && !isUserEdit}
                                value={availableOnValue}
                                onChange={(e) => {
                                  handleMulti1(e);
                                }}
                                options={optionGroup}
                                classNamePrefix="select2-selection"
                              />
                              </FormGroup>
  
                              {selectedMulti1 === 0 ? null : selectedMulti1 ===
                                1 ? (
                                <Row>
                                  <Col lg="6">
                                    <Row>
                                      <Col lg="6">
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor1"
                                          checked={monday}
                                          setCustomRadioHandler={() =>
                                            setMonday(!monday)
                                          }
                                          Label="Monday"
                                        />
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor2"
                                          checked={tuesday}
                                          setCustomRadioHandler={() =>
                                            setTuesday(!tuesday)
                                          }
                                          Label="Tuesday"
                                        />
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor3"
                                          checked={wednesday}
                                          setCustomRadioHandler={() =>
                                            setWednesday(!wednesday)
                                          }
                                          Label="Wednesday"
                                        />
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor7"
                                          checked={sunday}
                                          setCustomRadioHandler={() =>
                                            setSunday(!sunday)
                                          }
                                          Label="Sunday"
                                        />
                                      </Col>
                                      <Col lg="6">
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor4"
                                          checked={thursday}
                                          setCustomRadioHandler={() =>
                                            setThursday(!thursday)
                                          }
                                          Label="Thursday"
                                        />
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor5"
                                          checked={friday}
                                          setCustomRadioHandler={() =>
                                            setFriday(!friday)
                                          }
                                          Label="Friday"
                                        />
                                        <RadioButton
                                          htmlFor="customCheck-outlinecolor6"
                                          checked={saturday}
                                          setCustomRadioHandler={() =>
                                            setSaturday(!saturday)
                                          }
                                          Label="Saturday"
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              ) : (
                                <React.Fragment>
                                  {inputFields.map((item, index) => (
                                    <div key={index} className="form-group row">
                                      <label
                                        htmlFor="example-date-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        {item.date}
                                      </label>
                                      <div className="col-md-10">
                                        <input
                                          min={startDate}
                                          max={endFrom}
                                          className="form-control"
                                          type="date"
                                          id="example-date-input"
                                          onChange={(e) =>
                                            handleDateChange(e, index)
                                          }
                                          placeholder="Select Date"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                  <div className="button-items">
                                    <Button
                                      color="primary"
                                      className="btn btn-primary waves-effect waves-light btn-secondary1"
                                      data-toggle="button"
                                      aria-pressed="false"
                                      onClick={() => addButtonHandler()}
                                    >
                                      Add Custom Date +
                                    </Button>
                                  </div>
                                </React.Fragment>
                              )}
                            </React.Fragment>

                        </Col>
  
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Route</Label>
                            <Select
                            isDisabled={id === '0' ? false : true}
                              // value={routeDropdown}
                              onChange={(item) => {
                                setRouteDropDown(item)
                              }}
                              options={routeDropdown}
                              classNamePrefix="select2-selection"
                              value={routeDropDown}
                            />
                          </FormGroup>
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Bus Category</Label>
                            <Select
                              //    value={inputState.InputValues.}
                              onChange={(item) => {
                                setBusCatDropDownData(item)
                              }}
                              options={busCategoryDropdown}
                              classNamePrefix="select2-selection"
                              value={busCatDropDownData}
                              isDisabled={id === '0' ? false : true && !isUserEdit}
                            />
                          </FormGroup>
  
                          <Input
                            inputFieldHandler={(e) => setNoOfDays(e)}
                            Label="Booking Start From"
                            col="6"
                            id="noOfDays"
                            initialValue={noOfDays}
                            type='number'
                            min={1}
                            disabled={id === '0' ? false : true && !isUserEdit}
                          />
                        </Col>
                      </Row>
                    </form>
                    <Row>
                      {id === '0' ? null : (
                      <Col lg='1'>
                      <ButtonComp
                      isLoading={isAddRoute}
                      // disabled={!inputState.formisValid}
                      onClick={()=> setIsUserEdit(true)}
                      Label={'Edit'}
                    />
                      </Col>
                    )}
                   
                      {id !== '0' && isUserEdit === false ? null : (
                      <Col lg='1'>
                    <ButtonComp
                      isLoading={isAddRoute}
                      // disabled={!inputState.formisValid}
                      onClick={addRouteHandler}
                      Label={'Save'}
                    />
                    </Col>
                      )}
                    </Row>
                    
                  </CardBody>
                </Card>
              </Col>
            </Row>
  
  
            <Row>
                  <Col lg="12">
                    <Card>
                        {/* Select Schedule Start here */}
                      <CardBody>
                      <h1 className="card-title">Stops</h1>
            {schedleId !== '' ? (
              <React.Fragment>
                  {stopData.map((item,index)=> (
                               <Row key={item.Id}>
                               <Col lg="3">
                                 <Input
                            Label="Terminal Name"
                            col="6"
                            id="TerminalName"
                            initialValue={item.TerminalName}
                            disabled={true}
                          />                               
                               </Col>
  
  
                               <Col lg="3">
                               <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                                   <Label>Arrival Time</Label>
                                   <input
                                className="form-control"
                                type="time"
                                id="example-time-input"
                                onChange={(e) => changeStopHandler(e.target.value, item,2, item.Ticketable)}
                                placeholder="Select Date"
                                defaultValue={item.ArrivalTime?.slice(11)}
                              />
                                 </FormGroup>
                               </Col>
  
                               <Col lg="3">
                               <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                               <Label>Departure Time</Label>
                                   <input
                                className="form-control"
                                type="time"
                                id="example-time-input"
                                onChange={(e) => changeStopHandler(e.target.value, item,3, item.Ticketable)}
                                placeholder="Select Date"
                                defaultValue={item.DepartureTime?.slice(11)}
                              />
                                 </FormGroup>
                               </Col>
                               
                               <Col lg="3">
                               <Input
                            inputFieldHandler={(e) => setNoOfDays(e)}
                            Label="Ticketable"
                            col="6"
                            id="ticketable"
                            initialValue={item.Ticketable === true ? "Yes" : "No"}
                            disabled={true}
                          />
                               </Col>
                               
                               
       
                              </Row>
                          ))}  
              
              </React.Fragment>
            ) : null}
             </CardBody>
                    </Card>
         
                  </Col>
                </Row>
          </Container>
          </Col>
          </Row>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddSchedule;
