import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import Input from "../../../components/Forms/Input";
import { CommonAction } from "../../../store/actions";

import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../components/UI/Button";
import ErrorOrConfirm from '../../../components/UI/ErrorOrConfirm'
import "@vtaits/react-color-picker/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { Api } from "common/Api";
import { Redirect,useParams } from "react-router";
import * as bussAction from '../../../store/Buss/action'



const AddCities = (props) => {
    console.log(props)
  const [isLoading, setIsLoading] = useState(false);
  const [isAddRoute, setIsAddRoute] = useState(false);
  const [scheduleNotFound, setScheduleNotFound] = useState(false)
  const [error, setError] = useState("");
  const [confirmRoute, setConfirmRoute] = useState("");

//  FORMS FIELDS
const [name, setName] = useState("")
const [abbreviation, setAbbreviation] = useState("")
const [displayOrder, setDisplayOrder] = useState(0)

  const {id} = useParams()
  const dispatcher = useDispatch()

   // useEffect to set Schedule Id and schedule Data
   useEffect(()=>{
    const fetchScheduleData = async() =>{
        if(id !== "0") {
      try{
        setIsLoading(true)
        const response = await fetch(`${Api}common/city/${id}`, {
          method: "GET",
        });

        const {data,success} = await response.json();
        console.log(data)

        if (success === false) {
          throw new Error(resData.message);
        }else{
            setName(data.Name)
            setAbbreviation(data.Abbreviation)
            setDisplayOrder(data.DisplayOrder)
        }
        setIsLoading(false)
      }catch(e){
        setScheduleNotFound(true)
        console.log('Fetch Scheduel Data', e)
        setIsLoading(false)
      }}
    }
    fetchScheduleData()
  },[id])


  // ADD ROUTE
  const addRouteHandler = async () => {
    setConfirmRoute("");
    setError('')
    try {
      if (id !== "0") {
        setIsAddRoute(true);
        await dispatcher(
            CommonAction.UpdateCities(name, id, abbreviation,displayOrder)
        );
        setIsAddRoute(false);
        setConfirmRoute("Cities Updated Successfully");
        props.history.goBack()
      } else {
        setIsAddRoute(true);
        const response = await dispatcher(
            bussAction.AddEditFunc(
                {
                    name: name,
                    abbreviation: abbreviation,
                    published: true,
                    displayOrder: displayOrder
                },
              `common/add-city`,
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
          <Container fluid={true}>
          <ErrorOrConfirm error={error} confirmRoute={confirmRoute}/>
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h1 className="card-title">
                      {id !== '0' ? name : "Add City"}
                    </h1>

                    <form>
                      <Row>
                        <Col lg="6">
                        <Input
                            inputFieldHandler={(e)=> setName(e)}
                            Label="Name"
                            col="12"
                            id="Name"
                            initialValue={name}
                          />
                           <Input
                            inputFieldHandler={(e)=> setAbbreviation(e)}
                            Label="Abbreviation"
                            col="12"
                            id="Abbreviation"
                            initialValue={abbreviation}
                          />
                        </Col>
                      </Row>
                    </form>

                    <ButtonComp
                      isLoading={isAddRoute}
                      disabled={name && abbreviation === "" ? true : false}
                      onClick={addRouteHandler}
                      Label={`${id !== "0" ? 'Edit' : 'Add'}`}
                    />
                    {/* TABLES START HERE */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>)}
      </React.Fragment>
    );
  }

export default AddCities;
