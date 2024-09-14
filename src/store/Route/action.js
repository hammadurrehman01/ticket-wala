export const FETCH_ROUTE = "FETCH_ROUTE";
export const ADD_ROUTE = "ADD_ROUTE";
export const DELETE_ROUTE = "DELETE_ROUTE";
export const UPDATE_ROUTE = "UPDATE_ROUTE";
export const FETCH_STOP = 'FETCH_STOP'
export const DELETE_STOP = 'DELETE_STOP'
export const EMPTY_STOPS = 'EMPTY_STOPS'
export const ADD_STOP = 'ADD_STOP'

// Api Link Import
import { Api } from "./../../common/Api";

// demo Login starts here
export const fetchAllRoute = (companyId,pageSize, pageIndex, search) => {
  return async (dispatch, getState) => {
    let Link = `${Api}route/all-routes/${companyId}?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&searchRouteName=${search}`
    }if(pageSize === undefined) {
      Link = `${Api}route/all-routes/${companyId}`
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
      type: FETCH_ROUTE,
      Route: resData,
    });
  };
};

// Add Route Handler
export const addRoute = (Name, TerminalFrom, TerminalTo, CompanyId) => {
  return async (dispatch, getState) => {
    console.log("this is me");
    try {
      const response = await fetch(`${Api}route/add-route/${CompanyId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          terminalFrom: TerminalFrom,
          companyId: CompanyId,
          terminalTo: TerminalTo,
          createdOnUtc: "2021-02-23T10:38:51.973Z",
          updatedOnUtc: "2021-02-23T10:38:51.973Z",
          active: true,
          deleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2);
      if (!resData2.success) {
        throw new Error(resData2.message);
      }else{
        return resData2
      }

    } catch (error) {
      throw error;
    }
  };
};

// Add Route Handler
export const deleteRoute = (companyId,Id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}route/delete-Route/${companyId}/${Id}`, {
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

// Update Route Handler
export const updateRoute = (Name, TerminalTo, TerminalFrom, routeId,companyId) => {
  return async (dispatch, getState) => {
    console.log(Name)
    console.log(routeId)
    try {
      const response = await fetch(`${Api}route/update-route/${companyId}/${routeId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          terminalFrom: TerminalFrom,
          companyId: 1,
          terminalTo: TerminalTo,
          active: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2);
      if (!resData2.success) {
        throw new Error(resData2.message);
      }

    } catch (error) {
      throw error;
    }
  };
};


// demo Login starts here
export const fetchRouteStops = (pageSize, pageIndex,companyId,routeId, search) => {
  return async (dispatch, getState) => {

    let Link = `${Api}route/all-terminal-stops/${companyId}/${routeId}?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&searchTerminalStopName=${search}`
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
      type: FETCH_STOP,
      stops: resData,
    });
  };
};


// DELETE STOP HANDLER
export const emptyStops = () => {
  return async (dispatch, getState) => {  
      dispatch({
        type: EMPTY_STOPS,
      }); 
    }
};




// DELETE STOP HANDLER
export const deleteStop = (Id,companyId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}route/delete-terminal-stop/${companyId}/${Id}`, {
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
      //   type: DELETE_STOP,
      //   StopId: Id,
      // });
    } catch (error) {
      throw error;
    }
  };
};


// Add Route Handler
export const addStops = (TerminalId,CompanyId, routeId, ticketable) => {
  return async (dispatch, getState) => {
    console.log('Yes i m ticketala ', ticketable)
    try {
      const response = await fetch(`${Api}route/add-terminal-stop/${CompanyId}/${routeId}/${TerminalId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          active: true,
          ticketable
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2);
      if (!resData2.success) {
        throw new Error(resData2.Message);
      }
    } catch (error) {
      throw error;
    }
  };
};


// UPDATE STOP
export const UpdateStop = (companyId, terminalStopId, terminalId,ticketable) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}route/update-terminal-stop/${companyId}/${terminalStopId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          terminalId,
          active: true,
          arrivalTime: '2021-02-28T14:43:54.247Z',
          departureTime: '2021-02-28T14:43:54.247Z',
          ticketable
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2);
      if (!resData2.success) {
        throw new Error(resData2.message);
      }

    } catch (error) {
      throw error;
    }
  };
};

