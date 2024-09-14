export const FETCH_TICKETS = 'FETCH_TICKETS'
export const FETCH_DEPARTURE = 'FETCH_DEPARTURE'
export const FETCH_ARRIVAL = 'FETCH_ARRIVAL'

// Api Link Import
import { Api } from "./../../common/Api";
// _____________________________________________________________//

// FETCH ALL TICKETS
export const fetchAllTickets = (companyId, pageSize, pageIndex, search, id, isCompany, secondDropdownId) => {
  // mainId, pageSize, pageIndex,search, city, isCompany,secondDropdownValue
  return async (dispatch, getState) => {
    console.log(companyId)
    console.log(search)

    let Link = `${Api}ticket/search-tickets/${id === 0 ? 1 : id}/${secondDropdownId === 0 ? 1 : secondDropdownId}/${search}`
    // if(search !== null) {
    //   Link = Link + `&searchDate=${search}`
    // }
    //   if(pageSize === undefined) {
    //     Link = `${Api}bus/all-buses/${companyId}`
    //   }
    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();
    console.log(resData)

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error('Please Select Data, Arrival & Departure');
    }


    dispatch({
      type: FETCH_TICKETS,
      ticket: resData.data,
    });
  };
};

// FETCH ALL DEPARTURE
export const fetchAllDeparture = () => {
  return async (dispatch, getState) => {

    let Link = `${Api}ticket/all-ticket-departures`
    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_DEPARTURE,
      departure: resData.data,
    });
  };
};


// FETCH ALL ARRIVAL
export const fetchAllArrival = () => {
  return async (dispatch, getState) => {

    let Link = `${Api}ticket/all-ticket-arrivals`
    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_ARRIVAL,
      arrival: resData.data,
    });
  };
};



