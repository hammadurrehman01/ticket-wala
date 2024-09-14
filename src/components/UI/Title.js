import React from 'react'
import ButtonComp from "../../components/UI/Button";
import {Col,Row,} from "reactstrap";

const Title = (props) =>{
    return (
        <Row>
          <Col lg="6">
            <h1 className="card-title">
            {props.title}
            </h1>
        </Col>
        </Row>
    )
}

export default Title