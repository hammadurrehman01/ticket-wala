import actions from "redux-form/lib/actions";
import {
    FETCH_ROUTE,
    ADD_ROUTE,
    DELETE_ROUTE,
    UPDATE_ROUTE,
    FETCH_STOP,
    DELETE_STOP,
    EMPTY_STOPS,
    ADD_STOP
  } from "../Route/action";
  
  
  const initialState = {
    routes: [],
    pagingInfo:{},
    stops:[],
    stopPagingInfo:{}
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ROUTE:
        return {
          ...state,
          routes: action.Route.data,
          pagingInfo: action.Route.pagingInfo

        };
      case ADD_ROUTE:
        return{
          ...state,
          routes: state.routes.concat(action.newRoute)
        }

      case DELETE_ROUTE:
        return {
          ...state,
          routes: state.routes.filter(item=> item.Id !== action.RouteId)
        }

        case UPDATE_ROUTE:
          console.log('Update Route is running')
          console.log(action.updateRoute)
          const routeIndex = state.routes.findIndex(
            item => item.Id === action.updateRoute.Id
          );
          console.log(routeIndex)
    
          const routeClone = state.routes;
    
          routeClone[routeIndex] = action.updateRoute;
          console.log(routeClone)
 
          return {
            routes: routeClone
          };

          case FETCH_STOP:
          return{
            ...state,
            stops : action.stops.data,
            stopPagingInfo : action.stops.pagingInfo

          }

          case DELETE_STOP:
            return {
              ...state,
              stops: state.stops.filter(item=> item.Id !== action.StopId)
            }

          case EMPTY_STOPS:
            return{
              ...state,
              stops:[],
              stopPagingInfo:{}
            }  
      
    }
    return state;
  };
  