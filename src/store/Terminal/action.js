export const FETCH_TERMINAL = "FETCH_TERMINAL";
export const ADD_TERMINAL = "ADD_TERMINAL";

// Api Link Import
import { Api } from "./../../common/Api";

// demo Login starts here
export const fetchAllTerminal = (companyId,pageSize, pageIndex, search, cityId, option) => {
  return async (dispatch, getState) => {
    let Link = `${Api}route/all-terminals/${companyId}?PageSize=${pageSize}&PageIndex=${pageIndex}&cityId=${cityId}`
    if(search !== null) {
      Link = Link + `&searchTerminalName=${search}`
    }
    if(pageSize === undefined) {
      Link = `${Api}route/all-terminals/${companyId}?cityId=${cityId}`
    }
    // if(cityId !== undefined) {
    //   Link = `${Api}route/all-terminals/${companyId}?cityId=${cityId}`
    // }

    const response = await fetch(Link, {
      method: "GET",
    });
    const resData = await response.json();
    if (resData.success === false) {
      throw new Error(resData.message);
    }
    if(option === 'return') {
      return resData
    }
    dispatch({
      type: FETCH_TERMINAL,
      Terminal: resData,
    });
  };
};

// Add Terminal Handler
export const addTerminal = (Name, CityId, CompanyId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}route/add-terminal/${CompanyId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          cityId: CityId,
          name: Name,
          active: true
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      
      const resData2 = await response.json();
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

// Add Terminal Handler
export const UpdateTerminal = (Name, CityId, CompanyId, terminalId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}route/update-terminal/${CompanyId}/${terminalId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          companyId: CompanyId,
          cityId: CityId,
          name: Name,
          active: true
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      if (!resData2.success) {
        throw new Error(resData2.message);
      }

    } catch (error) {
      throw error;
    }
  };
};


// Add Route Handler
export const deleteTerminal = (companyId, terminalId) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}route/delete-terminal/${companyId}/${terminalId}`, {
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
