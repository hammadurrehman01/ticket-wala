import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import {
  formReducer,
  FORM_FILLED,
} from "../../../components/Forms/formReducer";
import Input from "../../../components/Forms/Input";
import * as bussAction from '../../../store/Buss/action'
import LinkButton from "components/UI/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from '../../../components/UI/ErrorOrConfirm'
import {Fetch} from '../../../components/Server/Fetch'
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import {EditDropdown} from '../../../components/Dropdowns/setEditDropdown'
import Title from '../../../components/UI/Title'


const BusMakes = [
  {Id:1, Name: 'Toyota Bus'},
  {Id:2, Name: 'Honda'},
  {Id:3, Name: 'Faw'}
]

const optionGroup = [
  {
    options: [
      { label: "Toyota Bus", value: "Toyota Bus", Id:1 },
      { label: "Honda", value: "Honda", Id:2 },
      { label: "Faw", value: "Faw", Id:3 },
    ],
  },
];

const Bus = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [terminalDropdown, setTerminalDropdown] = useState([]);

  // Dropdown States
  const [busMakeId, setBusMakeId] = useState({})

  const [busCatDropdown, setBusCatDropdown] = useState({})

  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");

  const isEdit = props.location?.state?.route;

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}


  // BUSS CATEGORIES 
  const bussCategories = useSelector(state => state.Bus.bussCategories)

  const {Loading, isError} = Fetch(bussAction.fetchAllBussCategories(Id))
  const dispatcher = useDispatch()

  // if Edit to set Dropdown
  const {dropdownData} = EditDropdown(isEdit,bussCategories,isEdit?.BusCategoryId)
  useEffect(()=>{
    if(dropdownData){
      setBusCatDropdown(dropdownData)
    }
  },[dropdownData])

  // if Edit to set Dropdown
  const {dropdownData : makeDropdownData} = EditDropdown(isEdit,BusMakes,isEdit?.MakeId)
  useEffect(()=>{
    if(makeDropdownData){
      setBusMakeId(makeDropdownData)
    }
  },[makeDropdownData])


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
    setTerminalDropdown(optionGroup);
  }, [Loading]);
  // useEffect to set Terminal Dropdown End

  // USE REDUCER
  const [inputState, dispatch] = useReducer(formReducer, {
    InputValues: {
      Name: props.location.state?.route
        ? isEdit.Name
        : "",
      RegNo: props.location.state?.route
      ? isEdit.RegNo
      : 0,
      Model: props.location.state?.route
      ? isEdit.Model
      : 0,
    },
    InputValidates: {
    Name: isEdit ? true : false,
    RegNo: isEdit ? true : false,
    Model: isEdit ? true : false,
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


  // SET DROPDOWN
  const dropdownSetHandler = (item, id) =>{
    console.log(item)
    if(id === "Bus"){
      setBusCatDropdown({name:item.label,label:item.label,Id:item.Id})
    }else{
      setBusMakeId({name:item.label,label:item.label,Id:item.Id})
    }
  }

  // ADD ROUTE
  const addRouteHandler = async () => {
    const { 
      Name,
      RegNo,
      Model,
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
              regNo: RegNo,
              model: Model,
              makeId: busMakeId.Id,
              active: true
            },
            `bus/update-bus/${Id}/${busCatDropdown.Id}/${isEdit.Id}`,
            'PUT'
          )
        );
        setIsAddRoute(false);
        setConfirmRoute("Buss Update Updated Successfully");
        props.history.goBack()
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
          bussAction.AddEditFunc(
            {
              name: Name,
              regNo: RegNo,
              model: Model,
              makeId: busMakeId.Id,
              active: true
            },
            `bus/add-bus/${Id}/${busCatDropdown.Id}`,
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
                  <Title title={isEdit ? "Edit Bus" : "Add Bus"} isLoading={false} disabled={false} onClick={()=> props.history.push('/BusCategory/0')} Label="Add Bus Category"/>
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
                            Label="Reg No"
                            col="12"
                            id="RegNo"
                            initialValue={inputState.InputValues.RegNo}
                          />
                           <Input
                            inputFieldHandler={inputHandler}
                            Label="Model"
                            col="12"
                            id="Model"
                            initialValue={inputState.InputValues.Model}
                          />
                        </Col>
                        <Col lg="6">
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Bus Category</Label>
                            <Select
                              // onChange={({ Id }) => {
                              //   inputHandler(Id, true, "BussCategoryId");
                              // }}
                              onChange={(item)=>{
                                  dropdownSetHandler(item,'Bus')
                              }}
                              options={terminalDropdown}
                              classNamePrefix="select2-selection"
                              value={busCatDropdown}
                            />
                          <div className="text-muted font-italic mt-1">You can click here to <a href="/BusCategory/0">Add Bus Category </a></div>
                          </FormGroup>
                          <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                            <Label>Make</Label>
                            <Select
                              onChange={(item)=>{
                                dropdownSetHandler(item,'MakeId')
                              }}
                              options={optionGroup}
                              classNamePrefix="select2-selection"
                              value={busMakeId}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </form>

                    <ButtonComp
                      isLoading={isAddRoute}
                      disabled={!inputState.formisValid}
                      onClick={addRouteHandler}
                      Label={`${isEdit ? 'Edit Bus' : 'Add Bus'}`}
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

export default Bus;
