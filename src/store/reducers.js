import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
import Route from './Route/Reducer'
import Terminal from './Terminal/Reducer'
import Company from './Company/Reducer'
import Common from './Common/Reducer'
import Bus from './Buss/Reducer'
import Schedule from './Schedule/Reducer'
import Booking from './Bookings/Reducer'
import Tickets from './Tickets/reducer'
const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  Route,
  Terminal,
  Company,
  Common,
  Bus,
  Schedule,
  Booking,
  Tickets
})

export default rootReducer
