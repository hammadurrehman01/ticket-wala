import React, { useState, useReducer, useEffect, useCallback } from "react";
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
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";

import Input from "../../../../components/Forms/Input";
import * as routeActions from "../../../../store/Route/action";
import { TerminalActions,TripPlannerAction, busActions } from "../../../../store/actions";
import MaterialTable from "material-table";
 
import { Redirect } from 'react-router-dom';
import classnames from "classnames";

import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../../components/UI/Button";
import ErrorOrConfirm from '../../../../components/UI/ErrorOrConfirm'
import {Fetch} from '../../../../components/Server/Fetch'
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { useParams } from "react-router";
import NavLinkComp from "components/UI/NavLinkComp";
import { Api } from "common/Api";


const AddTripPlanner = (props) => {
  const [activeTab, setactiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [tripLoading, setTripLoading] = useState(true)
  const [busCatDropdown, setBusCatDropdown] = useState([]);
  const [drivrerDropdown, setDriverDropdown] = useState([]);
  const [isStopAddPopup, setIsStopAddPopup] = useState(false);
  const [selectedScheduleData, setSelectedScheduleData] = useState({})
  const [scheduleid,setScheduleId] = useState(0)
  const [scheduleNotFound, setScheduleNotFound] = useState(false)
  const [busDropdown, setBusDropdown] = useState([])

  const [driverUpdate, setDriverUpdate] = useState(false)
  const [isTripCreating, setIsTripCreating] = useState(false)

  const [ItemToChangeBusCategory, setItemToChangeCategory] = useState()

  
  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");
  const[price,setPrice] = useState()
  const [updateFareColumn, setUpdateFareColumn] = useState({})
  const [fareUpdating, setFareUpdating] = useState(false)

  const {Id : userId} = JSON.parse(localStorage.getItem("userId")) || {}

  const TripPlanner = useSelector((state)=> state.Schedule.TripPlanners)
  const faresData = useSelector((state)=> state.Schedule.fares)
  const buses = useSelector((state) => state.Bus.bussListing);
  const bussCategories = useSelector(state => state.Bus.bussCategories)
  const drivers = useSelector((state) => state.Bus.driverListing);

  const [selectedBus, setSelectedBus] = useState([])
  const [selectedDrivers, setSelectedDrivers] = useState([])
  const [busUpdating, setBusUpdating] = useState(false)

   // FETCH DATA
   const {Loading: busLoading, isError: busError} = Fetch(busActions.fetchAllBuses(userId))
   const {Loading: driverLoading, isError: driverError} = Fetch(busActions.fetchAllBusDrivers(userId))
   const {Loading: busCatLoading, isError: busCatError} = Fetch(busActions.fetchAllBussCategories(userId))

  const {id} = useParams()

    // useEffect to set Schedule Id and schedule Data
    useEffect(()=>{
      console.log('Fetch Schedule UseEfect')
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
            
            setSelectedScheduleData({
            DepartureTime: resData.data.DepartureTime?.slice(11),
            ArrivalTime: resData.data.ArrivalTime?.slice(11),
            To: resData.data.StartDate?.slice(0,10),
            From: resData.data.EndFrom?.slice(0,10),
            busCatId : resData.data.BusCategoryId,
            RouteId : resData.data.RouteId
            })
            setScheduleId(id)
          }
        }catch(e){
          setScheduleNotFound(true)
          console.log('Fetch Scheduel Data', e)
        }
      }
      fetchScheduleData()
    },[id])
 
  
  const dispatcher = useDispatch()

  // useEffect to set Terminal Dropdown
  useEffect(() => {
    if(bussCategories.length !== 0) {
      console.log('Bus Cat UseEfect')
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
      setBusCatDropdown(optionGroup);
    }
  }, [bussCategories]);
  // useEffect to set Terminal Dropdown End

  // Driver Dropdown
    // useEffect to set Terminal Dropdown
    useEffect(() => {
      if(drivers.length !== 0) {
        console.log('Driver Dropdown UseEfect')
        let options = [];
        for (let key in drivers) {
          options.push({
            label: drivers[key].Name,
            value: drivers[key].Name,
            Id: drivers[key].Id,
          });
        }
        const optionGroup = [
          {
            options,
          },
        ];
        setDriverDropdown(optionGroup);
      }
    }, [drivers]);
    // useEffect to set Terminal Dropdown End


  // SET BUS DROPDWN 

  const setBusDropdownHandler = useCallback(()=>{
      setIsLoading(true)
      let bussDropDownArray = []
      let filterBuses = []
      for (let key in TripPlanner){
        let busCatId = TripPlanner[key].BusCategoryId === null ? selectedScheduleData.busCatId : TripPlanner[key].BusCategoryId
        let filterBus =  buses.filter(item => item.BusCategoryId === busCatId)
        filterBuses.push(filterBus)
      }

      for(let item in filterBuses){
        let options = [];
    for (let key in filterBuses[item]) {
      options.push({
        label: `${filterBuses[item][key].Name} (Reg #: ${filterBuses[item][key].RegNo})`,
        value: `${filterBuses[item][key].Name} (Reg #: ${filterBuses[item][key].RegNo})`,
        Id: filterBuses[item][key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
 
    bussDropDownArray.push(optionGroup)
      }
      setBusDropdown(bussDropDownArray);
      setIsLoading(false)
  },[TripPlanner, scheduleid, selectedScheduleData])

  useEffect(()=>{
    if(scheduleid !== 0) {
    console.log('Bus Dropdown UseEfect')
    setBusDropdownHandler()
    }
  },[TripPlanner])


  // SET BUSES AND DRIVERS VALUES CAME FROM SERVER
  useEffect(()=>{
    if(scheduleid !== 0) {
      console.log('Driver and Bus Default Values UseEfefct')
      let filterBuses = []
      let filterDriverArray = []
      for (let key in TripPlanner){
        let filterBus =  buses.find(item => item.Id === TripPlanner[key].BusId)
        let allDrivers = []
        if(TripPlanner[key].Drivers.length !== 0) {
          for(let option in TripPlanner[key].Drivers) {
            let filterDriver =  drivers.find(item => item.Id === TripPlanner[key].Drivers[option].DriverId)
            allDrivers.push(filterDriver)
          }
        }

        if(filterBus === undefined) {
          filterBuses.push({})
        }else{
          filterBuses.push({
            Id: filterBus.Id,
            value: filterBus.Name,
            label: `${filterBus.Name} (Reg #: ${filterBus.RegNo})`
          })
        }
        setSelectedBus(filterBuses)

        if(allDrivers === []) {
          filterDriverArray.push([{}])
        }else{
          let driverTemp = []
          for (let key in allDrivers) {
            driverTemp.push({
              Id: allDrivers[key].Id,
            value: allDrivers[key].Name,
            label: allDrivers[key].Name 
            })
          }
          filterDriverArray.push(driverTemp)
        }
      }
      setSelectedDrivers(filterDriverArray)
    }
  },[TripPlanner])


//   Tabs
function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }

  const fetchAllTrips = async () => {
    if(scheduleid !== 0) {
      console.log('fetch All Trip useEffect')
      setTripLoading(true)
      await dispatcher(TripPlannerAction.fetchTripPlanner(userId, scheduleid))
      await dispatcher(TripPlannerAction.fetchAllFares(userId, selectedScheduleData.RouteId))
      setTripLoading(false)
    }
  }

  useEffect(()=>{
    fetchAllTrips()
  },[scheduleid])


  // Change Drive Handler
  const changeDriverHandler = async (driver, {Id, BusId},index, selectedBus) => {
    let driverIds = []
    for (let key in driver){
      driverIds.push(driver[key].Id)
    }
    if(driver !== null) {
      setDriverUpdate(true)
      let driverAll = selectedDrivers
      driverAll[index] = driver
      setSelectedDrivers(driverAll)
      await dispatcher(busActions.AddEditFunc(
         {
           busId: selectedBus,
           driverIds: driverIds
         },
         `bus-schedule/update-trip/${userId}/${scheduleid}/${Id}`,
         'PUT'
       ))
       setDriverUpdate(false)
       
    }
  }

  // 
   // Change Drive Handler
   const changeBusHandler = async (Bus, item, index) => {
     console.log(item)
     console.log(Bus)
     console.log(index)
     let driverIds = []
    for (let key in item.Drivers){
      driverIds.push(item.Drivers[key].DriverId)
    }
    if(Bus !== null) {
      setBusUpdating(true)
      let busAll = selectedBus
      busAll[index] = Bus
      setSelectedBus(busAll)
      await dispatcher(busActions.AddEditFunc(
         {
           busId: Bus.Id,
           driverIds: driverIds
         },
         `bus-schedule/update-trip/${userId}/${scheduleid}/${item.Id}`,
         'PUT'
       ))
       setBusUpdating(false)
       
    }
  }
  // const Dlete Trip Planner
  const deleteTripPlanner = async (item) =>{
    await dispatcher(TripPlannerAction.deleteTripsPlanner(userId, item.Id, scheduleid))
  }

  // CRTEA NEW TRIPS HANDLER
  const CreateTripsHandler = async() => {
    setIsTripCreating(true)
    const tripsResponse = await dispatcher(busActions.AddEditFunc(
      {},
     `bus-schedule/add-trip-planner/${userId}/${scheduleid}`,
      'POST'
    ))
    if(tripsResponse.success === true) {
      fetchAllTrips()
    }
    setIsTripCreating(false)
  }

  // UPDATE BUS CATEGORY DROPDOWN
  const updateBusCategoryHandler = async(item) => {
  console.log(ItemToChangeBusCategory)
    setIsTripCreating(true)
    const busCatResponse = await dispatcher(busActions.AddEditFunc(
      {busCategoryId: item},
     `bus-schedule/update-trip-bus-category/${userId}/${scheduleid}/${ItemToChangeBusCategory.Id}`,
      'PUT'
    ))
    if(busCatResponse.success === true) {
      fetchAllTrips()
    }
    setIsTripCreating(false)
    setIsStopAddPopup(false)
  }


  // UDPATE FARE HANDLER 
  const UdpateFareHandler = async() =>{
    setFareUpdating(true)
    const updateTripPriceResponse = await dispatcher(busActions.AddEditFunc(
      {
        rate: price
      },
     `route/update-combination-rate/${updateFareColumn}`,
      'PUT'
    ))
    console.log(updateTripPriceResponse)
    setFareUpdating(false)
    if(updateTripPriceResponse.success === true) {
      setUpdateFareColumn({})
    }
  }

  if(scheduleNotFound) {
    return <Redirect to="/404" />
  }
    return (
      <React.Fragment>
        <div className="page-content">
        <div className="checkout-tabs">
              <Row>
                <Col lg="1">
                <NavLinkComp id={id} Active={'2'} history={props.history} />
                </Col>
                
                <Col lg="11">
          <Container fluid={true}>
          <ErrorOrConfirm error={error} confirmRoute={confirmRoute}/>
            <Row>
              <Col lg="12">
                <Card>
                    {/* Select Schedule Start here */}
                  <CardBody>
                    {/* Add Trip Start here */}
                    <h1 style={{marginTop:10}} className="card-title">{`Trp-${id}`}</h1>
                      <Row>
                        <Col lg="6">
                        <Input
                            disabled
                            Label="To"
                            col="12"
                            id="To"
                            value={selectedScheduleData.To}

                          />
                          <Input
                            disabled
                            Label="From"
                            col="12"
                            id="From"
                            value={selectedScheduleData.From}
                          />
                        </Col>
                        <Col lg="6">
                        <Input
                            disabled
                            Label="Departure"
                            col="12"
                            id="Departure"
                            value={selectedScheduleData.DepartureTime}
                          />
                          <Input
                            disabled
                            Label="Arrival"
                            col="12"
                            id="Arrival"
                            value={selectedScheduleData.ArrivalTime}
                          />
                        </Col>
                      </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          {scheduleid === 0 ? null : (
            <Container fluid={true}>
            <ErrorOrConfirm error={error} confirmRoute={confirmRoute}/>
              <Row>
                <Col lg="12">
                  <Card>
                      {/* Select Schedule Start here */}
                    <CardBody>
  
                        {/* Table Start here */}
                        {TripPlanner.length === 0 && !tripLoading ? (
                    <Row style={{paddingTop:20, paddingBottom:20, alignItems:'center', flexDirection:'column'}}>
                      <p>No Trips Available</p>
                         <ButtonComp
                         isLoading={isTripCreating}
                             onClick={CreateTripsHandler}
                             Label="Create Trips"
                           />

                    </Row>
                    
                    ) : (
       
                    <React.Fragment>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggle("1");
                          }}
                        >
                          Drivers & Bus
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggle("2");
                          }}
                        >
                          Fares
                        </NavLink>
                      </NavItem>
                    </Nav>
                   
                        <TabContent activeTab={activeTab}>
                        {isLoading ? null : (
                          <TabPane tabId="1" className="p-3">
                          {TripPlanner.map((item,index)=> (
                               <Row key={item.Id}>
                               <Col lg="1" style={{marginTop:27}}>
                                 <p>{`Trp-${item.Id}`}</p>
                               </Col>
                               <Col lg="2" style={{marginTop:27}}>
                                 <p>{item.TripDate.slice(0,10)}</p>
                               </Col>
       
                               <Col lg="4">
                               <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                                 <Row style={{paddingRight:10, paddingLeft:10}} className="justify-content-md-between"><Label>Select Bus</Label><Label style={{ cursor: "pointer" }} onClick={()=> {setIsStopAddPopup(true), setItemToChangeCategory(item)}}>{item.BusCategoryName === "" ? 'Change Category +' : `${item.BusCategoryName} +`}</Label> </Row>
                                   
                                   <Select
                                     onChange={(e) => changeBusHandler(e, item, index)}
                                     options={busDropdown[index]}
                                     isLoading={isLoading}
                                     classNamePrefix="select2-selection"
                                     value={selectedBus[index]}
                                     isLoading={busUpdating}    
                                     noOptionsMessage={() => 'No Bus Available, Please Change Category!'}                                
                                   />
                                 </FormGroup>
                                 {/* <p style={{fontSize:11, marginTop:-10}}>{busDropdown[index][0].options.length === 0 ? "No Bus Available in selected category please change category" : null}</p> */}
                               </Col>

                               <Col lg="4">
                               <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                                   <Label>Select Driver</Label>
                                   <Select
                                   isMulti={true}
                                   onChange={(e) => changeDriverHandler(e,item, index,selectedBus[index].Id)}
                                     options={drivrerDropdown}
                                     classNamePrefix="select2-selection"
                                     isLoading={driverUpdate}
                                     value={selectedDrivers[index]}
                          
                                   />
                                 </FormGroup>
                               </Col>
                               <Col lg="1" style={{marginTop:27}}>
                                 <Row>
                                 {/* <ButtonComp
                             onClick={()=> {setIsStopAddPopup(true), setItemToChangeCategory(item)}}
                             Label="Edit Category"
                           /> */}
                                 <button
                                 style={{marginLeft:10}}
                                 onClick={()=> deleteTripPlanner(item)}
                                type="button"
                                className="btn btn-danger waves-effect waves-light"
                              >
                                <i className="mdi mdi-trash-can"></i>{" "}
                                
                              </button>
                                 </Row>
                           
                                
                               </Col>
       
                              </Row>
                          ))}  
                        </TabPane>
                        ) }
                        
                        <TabPane tabId="2" className="p-3">
                        {faresData.Cities?.map((item,index)=> (
                            <React.Fragment key={index}>
                              {item.Stops.length === 0 ? null : (
                            <Row>
                               <h1 style={{fontSize:16, marginTop:20, marginBottom:0, marginLeft:10}} className="card-title">{`${item.Name} To`}</h1>
                            </Row>
                              )}
                               <Row>
                                {item.Stops?.map(option => (
                                  <Col key={option.Id} lg="3">
                                  <Input
                               Label={option.Name}
                               col="12"
                               id="Price"
                               type='number'
                               placeholder='Set Fare'
                               inputFieldHandler={(e)=> {setUpdateFareColumn(option.Id), setPrice(e)}}
                               initialValue={option.Rate}
                                 />
                                 {updateFareColumn === option.Id ? (
                                              <ButtonComp
                                              Small
                                              isLoading={fareUpdating}
                                                  onClick={UdpateFareHandler}
                                                  Label="Update"
                                                />
                                 ) : null}
                                  </Col>

                                ) )}
                               
       
                              </Row>
                              </React.Fragment>
                          ))}  
                        </TabPane>
                      </TabContent>
                      </React.Fragment>
                    )}
                    
      
                    </CardBody>
                  </Card>
       
                </Col>
              </Row>
  
  
              {/* Modal Start from here */}
              <Modal size="md" isOpen={isStopAddPopup}>
                <div className="modal-header">
                  <h5 className="modal-title mt-0" id="myLargeModalLabel">
                    Bus Category
                  </h5>
                  <button
                    onClick={() => setIsStopAddPopup(false)}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <Col lg="12">
                  <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                    <Label>Select Category</Label>
                    <Select
                      onChange={(e) => {
                        // inputHandler(Id, true, "StopTerminal");
                        updateBusCategoryHandler(e.Id)
                      }}
                      options={busCatDropdown}
                      classNamePrefix="select2-selection"
                      isLoading={isTripCreating}
                    />
                  </FormGroup>

                </Col>
              </Modal>
            </Container>
          ) }
          </Col>
          </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }

export default AddTripPlanner;
