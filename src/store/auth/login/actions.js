import { error } from "toastr";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"


// demo Login starts here
const Api = 'https://tripwala.pk/api/'

export const loginUser = (value, history) => {
  return async (dispatch) => {

    try {
      const response = await fetch(`${Api}account/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

      const resData2 = await response.json();
      console.log(resData2)
      console.log(resData2)
      if (!resData2.success) {
        throw new Error(resData2.message)
      }
      if (resData2.isSuperAdmin) {
        const COMAPNYRESPONSE = await fetch(`${Api}company/all-companies`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const companyResponse = await COMAPNYRESPONSE.json();
        console.log(companyResponse)
        localStorage.setItem('allCompanies', JSON.stringify({ companies: companyResponse.data }))
      }

      dispatch({
        type: LOGIN_USER,
        Login: resData2,
      });
      localStorage.setItem('authUser', JSON.stringify({ user: resData2 }))
      localStorage.setItem('userId', JSON.stringify({ Id: resData2.companyId }))

    } catch (error) {
      throw error
    }
  };
};


export const PersistUser = () => {
  return async (dispatch) => {
    // console.log(value)
    // console.log('me run')
    // const response = await fetch(`${Api}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: value.email,
    //     password: value.password,
    //   }),
    // });

    // const resData = await response.json();
    // console.log(resData);
    // console.log(resData.success);
    const user = JSON.parse(localStorage.getItem("authUser"))



    dispatch({
      type: LOGIN_USER,
      Login: user,
    });
    // saveDataToStorage(resData.response);
  };
};


// export const loginUser = (user, history) => {
//   return {
//     type: LOGIN_USER,
//     payload: { user, history },
//   }
// }

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return async (dispatch) => {

    try {
      localStorage.removeItem("authUser")
      localStorage.removeItem('IMPERSONATE_USER')
      localStorage.removeItem('userId')
      localStorage.removeItem('allCompanies')

      history.push("/login")

      dispatch({
        type: LOGOUT_USER,
        payload: {},
      });

    } catch (error) {
      console.log(error)
    }

  };
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

