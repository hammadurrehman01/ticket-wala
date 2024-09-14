import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import AllCompanies from '../pages/Dashboard/Company/AllCompanies'
import AddCompany from '../pages/Dashboard/Company/AddCompany'
import Bus from '../pages/Dashboard/Inventory/Bus'
import AddStaff from '../pages/Dashboard/Staff/AddStaff'
import AddDriver from '../pages/Dashboard/Staff/AddDriver'
import AddTrips from '../pages/Dashboard/Trip/AddTrip'
import SuperAdminDashboard from '../pages/Dashboard/SuperAdminDashboard'
import AddBooking from '../pages/Dashboard/Bookings/AddBooking'
import Terminal from '../pages/Dashboard/Settings/Terminal'
import Schedule from '../pages/Dashboard/Trip/Schedule'
import RouteListing from '../pages/Dashboard/Trip/RouteListing'
import AddStop from "../pages/Dashboard/Trip/AddStops"
import AddTerminals from '../pages/Dashboard/Settings/AddTerminal'
import BussListing from '../pages/Dashboard/Inventory/BussListing'
import BusCategoriesListing from '../pages/Dashboard/Inventory/BusCategoriesListing'
import AddBusCategory from '../pages/Dashboard/Inventory/AddBusCategory'
import BusCategoriesTypeListing from '../pages/Dashboard/Inventory/BusCategoryType/BussCategoryTypeListing'
import DriverListing from '../pages/Dashboard/Inventory/Drivers/DriverListing'
import ScheduleListing from '../pages/Dashboard/Trip/Schedule/ScheduleListing'
import AddSchedule from '../pages/Dashboard/Trip/Schedule/AddSchedule'
import AddTripPlanner from '../pages/Dashboard/Trip/TripPlanner/AddTripPlanner'
import AllTrips from '../pages/Dashboard/Trip/TripPlanner/AllTrips'
import Bookings from "pages/Dashboard/Bookings/Booking"
import NotFound from 'pages/Dashboard/NotFound'
import Cities from 'pages/Dashboard/Settings/Cities'
import AddCities from "pages/Dashboard/Settings/AddCity"
import Tickets from 'pages/Dashboard/Tickets/Ticket'
import Orders from "pages/Dashboard/Bookings/Orders"
import OrderDetailed from "pages/Dashboard/Bookings/OrderDetailed"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // COMAPNY ROUTES
  { path: "/companies", component: AllCompanies },
  { path: "/companies/:id", component: AddCompany },

  // Bus Routes
  { path: "/Bus", component: BussListing },
  { path: "/Bus/:id", component: Bus },

  // Bus Category
  // { path: "/BusCategoriesListing", component: BusCategoriesListing },
  // { path: "/AddBusCategory", component: AddBusCategory },
  { path: "/BusCategory", component: BusCategoriesListing },
  { path: "/BusCategory/:id", component: AddBusCategory },

  //  Driver Routes
  { path: "/drivers", component: DriverListing },
  { path: "/drivers/:id", component: AddDriver },

  //  { path: "/DriverListing", component: DriverListing },
  //  { path: "/AddDriver", component: AddDriver },

  // Route Listing
  // { path: "/RouteListing", component: RouteListing },
  // { path: "/AddStop", component: AddStop },
  { path: "/route", component: RouteListing },
  { path: "/route/:id", component: AddTrips },

  // Schedule Route
  // { path: "/ScheduleListing", component: ScheduleListing },
  // { path: "/AddSchedule", component: AddSchedule },
  { path: "/schedule", component: ScheduleListing },
  { path: "/schedule/:id", component: AddSchedule },

  // Terminal Route
  { path: "/terminal", component: Terminal },
  { path: "/terminal/:id", component: AddTerminals },

  // City Route
  { path: "/Cities", component: Cities },
  { path: "/Cities/:id", component: AddCities },


  // Trip Planner
  // { path: "/AddTripPlanner", component: AddTripPlanner },
  { path: "/trips", component: AllTrips },
  { path: "/trips/:id", component: AddTripPlanner },

  // BOOKING ROUTES
  { path: "/bookings", component: Bookings },
  { path: "/bookings/:id", component: AddBooking },

  { path: "/orders", component: Orders },
  { path: "/orders/:id", component: OrderDetailed },

  // BOOKING ROUTES
  { path: "/tickets", component: Tickets },

  { path: "/AddStaff", component: AddStaff },
  { path: "/Schedule", component: Schedule },
  { path: "/AddStop", component: AddStop },
  { path: "/BusCategoriesTypeListing", component: BusCategoriesTypeListing },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { component: NotFound },
  // { component: AddTerminals },
]

