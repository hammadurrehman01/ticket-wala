import { PROPERTY_TYPES } from "@babel/types";
import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <Link
      to={props.to}
      className="btn text-muted d-none d-sm-inline-block btn-link"
    >
      {props.title} <i class="fa fa-plus" aria-hidden="true"></i>
    </Link>
  );
};

export default LinkButton;
