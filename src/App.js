import PropTypes from 'prop-types'
import React,{useEffect} from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import * as authAction from './store/auth/login/actions'

// Import Routes all
import { authRoutes, mainR } from "./routes/allRoutes"
// import { userRoutes, authRoutes,isSuperAdmin,companyRoute, mainR } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

import {useDispatch} from 'react-redux'

const App =  props => {

  const dispatch = useDispatch()
  useEffect(()=>{
     dispatch(authAction.PersistUser())
  },[]) 

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}
          
            {mainR()?.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={VerticalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
