import PropTypes from "prop-types";
import React, { useEffect } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const { user } = JSON.parse(localStorage.getItem("authUser"));
  const { IMPERSONATE_USER } =
    JSON.parse(localStorage.getItem("IMPERSONATE_USER")) || {};

  const { Id } = JSON.parse(localStorage.getItem("userId")) || {};
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      return false;
    }
    return false;
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          <li>
            <Link to="/dashboard" className="has-arrow waves-effect">
              <i className="bx bx-store"></i>
              <span>{props.t("Dashboard")}</span>
            </Link>
          </li>

          <li>
            <Link to="/AddCompany" className="has-arrow waves-effect">
            <i className="far fa-building"></i>
              <span>{props.t("Company")}</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                {user.isSuperAdmin && !IMPERSONATE_USER ? (
                  <Link to="/companies">{props.t("All Companies")}</Link>
                ) : (
                  <Link to={`/companyprofile/${Id}`}>
                    {props.t("Company Profile")}
                  </Link>
                )}
              </li>
            </ul>
          </li>

          <li>
            <Link to="/tickets" className="has-arrow waves-effect">
            <i className="fas fa-ticket-alt"></i>
              <span>{props.t("Tickets")}</span>
            </Link>
          </li>

          <li>
            <Link to="/Bus" className="has-arrow waves-effect">
              <i className="bx bxs-bus"></i>
              <span>{props.t("Inventory")}</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/Bus">{props.t("Bus")}</Link>
              </li>
              {Id === 0 ? null : (
                <li>
                  <Link to="/BusCategory">{props.t("Category")}</Link>
                </li>
              )}
            </ul>
          </li>

          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className="bx bxs-user"></i>
              <span>{props.t("Staff")}</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to="/AddStaff">{props.t("Add Staff")}</Link>
              </li>

              {Id === 0 ? null : (
                <li>
                  <Link to="/drivers">{props.t("Driver")}</Link>
                </li>
              )}
            </ul>
          </li>
          {Id === 0 ? null : (
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-trip"></i>
                <span>{props.t("Trip")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/route">{props.t("Route")}</Link>
                </li>
                <li>
                  <Link to="/schedule">{props.t("Schedule")}</Link>
                </li>
                <li>
                  <Link to="/trips">{props.t("Trip")}</Link>
                </li>
              </ul>
            </li>
          )}

          <li>
            <Link to="/orders" className="has-arrow waves-effect">
            <i className="far fa-calendar-alt"></i>
              <span>{props.t("Orders")}</span>
            </Link>
          </li>
          {user.isSuperAdmin && !IMPERSONATE_USER ? (
            <li>
              <Link to="/#" className="has-arrow waves-effect">
              <i className="fas fa-cog"></i>
                <span>{props.t("Settings")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/Terminal">{props.t("Terminals / Stations")}</Link>
                </li>
                <li>
                  <Link to="/Cities">{props.t("Cities")}</Link>
                </li>
              </ul>
            </li>
          ) : null}

        </ul>
      </div>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
