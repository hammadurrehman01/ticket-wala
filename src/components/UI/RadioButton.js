import React from "react"

import "@vtaits/react-color-picker/dist/index.css"
import "react-datepicker/dist/react-datepicker.css"

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css"

const RadioButton = (props) => {
  return (
    <div className="custom-control custom-checkbox custom-checkbox-outline custom-checkbox-primary mb-3" style={{marginTop:20}}>
    <input
      type="checkbox"
      className="custom-control-input"
      id={props.htmlFor}
      // checked={props.selectedRadioId === props.id}
      checked={props.checked}
      onChange={() => 
        props.setCustomRadioHandler()
    }
    />
    <label
      className="custom-control-label"
      htmlFor={props.htmlFor}
    >
      {props.Label}
    </label>
  </div>
  )
}

export default RadioButton