import React, { useState } from "react";
import {
  Row,
  Col,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
} from "reactstrap";

const CompanyRouteDrodown = (props) => {
  const [tripsDrodown, setTripsDropdown] = useState(false);
  return (
    <Row style={{marginBottom:10}}>
      <Col lg="2" style={{justifyContent:'center', display:'flex'}}>
        <button
          style={{ width: "100%" }}
          onClick={() => props.history.push("/route",{companyId: props.id})}
          type="button"
          className="btn btn-primary waves-effect btn-label waves-light"
        >
          <i className="bx bx-smile label-icon"></i> Routes
        </button>
      </Col>

      <Col lg="2" style={{justifyContent:'center', display:'flex'}}>
        <button
          style={{ width: "100%" }}
          onClick={() => props.history.push("/schedule",{companyId: props.id})}
          type="button"
          className="btn btn-primary waves-effect btn-label waves-light"
        >
          <i className="bx bx-smile label-icon"></i> Schedule
        </button>
      </Col>

      <Col lg="3" style={{justifyContent:'center', display:'flex'}}>
        <button
          style={{ width: "100%" }}
          onClick={() => props.history.push("/trips",{companyId: props.id})}
          type="button"
          className="btn btn-primary waves-effect btn-label waves-light"
        >
          <i className="bx bx-smile label-icon"></i> Trip Planner
        </button>
      </Col>

      <Col lg="2" style={{justifyContent:'center', display:'flex'}}>
        <button
          style={{ width: "100%" }}
          onClick={() => props.history.push("/drivers",{companyId: props.id})}
          type="button"
          className="btn btn-primary waves-effect btn-label waves-light"
        >
          <i className="bx bx-smile label-icon"></i> Drivers
        </button>
      </Col>

      <Col lg="3" style={{justifyContent:'center', display:'flex'}}>
        <button
          style={{ width: "100%" }}
          onClick={() => props.history.push("/BusCategory",{companyId: props.id})}
          type="button"
          className="btn btn-primary waves-effect btn-label waves-light"
        >
          <i className="bx bx-smile label-icon"></i> Bus Categories
        </button>
      </Col>
    </Row>
  );
};

export default CompanyRouteDrodown;
