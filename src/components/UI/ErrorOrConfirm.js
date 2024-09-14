import React from 'react'
import { UncontrolledAlert } from "reactstrap";

const ErrorOrConfirm = (props) =>{
    return (
        <React.Fragment>
        {props.error ? (
            <UncontrolledAlert
              color="danger"
              className="alert-dismissible fade show"
              role="alert"
            >
              <i className="mdi mdi-block-helper mr-2"></i>
              {props.error.message}
            </UncontrolledAlert>
          ) : props.confirmRoute ? (
            <UncontrolledAlert
              color="success"
              className="alert-dismissible fade show"
              role="alert"
            >
              <i className="mdi mdi-check-all mr-2"></i>
              {props.confirmRoute}
            </UncontrolledAlert>
          ) : null}
          </React.Fragment>
    )
}
export default ErrorOrConfirm