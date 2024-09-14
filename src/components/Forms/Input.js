import React, {
    useReducer,
    useState,
    useCallback,
    useEffect,
    forwardRef,
  } from "react";
  import {Col, FormGroup} from "reactstrap"
  
  const FIELD_CHANGE_HANDLER = "FIELD_CHANGE_HANDLER";
  const LOST_FOCUS = "LOST_FOCUS";
  const filedReducer = (state, action) => {
    switch (action.type) {
      case FIELD_CHANGE_HANDLER:
     
        return {
          ...state,
          value: action.value,
          isValid: action.isValid,
        };
  
      case LOST_FOCUS:
        return {
          ...state,
          touched: true,
        };
    }
    return state;
  };
  const Input = forwardRef((props, ref) => {
    const [isFieldFocused, setIsFieldFocused] = useState(false);
    // const [inputs, setInputs] = useState({});
    const [counter, setCounter] = useState(0);
    const [inputState, fieldDispatch] = useReducer(filedReducer, {
      value: props.initialValue ? props.initialValue : "",
      isValid: props.initialValue ? true : false,
      touched: false,
    });
  
    const inputChangeHandler = useCallback(
      (text) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const websiteRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
          isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
          isValid = false;
        }
        if (props.website && !websiteRegex.test(text.toLowerCase())) {
          isValid = false;
        }
        if (props.min != null && +text < props.min) {
          isValid = false;
        }
        if (props.max != null && +text > props.max) {
          isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
          isValid = false;
        }
  
        fieldDispatch({
          type: FIELD_CHANGE_HANDLER,
          value: text,
          isValid: isValid,
        });
        inputSetHandler(text, isValid);
      },
      []
    );
  
  
  
    const { id, inputFieldHandler } = props;
    const inputSetHandler = (value, isValid) => {
      inputFieldHandler(value, isValid, id);
  
    };
  
    // useEffect(() => {
    //   if (inputState.touched) {
    //     inputFieldHandler(inputState.value, inputState.isValid, id);
    //     console.log("im running");
    //   }
    // }, [inputFieldHandler, inputState, counter]);
  
    const onLostFocus = () => {
      setIsFieldFocused(false);
     
      fieldDispatch({ type: LOST_FOCUS });
    };
  
    const fieldFocusHandler = () => {
      setIsFieldFocused(true);
    };
  
    return (
        <FormGroup className="select2-container">           
        {props.noLabel ? null : <label htmlFor="exampleInputEmail1">{props.Label}</label>}
        <input maxLength={props.maxLenght ? props.maxLenght : null} min={props.type ? props.min : null} itemType={props.type ? props.type : null} disabled={props.disabled} value={props.value ? props.value :inputState.value} onFocus={fieldFocusHandler} onBlur={onLostFocus} type={props.type ? props.type :"text"} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={props.placeholder ? props.placeholder : props.Label} onChange={(e)=>inputChangeHandler(e.target.value)}/>
        </FormGroup>

    );
  });
  

  
  export default Input;
  