import React from 'react'
import {Nav,NavItem,NavLink} from "reactstrap";
import classnames from "classnames"

const NavLinkComp = (props) =>{
    return(
        <Nav className="flex-column" pills>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: props.Active === "1",
                        })}
                        onClick={()=> props.history.push(`/schedule/${props.id}`)}
                      >
                        <i className="bx bxs-truck d-block check-nav-icon mt-4 mb-2"/>
                        <p className="font-weight-bold mb-4">Schedule</p>
                      </NavLink>
                    </NavItem>
                    {props.disabled ? null : (
                      <NavItem>
                      <NavLink
                        className={classnames({
                          active: props.Active === "2",
                        })}
                        onClick={()=> props.history.push(`/trips/${props.id}`)}
                      >
                        <i className="bx bx-money d-block check-nav-icon mt-4 mb-2"/>
                        <p className="font-weight-bold mb-4">Trips</p>
                      </NavLink>
                    </NavItem>
                    )}
                  </Nav>
    )
}

export default NavLinkComp