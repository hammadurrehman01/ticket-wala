import {
    FETCH_TERMINAL,
    ADD_TERMINAL
  } from "../Terminal/action";
  
  
  const initialState = {
    terminals: [],
    pagingInfo:{},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TERMINAL:
        return {
          ...state,
          terminals: action.Terminal.data,
          pagingInfo:action.Terminal.pagingInfo
        };
      
        case ADD_TERMINAL:
        return {
          ...state,
          terminals: state.terminals.concat(action.newTerminal)
        };
    }
    return state;
  };
  