import React, { useState, useReducer, useCallback, useEffect } from "react";
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
} from "reactstrap";
import Input from "../../../components/Forms/Input";
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  formReducer,
  FORM_FILLED,
} from "../../../components/Forms/formReducer";
import Select from "react-select";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import * as bussAction from '../../../store/Buss/action'
import { useDispatch, useSelector } from "react-redux";
import {Fetch} from '../../../components/Server/Fetch'
import * as routeActions from "../../../store/Route/action";
import { TuneTwoTone } from "@material-ui/icons";
import RadioButton from '../../../components/UI/RadioButton'
import ErrorOrConfirm from '../../../components/UI/ErrorOrConfirm'
import ButtonComp from "../../../components/UI/Button";

const optionGroup = [
  {
    options: [
      { label: "Daily", value: "Daily", Id:0 },
      { label: "Weekly", value: "Weekly", Id:1 },
      { label: "Custom", value: "Custom", Id:2 },
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

// DAYS

const days = [
  {
    options: [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
    ],
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Schedule = (props) => {
  //** Datepicker Method */

  const max_len = 25;
  const [selectedMulti1, setselectedMulti1] = useState(0);
  const [availableOnValue, setAvailableOnValue] = useState({ label: "Daily", value: "Daily", Id:0 })
  const [selectedMulti2, setselectedMulti2] = useState("jj");
  const [selectedDays, setSelectedDays] = useState(null);
  const [inputFields, setInputFields] = useState([{ date: "Date 1" }]);
  const [customeDate, setCustomDates] = useState([]);
  const [busCategoryDropdown, setBusCategoryDropdown] = useState([])
  const [routeDropdown, setRouteDropdown] = useState([])

  const [confirmRoute, setConfirmRoute] = useState("");
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [error, setError] = useState("");
  // WEEKDAYS
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)
  const [saturday, setSaturday] = useState(false)
  const [sunday, setSunday] = useState(false)

  const dispatcher = useDispatch()

  function handleMulti1(selectedMulti1) {
    console.log(selectedMulti1.value);
    setAvailableOnValue(selectedMulti1)
    setselectedMulti1(selectedMulti1.Id);
  }


  // BUSS CATEGORY DROPDOWN
    // BUSS CATEGORIES 
    const bussCategories = useSelector(state => state.Bus.bussCategories)

    const {Loading, isError} = Fetch(bussAction.fetchAllBussCategories(1))
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

    // BUSS CATEGORY DROPDOWN
    // BUSS CATEGORIES 
    const AllRoutes = useSelector(state => state.Route.routes)

    const {routeLoading, routeIsError} = Fetch(routeActions.fetchAllRoute(1))
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

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      name: "",
      departureTime: "",
      arrivalTime: "",
      startDate: "",
      endFrom: "",
      routeId: 0,
      bussCategoryId: 0,
      noOfDays: "",

    },

    InputValidates: {
      name: false,
      departureTime: false,
      arrivalTime: false,
      startDate: false,
      endFrom: false,
      routeId: false,
      bussCategoryId: false,
      noOfDays: false,
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

  /*
    get date Method
  **/

  // ADD FIELDS HANDLER
  const addButtonHandler = () => {
    let inputAddField = { date: `Date ${inputFields.length + 1}` };
    setInputFields(inputFields.concat(inputAddField));
    setCustomDates(customeDate.concat('yyyy/mm/dd'))
  };


  const handleDateChange = (e, index) => {
    const AllCustomDates = customeDate
    AllCustomDates[index] = e.target.value
    setCustomDates(AllCustomDates);
  };

  // ADD AND EDIT FUNC START HERE

      // ADD ROUTE
  const addRouteHandler = async () => {
    const { 
      name,
      departureTime,
      arrivalTime,
      startDate,
      endFrom,
      routeId,
      bussCategoryId,
      noOfDays,
    } = inputState.InputValues;
    setConfirmRoute("");
    setError('')
    // companyId,busCategoryId,Name, regNo, model, makeId
    try {
      if (props.location?.state?.route) {
        setIsAddRoute(true);
        // await dispatcher(
        //   bussAction.AddEditFunc(
        //     {
        //       name: Name,
        //       capacity: Capacity,
        //       rows: Rows,
        //       columns: Columns,
        //       typeId: BussCategoryId,
        //       wifi: Wifi,
        //       chargingOutlets: ChargingOutlets,
        //       extendedLegspace: ExtendedLegspace,
        //       washroom: Washroom,
        //       movie: Movie,
        //       refreshment: Refreshment,
        //       active: true
        //     },
        //     `bus/update-bus-Category/${1}/${props.location?.state?.route.Id}`,
        //     'PUT'
        //   )
        // );
        setIsAddRoute(false);
        setConfirmRoute("Bus Category Updated Successfully");
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
              routeId: routeId,
              busCategoryId: bussCategoryId,
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
                sunday: sunday
              },
              customDates: customeDate
            },
            `bus-schedule/add-schedule/${1}`,
            'POST'
          )
        );
        setIsAddRoute(false);
        setConfirmRoute(response.Message);
      }
    } catch (err) {
      console.log(err);
      setError(err);
      setIsAddRoute(false);
    }
  };



  // ADD AND EDIT FUNC ENDS HERE


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
        <ErrorOrConfirm error={error} confirmRoute={confirmRoute}/>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h1 className="card-title">Add Schedule</h1>
                  <form>
                    <Row>
                      <Col lg="6">
                        <Input
                          inputFieldHandler={inputHandler}
                          Label="Name"
                          col="6"
                          id="name"
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
                              className="form-control"
                              type="time"
                              defaultValue="00:00:00"
                              id="example-time-input"
                              onChange={(e)=>inputHandler(e.target.value, true, 'departureTime')}
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
                              className="form-control"
                              type="time"
                              defaultValue="00:00:00"
                              id="example-time-input"
                              onChange={(e)=>inputHandler(e.target.value, true, 'arrivalTime')}
                            />
                          </Col>
                        </Row>

                        <Label style={{marginTop:15}}>Schedule Validity</Label>
                        <Row>
                          <Col lg="6" sm="3">
                            <input
                              className="form-control"
                              type="date"
                              id="example-date-input"
                              onChange={(e)=>inputHandler(e.target.value, true, 'startDate')}
                              placeholder="Select Date"
                            />
                          </Col>

                          <Col lg="6" sm="3">
                            <input
                              className="form-control"
                              type="date"
                              id="example-date-input"
                              onChange={(e)=>inputHandler(e.target.value, true, 'endFrom')}
                              placeholder="Select Date"
                            />
                          </Col>
                        </Row>

 
                          <Label>Available On</Label>
                          <Select
                            value={availableOnValue}
                            onChange={(e) => {
                              handleMulti1(e);
                            }}
                            options={optionGroup}
                            classNamePrefix="select2-selection"
                            isDisabled={false}
                          />


                        {selectedMulti1 === 0 ? null : selectedMulti1 === 1 ? (
                           <Row>
                           <Col lg='6'>
                               <Row>
                               <Col lg='6'>
                               <RadioButton htmlFor='customCheck-outlinecolor1' checked={monday} setCustomRadioHandler={()=>setMonday(!monday)} Label='Monday'/>
                               <RadioButton htmlFor='customCheck-outlinecolor2' checked={tuesday} setCustomRadioHandler={()=>setTuesday(!tuesday)} Label='Tuesday'/>
                               <RadioButton htmlFor='customCheck-outlinecolor3' checked={wednesday} setCustomRadioHandler={()=>setWednesday(!wednesday)}  Label='Wednesday'/>
                               <RadioButton htmlFor='customCheck-outlinecolor7' checked={sunday} setCustomRadioHandler={()=>setSunday(!sunday)}  Label='Sunday'/>
                               </Col>
                               <Col lg='6'>
                               <RadioButton htmlFor='customCheck-outlinecolor4' checked={thursday} setCustomRadioHandler={()=>setThursday(!thursday)} Label='Thursday'/>
                               <RadioButton htmlFor='customCheck-outlinecolor5' checked={friday} setCustomRadioHandler={()=>setFriday(!friday)} Label='Friday'/>
                               <RadioButton htmlFor='customCheck-outlinecolor6' checked={saturday} setCustomRadioHandler={()=>setSaturday(!saturday)} Label='Saturday'/>
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
                                    className="form-control"
                                    type="date"
                                    id="example-date-input"
                                    onChange={(e)=>handleDateChange(e, index)}
                                    placeholder="Select Date"
    
                                    
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="button-items">
                              <Button
                                color="primary"
                                className="btn btn-primary waves-effect waves-light"
                                data-toggle="button"
                                aria-pressed="false"
                                onClick={() => addButtonHandler()}
                              
                              >
                                Add Custom Date
                              </Button>
                            </div>
                          </React.Fragment>
                        )}
                      </Col>

                      <Col lg="6">
                        <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                          <Label>Route</Label>
                          <Select
      
                            onChange={({ Id }) => {
                              inputHandler(Id, true, "routeId");
                            }}
                            options={routeDropdown}
                            classNamePrefix="select2-selection"
                            isLoading={true}
                          />
                        </FormGroup>
                        <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                          <Label>Bus Category</Label>
                          <Select
               
                            onChange={({ Id }) => {
                              inputHandler(Id, true, "bussCategoryId");
                            }}
                            options={busCategoryDropdown}
                            classNamePrefix="select2-selection"
                            isLoading={true}
                          />
                        </FormGroup>
              
                        <Input
                          inputFieldHandler={inputHandler}
                          Label="Booking Start From"
                          col="6"
                          id="noOfDays"                          
                        />

                      </Col>
                    </Row>
                  </form>
                  <ButtonComp
                      isLoading={isAddRoute}
                      disabled={!inputState.formisValid}
                      onClick={addRouteHandler}
                      Label="Add Schedule"
                    />
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Schedule;
