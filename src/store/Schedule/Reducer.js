import {
    FETCH_SCHEDULE,
    FETCH_TRIPS_PLANNERS,
    DELETE_TRIP_PLANNER,
    FETCH_ALL_FARES
  } from "./action";
  
  
  const initialState = {
    schedules: [],
    pagingInfo:{},
    TripPlanners: [],
    tripPlannerPagingInfo: {},
    fares: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SCHEDULE:
        return {
          ...state,
          schedules: action.Schedule.data,
          pagingInfo: action.Schedule.pagingInfo

        };

      case FETCH_TRIPS_PLANNERS:
        return {
          ...state,
          TripPlanners: action.TripPlanners.data,
          tripPlannerPagingInfo: action.TripPlanners.pagingInfo
        }

      case DELETE_TRIP_PLANNER:
        return {
          ...state,
          TripPlanners: state.TripPlanners.filter(item => item.Id !== action.Id)
        }
      case FETCH_ALL_FARES:
      return {
        ...state,
        fares: action.fares
      }
    }
    return state;
  };
  