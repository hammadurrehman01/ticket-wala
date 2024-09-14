import React from 'react'
import {
    Col,
    FormGroup,
    Label,
    Row,
  } from "reactstrap";
  import Select from "react-select";


const TerminalDropdownAsPerCity = (props) =>{
    return (
        <React.Fragment>
        {props.isTerminalLoading ? (
            <p>Terminal Loading</p>
          ) : (
            <React.Fragment>


                  {props.terminalDropdown[0].options.length === 0 ? (
                    <Col lg="6">
                      {" "}
                      <p>
                        Sorry, No Terminal Found in this city
                      </p>{" "}
                      <div className="text-muted font-italic mt-1">
                        You can click here to{" "}
                        <a
                          onClick={() =>
                            props.setIsTerminalAddPopup(true)
                          }
                          style={{color: '#556ee6'}}
                        >
                          Add Terminal
                        </a>
                      </div>
                    </Col>
                  ) : (
                    <React.Fragment>
                      <Col lg="6">
                        <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                          <Label>{props.Label}</Label>
                          <Select
                            onChange={({ Id }) => {
                              props.inputHandler(
                                Id,
                                true,
                                props.Id
                              );
                            }}
                            options={props.terminalDropdown}
                            classNamePrefix="select2-selection"
                            defaultValue={
                              props.isEdit
                                ? {
                                    label: props.terminalValue,
                                    value: props.terminalValue,
                                    Id: props.terminalId,
                                  }
                                : null
                            }
                          />
                          <div className="text-muted font-italic mt-1">
                            You can click here to{" "}
                            <a
                              onClick={() =>
                                props.setIsTerminalAddPopup(true)
                              }
                            >
                              Add Terminal
                            </a>
                          </div>
                        </FormGroup>
                      </Col>
                    </React.Fragment>
                  )}
            </React.Fragment>
          )}
</React.Fragment>
    )
}

export default TerminalDropdownAsPerCity