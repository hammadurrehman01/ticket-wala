
import {
    FETCH_COUNTRY
  } from "../Common/action";
  
  
  const initialState = {
    countries: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COUNTRY:
        return {
          ...state,
          countries: action.country,
        };
    }
    return state;
  };
  