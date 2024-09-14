export const FETCH_SCHEDULE = "FETCH_SCHEDULE";
export const FETCH_TRIPS_PLANNERS = 'FETCH_TRIPS_PLANNERS'
export const DELETE_TRIP_PLANNER = 'DELETE_TRIP_PLANNER'
export const FETCH_ALL_FARES = 'FETCH_ALL_FARES'
// Api Link Import
import { Api } from "./../../common/Api";

// demo Login starts here
export const fetchAllSchedule = (companyId,pageSize, pageIndex, search) => {
  return async (dispatch, getState) => {
    let Link = `${Api}bus-schedule/all-schedule/${companyId}?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&SearchBusScheduleName=${search}`
    }if(pageSize === undefined) {
      Link = `${Api}bus-schedule/all-schedule/${companyId}`
    }
    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);

    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_SCHEDULE,
      Schedule: resData,
    });
  };
};


// Add Route Handler
export const deleteSchedule = (companyId,Id) => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch(`${Api}bus-schedule/delete-schedule/${companyId}/${Id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
  
        const resData2 = await response.json();
        console.log(resData2);
        if (!resData2.success) {
          throw new Error(resData2.message);
        }
  
        // dispatch({
        //   type: DELETE_ROUTE,
        //   RouteId: Id,
        // });
      } catch (error) {
        throw error;
      }
    };
  };


  // demo Login starts here
export const fetchTripPlanner = (companyId,scheduleId,pageSize, pageIndex, search) => {
  return async (dispatch, getState) => {
    let Link = `${Api}bus-schedule/all-trips/${companyId}/?scheduleId=${scheduleId}?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&searchTripName=${search}`
    }if(pageSize === undefined) {
      Link = `${Api}bus-schedule/all-trips/${companyId}/?scheduleId=${scheduleId}`
    }

    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);

    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_TRIPS_PLANNERS,
      TripPlanners: resData,
    });
  };
};


// FETCH TRIP PLANNER
export const deleteTripsPlanner = (companyId,Id, ScheduleId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}bus-schedule/delete-trip/${companyId}/${ScheduleId}/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2);
      if (!resData2.success) {
        throw new Error(resData2.message);
      }

      dispatch({
        type: DELETE_TRIP_PLANNER,
        Id: Id,
      });
    } catch (error) {
      throw error;
    }
  };
};



// demo Login starts here
export const fetchAllFares = (companyId, routeId) => {
  return async (dispatch, getState) => {
    let Link = `${Api}route/all-terminal-stop-combinations/${companyId}/${routeId}`

    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);

    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_ALL_FARES,
      fares: resData.data,
    });
  };
};

