import {
    FETCH_COMPANY,
  } from "../Company/action";
  
  
  const initialState = {
    company: [],
    companyPagingInfo:{}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMPANY:
        return {
          ...state,
          company: action.Company.data,
          companyPagingInfo: action.Company.pagingInfo
        };
    }
    return state;
  };
  