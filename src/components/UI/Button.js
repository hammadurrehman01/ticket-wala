import React from 'react'
import {Button} from "reactstrap";

const ButtonComp = (props) =>{
    return (
        <div className="button-items">
        {props.isLoading ? (
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
          >
            <i className="bx bx-loader bx-spin font-size-16 align-middle mr-2"></i>{" "}
            Please Wait
          </button>
        ) : (
        //   <Button color="secondary" outline className="waves-effect">
        //   Secondary
        // </Button>
          <Button
            color={`${props.secondary ? 'secondary' : 'primary'}`}
            className={`${props.secondary ? 'waves-effect' : 'btn btn-primary waves-effect waves-light'}`}
            data-toggle="button"
            outline={props.secondary ? true : false}
            aria-pressed="false"
            disabled={props.disabled}
            onClick={props.onClick}
          >
            {props.Label}
          </Button>
        )}
      </div>
    )
}

export default ButtonComp