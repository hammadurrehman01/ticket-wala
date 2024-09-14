import React from "react";
import * as routeActions from "../../../store/Route/action";
import { useSelector } from "react-redux";
import TableListingComp from "../../../components/Common/TableListing";

const RouteListing = (props) => {
  // REDUX STATE
  const routeData = useSelector((state) => state.Route.routes);
  const pagingInfo = useSelector((state) => state.Route.pagingInfo);

  const companyId = props.location?.state?.companyId

  const {Id} = JSON.parse(localStorage.getItem("userId")) || {}

  if(Id === 0  && companyId === undefined) {
    props.history.push('/companies')
  }

  // COUNTRIES
  const countries = useSelector((state) => state.Common.countries);

  return (
    <TableListingComp
      fetchData={routeActions.fetchAllRoute}
      fetchDropdownData={null}
      param={companyId}
      companySpecific={true}
      history={props.history}
      data={routeData}
      activeTab='1'
      pagingInfo={pagingInfo}
      deleteAction={routeActions.deleteRoute}
      pageTitle={"Routes"}
      buttonText="Add New Route"
      Link={"./route"}
      column={[
        { title: "Name", field: "Name" },
        { title: "Terminal From", field: "TerminalFrom" },
        {
          title: "Terminal To",
          field: "TerminalTo",
        },
      ]}
    />
  );
};

export default RouteListing;
