import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import {Modal,Row, Col, FormGroup,Label,Button} from "reactstrap";
import Select from "react-select";

import { connect } from "react-redux"

import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import ButtonComp from 'components/UI/Button';

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import logoDark from "../../assets/images/logo-dark.png"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions"

const Header = props => {
  const [search, setsearch] = useState(false)
  const [isStopAddPopup, setIsStopAddPopup] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState([])
  const [selectedCompany,setSelectedCompany] = useState({})
  const [isDropdown, setIsDropdown] = useState(false)

  const companiesData = JSON.parse(localStorage.getItem("allCompanies"))

  const {IMPERSONATE_USER} = JSON.parse(localStorage.getItem("IMPERSONATE_USER")) || {}


  // LOGIN USER ID
  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

   // useEffect to set Terminal Dropdown
   useEffect(() => {
    let options = [];
    for (let key in companiesData?.companies) {
      options.push({
        label: companiesData?.companies[key].Name,
        value: companiesData?.companies[key].Name,
        Id: companiesData?.companies[key].Id,
      });
    }
    const optionGroup = [
      {
        options,
      },
    ];
    setCompanyDropdown(optionGroup);
  }, []);
  // useEffect to set Terminal Dropdown End

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  // IMPERSUNATION USER WITH BELOW HANDLER
  const loginAsImpersunationHandler = () => {
    localStorage.setItem('IMPERSONATE_USER',JSON.stringify({IMPERSONATE_USER: selectedCompany}))
    localStorage.setItem('userId',JSON.stringify({Id: selectedCompany.Id}))
    setIsStopAddPopup(false)
    props.history.push('/')
  }

  // REMVOE IMPERSUNATION
  const removeImpersunation = () => {
    localStorage.removeItem('IMPERSONATE_USER')
    localStorage.setItem('userId',JSON.stringify({Id: 0}))
    props.history.push('/')
  }

  function tToggle() {
    props.toggleLeftmenu(!props.leftMenu)
    if (props.leftSideBarType === "default") {
      props.changeSidebarType("condensed", isMobile)
    } else if (props.leftSideBarType === "condensed") {
      props.changeSidebarType("default", isMobile)
    }
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                 <h1 style={{fontSize:23, color:'white', marginTop:10}}>Ticket Wala</h1>
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                <h1 style={{fontSize:19, color:'white', marginTop:20}}>Ticket Wala</h1>
                </span>
                <span className="logo-lg">
                <h1 style={{fontSize:19, color:'white', marginTop:20}}>Ticket Wala</h1>
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle()
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars"/>
            </button>
{/* 
            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={props.t("Search") + "..."}
                />
                <span className="bx bx-search-alt"/>
              </div>
            </form> */}

           
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ml-2">
              <button
                onClick={() => {
                  setsearch(!search)
                }}
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify"/>
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* IMPERSUNATION START HERE */}
            {Id === 0  || IMPERSONATE_USER ? (
            <Button
            color={`${IMPERSONATE_USER ? 'primary' : 'secondary'}`}
            className="mr-1 waves-effect waves-light"
            onClick={() => IMPERSONATE_USER ? removeImpersunation() : setIsStopAddPopup(true)}
          >
             {IMPERSONATE_USER ? <i className="bx bx-check-double font-size-16 align-middle mr-2"></i> : null}
             {IMPERSONATE_USER ? `Impersonated as ${IMPERSONATE_USER.label}` : 'Impersonate'}
           </Button>
            ):null}
             {/* IMPERSUNATION START HERE */}


            <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen()
                }}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen"/>
              </button>
            </div>

            <NotificationDropdown />
          
            <ProfileMenu />

            {/* <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar)
              }}
              className="dropdown d-inline-block"
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="bx bx-cog bx-spin"/>
              </button>
            </div> */}
          </div>
        </div>
      </header>
      {/* Modal Start from here */}
      <Modal size="md" isOpen={isStopAddPopup}>
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myLargeModalLabel">
                  Select Company to impersonation
                </h5>
                <button
                  onClick={() => setIsStopAddPopup(false)}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <Col lg="12">
                <FormGroup className="ajax-select mt-3 mt-lg-0 select2-container">
                  <Label>Select Company</Label>
                  <Select
                    onChange={(e) => {
                      setSelectedCompany(e)
                    }}
                    options={companyDropdown}
                    classNamePrefix="select2-selection"
                  />
                </FormGroup>

                <ButtonComp
                  // isLoading={isRouteUpdate}
                  disabled={selectedCompany === {}}
                  onClick={loginAsImpersunationHandler}
                  Label="Login Now"
                />
              </Col>
            </Modal>
    </React.Fragment>
  )
}

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
}

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header))
