import {
    FETCH_BUSS_CATEGORIES,
    FETCH_BUSES,
    FETCH_DRIVERS,
    FETCH_BUSS_CATEGORIES_TYPE,
    FETCH_SEAT_TYPE
  } from "./action";
  
  
  const initialState = {
    bussCategories: [],
    bussCategoriesPagingInfo:{},
    bussListing:[],
    bussPagingInfo:{},
    driverListing:[],
    driverPagingInfo:{},
    bussCategoriesType:[],
    seatType:[]
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BUSS_CATEGORIES:
        return {
          ...state,
          bussCategories: action.BussCategories.data,
          bussCategoriesPagingInfo: action.BussCategories.pagingInfo
        };
      case FETCH_BUSES:
        return{
          ...state,
          bussListing: action.Bus.data,
          bussPagingInfo: action.Bus.pagingInfo
        }
      case FETCH_DRIVERS:
        return{
          ...state,
          driverListing: action.driver.data,
          driverPagingInfo: action.driver.pagingInfo
        }
      case FETCH_BUSS_CATEGORIES_TYPE:
        return {
          ...state,
          bussCategoriesType: action.BusCat.data
        }
      case FETCH_SEAT_TYPE:
        return {
          ...state,
          seatType : action.seatType
        }
    }
    return state;
  };
  