const companyRoute = [
  { path: "/dashboard", component: Dashboard },
  { path: "/companyprofile/:id", component: AddCompany },
  // Bus Routes
  { path: "/Bus", component: BussListing },
  { path: "/Bus/:id", component: Bus },

  // Bus Category
  // { path: "/BusCategoriesListing", component: BusCategoriesListing },
  // { path: "/AddBusCategory", component: AddBusCategory },
  { path: "/BusCategory", component: BusCategoriesListing },
  { path: "/BusCategory/:id", component: AddBusCategory },

  //  Driver Routes
  { path: "/drivers", component: DriverListing },
  { path: "/drivers/:id", component: AddDriver },

  //  { path: "/DriverListing", component: DriverListing },
  //  { path: "/AddDriver", component: AddDriver },

  // Route Listing
  // { path: "/RouteListing", component: RouteListing },
  // { path: "/AddStop", component: AddStop },
  { path: "/route", component: RouteListing },
  { path: "/route/:id", component: AddTrips },

  // Schedule Route
  // { path: "/ScheduleListing", component: ScheduleListing },
  // { path: "/AddSchedule", component: AddSchedule },
  { path: "/schedule", component: ScheduleListing },
  { path: "/schedule/:id", component: AddSchedule },

  // Terminal Route
  { path: "/terminal", component: Terminal },
  { path: "/terminal/:id", component: AddTerminals },

  // Trip Planner
  // { path: "/AddTripPlanner", component: AddTripPlanner },
  { path: "/trips", component: AllTrips },
  { path: "/trips/:id", component: AddTripPlanner },

  // BOOKING ROUTES
  { path: "/bookings", component: Bookings },
  { path: "/bookings/:id", component: AddBooking },

  { path: "/orders", component: Orders },
  { path: "/orders/:id", component: OrderDetailed },

  // BOOKING ROUTES
  { path: "/tickets", component: Tickets },

  { path: "/AddStaff", component: AddStaff },
  { path: "/Schedule", component: Schedule },
  { path: "/AddStop", component: AddStop },
  { path: "/BusCategoriesTypeListing", component: BusCategoriesTypeListing },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { component: NotFound },
  // { component: AddTerminals },
]

const isSuperAdmin = [
  { path: "/dashboard", component: SuperAdminDashboard },
  { path: "/AddCompany", component: AddCompany },
  { path: "/Bus", component: AddCompany },
  { path: "/AddStaff", component: AddCompany },
  { path: "/AddDriver", component: AddCompany },
  { path: "/AddTrips", component: AddCompany },
  { path: "/AddBooking", component: AddCompany },
  { path: "/Terminal", component: AddCompany },
  { path: "/Schedule", component: AddCompany },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

]

const mainR = () => {
  // LOGIN USER ID
  const [mainRoutes, setMainRoutes] = useState([])
  const { Id } = JSON.parse(localStorage.getItem("userId")) || {}

  useEffect(() => {
    setMainRoutes(Id === 0 ? userRoutes : companyRoute)
  }, [Id])

  return mainRoutes
}

// export { userRoutes, authRoutes,isSuperAdmin,companyRoute }
export { authRoutes, mainR }
