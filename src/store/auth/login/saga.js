import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()
const Api = 'http://mannoo-001-site5.etempurl.com/api'

// function* loginUser ({ payload: { user, history } }) {
//   try {
//     const response = yield fetch(`${Api}/account/login`, {
//             method: "POST",
//             headers: {
//               "Content-type": "application/json",
//             },
//             body: JSON.stringify({
//               email: email,
//               password: password,
//             }),
//           });
      
//           const resData = yield response.json();
//           console.log('response')
//           console.log(resData);
//           // console.log(resData.success);
      
//           // if (resData.result === 'error') {
//           //   throw new Error(resData.message);
//           // }
//          history.push("/dashboard")
//   } catch (error) {
//     yield put(apiError(error))
//   }
// }

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}


function* authSaga() {
  // yield takeEvery(LOGIN_USER, loginUser)
  // yield takeLatest(SOCIAL_LOGIN, socialLogin)
  // yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
