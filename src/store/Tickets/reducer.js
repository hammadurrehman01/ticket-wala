import {
    FETCH_TICKETS,
    FETCH_DEPARTURE,
    FETCH_ARRIVAL
  } from "../Tickets/action";
  
  
  const initialState = {
    tickets: [],
    pagingInfo:{},
    departure: {},
    arrival:{}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TICKETS:
        return {
          ...state,
          tickets: action.ticket,
          pagingInfo: {}
        };
      case FETCH_DEPARTURE:
        return {
          ...state,
          departure: action.departure,
        }
        case FETCH_ARRIVAL:
          return {
            ...state,
            arrival: action.arrival,
          }  
    }
    return state;
  };
  