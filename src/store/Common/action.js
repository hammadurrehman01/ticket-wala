export const FETCH_COUNTRY = 'FETCH_COUNTRY'

// Api Link Import
import { Api } from "./../../common/Api";
// demo Login starts here
export const fetchCountries = () => {
    return async (dispatch, getState) => {
  
      const response = await fetch(`${Api}common/all-cities`, {
        method: "GET",
      });
  
      const resData = await response.json();
      console.log('City' , resData);
  
      // console.log(resData.success);
  
      if (resData.success === false) {
        throw new Error(resData.message);
      }
  
      dispatch({
        type: FETCH_COUNTRY,
        country: resData.data,
      });
    };
  };


  // Add Route Handler
export const deleteCities = (companyId,Id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Api}common/delete-city/${Id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log('City', resData2);
      if (!resData2.success) {
        throw new Error(resData2.message);
      }
    } catch (error) {
      throw error;
    }
  };
};


// Update Route Handler
export const UpdateCities = (Name,Id,abbreviation,displayOrder) => {
  return async (dispatch, getState) => {
    console.log(Name)
    try {
      const response = await fetch(`${Api}common/update-city/${Id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          abbreviation: abbreviation,
          published: true,
          displayOrder: displayOrder
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData2 = await response.json();
      console.log('City', resData2);
      if (!resData2.success) {
        throw new Error(resData2.message);
      }

    } catch (error) {
      throw error;
    }
  };
};

  