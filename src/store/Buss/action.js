export const FETCH_BUSS_CATEGORIES = "FETCH_BUSS_CATEGORIES";
export const FETCH_BUSES = 'FETCH_BUSES'
export const FETCH_BUSS_CATEGORIES_TYPE = 'FETCH_BUSS_CATEGORIES_TYPE'
export const FETCH_DRIVERS = 'FETCH_DRIVERS'
export const FETCH_SEAT_TYPE = 'FETCH_SEAT_TYPE'

// Api Link Import
import { Api } from "./../../common/Api";

// demo Login starts here
export const fetchAllBussCategories = (companyId,pageSize, pageIndex, search) => {
  return async (dispatch, getState) => {
    let Link = `${Api}bus/all-bus-categories/${companyId}?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&searchBusCategory=${search}`
    }
    if(pageSize === undefined) {
      Link = `${Api}bus/all-bus-categories/${companyId}`
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
      type: FETCH_BUSS_CATEGORIES,
      BussCategories: resData,
    });
  };
};

// _____________________________________________________________//


// Delete Bus Category
export const deleteBusCat = (companyId, busCatId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}bus/delete-bus-Category/${busCatId}/${companyId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();

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

// _____________________________________________________________//
// BUSS CATEGRIES ENDS HERE




// -------------------------------------------------------------//
// BUSS STARTS HERE
// demo Login starts here
export const fetchAllBuses = (companyId,pageSize, pageIndex, search, busCategoryId) => {
    return async (dispatch, getState) => {
      let Link = `${Api}bus/all-buses/${companyId}?PageSize=${pageSize}&PageIndex=${pageIndex}&busCategoryId=${busCategoryId}`
      if(search !== null) {
        Link = Link + `&searchBusName=${search}`
      }
      if(pageSize === undefined) {
        Link = `${Api}bus/all-buses/${companyId}`
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
        type: FETCH_BUSES,
        Bus: resData,
      });
    };
  };
  


// Add AND DELETE Handler
export const AddEditFunc = (BodyUpdate, Link, method) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}${Link}`, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(BodyUpdate),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log(resData2)
      if (!resData2.success) {
        throw new Error(resData2.message);
      }else {
        return resData2
      }

    } catch (error) {
      throw error;
    }
  };
};


// Add Route Handler
export const deleteBus = (companyId, bussId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}bus/delete-bus/${companyId === 0 ? 1 : companyId}/${bussId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();

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



// -------------------------------------------------------------//
// BUSS CATEGORIES TYPE STARTS HERE
export const fetchAllBussCategoriesType = () => {
  return async (dispatch, getState) => {
    let Link = `${Api}bus/all-bus-category-type`
    
    const response = await fetch(Link, {
      method: "GET",
    });

    const resData = await response.json();

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_BUSS_CATEGORIES_TYPE,
      BusCat: resData,
    });
  };
};



// -------------------------------------------------------------//
// Bus Driver STARTS HERE
export const fetchAllBusDrivers = (companyId,pageSize, pageIndex, search) => {
  return async (dispatch, getState) => {
    let Link = `${Api}bus/all-drivers/${companyId}?PageSize=${pageSize}&PageIndex=${pageIndex}`
    if(search !== null) {
      Link = Link + `&SearchByDriverName=${search}`
    }
    if(pageSize === undefined) {
      Link = `${Api}bus/all-drivers/${companyId}`
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
      type: FETCH_DRIVERS,
      driver: resData,
    });
  };
};


// DELETE DRIVER
export const deleteDriver = (companyId, driverId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}bus/delete-driver/${companyId}/${driverId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();

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


// SEAT TYPE HANDLER

// demo Login starts here
export const fetchAllSeatType = () => {
  return async (dispatch, getState) => {
    let Link = `${Api}bus/all-seat-types`

    const response = await fetch(Link, { 
      method: "GET",      
    });

    const resData = await response.json();

    // console.log(resData.success);
    if (resData.success === false) {
      throw new Error(resData.message);
    }

    dispatch({
      type: FETCH_SEAT_TYPE,
      seatType: resData.data,
    });
  };
};