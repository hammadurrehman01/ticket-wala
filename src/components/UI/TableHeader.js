import React from "react";
import { Button, Col, Row,FormGroup, Label } from "reactstrap";
import Input from "../Forms/Input";
import Select from "react-select";

const TableHeader = (props) => {

  // LOGIN USER ID
  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

      // Search Handler
  const searchHandler = (e) => {
    if (e === "") {
      props.searchValue(null);
    } else {
      props.searchValue(e);
    }
  };

  return (
    <React.Fragment>
    <Row>
      <Col lg="3">
        <h1 className="card-title">{props.title}</h1>
      </Col>
      {props.isDropdown ? (
       <React.Fragment>
         <Col lg="3">
           {props.dateSearch ? (
              <input
              className="form-control"
              type="date"
              id="example-date-input"
              onChange={(e) => searchHandler(e.target.value)}
              placeholder="Select Date"
            />
           ) : (
            <Input
            inputFieldHandler={searchHandler}
            Label="Search"
            placeHolder="Search"
            col="12"
            id="Search"
            noLabel
          />
           ) }
       </Col>
         {props.endDate ? (
       <Col lg='3'>
            <input
            className="form-control"
            type="date"
            id="example-date-input"
            onChange={props.setEndDate}
            placeholder="Select Date"
          />
       </Col>
         ) : null}
           <Col lg="3">
           <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
             <Select
               onChange={({ Id }) => {
                props.setDropDown(Id, true, "City");
               }}
               options={props.dropdownOptions}
               classNamePrefix="select2-selection"
             />
           </FormGroup>
         </Col>
         </React.Fragment>
      ) : (
        !props.noSearch ? (
          <Col lg="6">
          <Input
            inputFieldHandler={searchHandler}
            Label="Search"
            placeHolder="Search"
            col="12"
            id="Search"
            noLabel
          />
        </Col>   
        ): null
      )}
      {props.buttonText === null || Id === 0 && !props.editable ? null : (
      <Col
        lg={`${props.noPaging ? '9' : '3'}`}
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
          onClick={() => {
            if(props.Link) {
              props.history.push(props.Link)
            }else{
              console.log('hi')
              props.onClick()
            }
          }}
        >
          {props.buttonText}
        </Button>
            
      </Col>
        )}
      {props.dropdownTwo ? (
            <Col lg="3">
            <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
              <Select
                onChange={({ Id }) => {
                 props.setDropDownTwo(Id, true, "City");
                }}
                options={props.secondDropdownOptions}
                classNamePrefix="select2-selection"
              />
            </FormGroup>
          </Col>
      ) : null}
  
    </Row>
    {props.maxFilter ? (
         <Row>
         <Col lg="3">
         <Input
            inputFieldHandler={props.maxFilterOneValue}
            Label={props.maxFilterInputOne}
            placeHolder={props.maxFilterInputOne}
            col="12"
            id="Search"
            noLabel
          />
         </Col>
         <Col lg="3">
         <Input
            inputFieldHandler={props.maxFilterTwoValue}
            Label={props.maxFilterInputTwo}
            placeHolder={props.maxFilterInputTwo}
            col="12"
            id="Search"
            noLabel
          />
         </Col>
         <Col lg="3">
         <Input
            inputFieldHandler={props.maxFilterThreeValue}
            Label={props.maxFilterInputThree}
            placeHolder={props.maxFilterInputThree}
            col="12"
            id="Search"
            noLabel
          />
         </Col>
         <Col lg="3">
         <Input
            inputFieldHandler={props.maxFilterFourValue}
            Label={props.maxFilterInputFour}
            placeHolder={props.maxFilterInputFour}
            col="12"
            id="Search"
            noLabel
          />
         </Col>
        
           
     
       </Row>
    ) : null}
    </React.Fragment>
  );
};

export default TableHeader;
