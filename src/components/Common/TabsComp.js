import React from 'react'
import {
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap"
  import classnames from 'classnames'

const NavTabComp = (props) => {
    return (
        <Nav tabs>
             <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: props.activeTab === "0",
            })}
            onClick={() => props.history.push(`/companies/${props.id}`)}
          >
            Info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: props.activeTab === "1",
            })}
            onClick={() => props.history.push("/route",{companyId: props.id})}
          >
            Route
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
                active: props.activeTab === "2",
              })}
              onClick={() => props.history.push("/schedule",{companyId: props.id})}
          >
            Schedule
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
                active: props.activeTab === "3",
              })}
              onClick={() => props.history.push("/trips",{companyId: props.id})}
          >
            Trips
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
                active: props.activeTab === "4",
              })}
              onClick={() => props.history.push("/drivers",{companyId: props.id})}
          >
            Drivers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
                active: props.activeTab === "5",
              })}
              onClick={() => props.history.push("/BusCategory",{companyId: props.id})}
          >
            Bus Categories
          </NavLink>
        </NavItem>
      </Nav>
    )
}

export default NavTabComp